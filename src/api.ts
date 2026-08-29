import { categoryLabel, parseCategory } from './categories.js'
import { fetchJson } from './http.js'
import { sanitizeSortBy } from './config-store.js'
import type {
  FetchOptions,
  PluginConfig,
  SearchResult,
  SkillCard,
  SortBy,
  WittyhubEnvelope,
  WittyhubListData,
  WittyhubSearchData,
  WittyhubSkillRaw,
} from './types.js'

/**
 * wittyhub 的 skill_id 是含 `/` 的路径式 id（如 github/owner/repo/skills/name），
 * 可以是简单 slug（如 deploy-to-vercel）。这里做安全校验后原样返回：
 * 拦截路径穿越、绝对路径、反斜杠、控制字符，并限制长度。
 */
export function parseSlug(raw: string): string {
  const trimmedOrig = String(raw || '').trim()
  if (!trimmedOrig || trimmedOrig.length > 255) throw new Error('无效 skill_id')
  if (trimmedOrig.includes('..') || trimmedOrig.includes('\\') || trimmedOrig.includes('\0')) throw new Error('无效 skill_id')
  if (trimmedOrig.startsWith('/') || /[\x00-\x1f]/.test(trimmedOrig)) throw new Error('无效 skill_id')
  const trimmed = trimmedOrig.replace(/^@+/, '')
  if (!trimmed) throw new Error('无效 skill_id')
  // 路径式或简单式：由字母数字/点/下划线/斜杠/连字符组成，首尾为字母数字。
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._/-]*[a-zA-Z0-9]$/.test(trimmed)) throw new Error('无效 skill_id')
  return trimmed
}

/** 安装目录名：取 skill_id 末段并转安全目录名（与 zip 内顶层一致）。 */
export function dirSlug(raw: string): string {
  const id = parseSlug(raw)
  let base = id.split('/').filter(Boolean).pop() || id
  base = base.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/^-+|-+$/g, '')
  if (!base || base === '.' || base === '..') throw new Error('无效 skill_id')
  return base
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

/** 解析 wittyhub 的统一响应壳 { code, msg, data }，错误/空壳时抛出。 */
export function unwrapEnvelope<T>(body: WittyhubEnvelope<T>, url: string): T {
  if (!body || typeof body !== 'object') throw new Error(`wittyhub 返回格式异常: ${url}`)
  // 兼容部分未走包装壳的上游（data 直接是业务对象）。
  if ((body as unknown as { skill_id?: unknown }).skill_id !== undefined && body.code === undefined) {
    return body as unknown as T
  }
  if (body.code !== undefined && body.code !== 200) {
    throw new Error(body.msg || `wittyhub 返回错误(code=${body.code}): ${url}`)
  }
  if (body.data === undefined) throw new Error(`wittyhub 返回缺少 data: ${url}`)
  return body.data
}

export function mapSkill(raw: WittyhubSkillRaw, webBase: string, installed?: Set<string>): SkillCard | null {
  const skill_id = String(raw.skill_id || '').trim().toLowerCase()
  if (!skill_id) return null
  const name = String(raw.name || skill_id).trim()
  const description = String(raw.description || '').trim()
  const category = String(raw.category || '').trim()
  const card: SkillCard = {
    skill_id,
    name,
    description,
    category,
    categoryLabel: categoryLabel(category),
    version: String(raw.version || 'latest').trim(),
    author: raw.author || undefined,
    source: raw.source || undefined,
    source_url: raw.source_url || undefined,
    platform: raw.platform || undefined,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    risk_score: typeof raw.risk_score === 'number' ? raw.risk_score : raw.risk_score == null ? undefined : Number(raw.risk_score),
    download_count: Number(raw.download_count) || 0,
    rating: raw.rating || undefined,
    created_at: raw.created_at || undefined,
    updated_at: raw.updated_at || undefined,
    pageUrl: `${webBase.replace(/\/$/, '')}/skills/${encodeURIComponent(skill_id)}`,
    installed: installed?.has(dirSlug(skill_id)) || false,
  }
  return card
}

export function parseSearchResponse(body: unknown, webBase: string, installed?: Set<string>): { items: SkillCard[]; total: number } {
  const data = unwrapEnvelope<WittyhubSearchData>(body as WittyhubEnvelope<WittyhubSearchData>, '/api/v1/index/search')
  const items: SkillCard[] = []
  for (const raw of data.results || []) {
    const card = mapSkill(raw, webBase, installed)
    if (card) items.push(card)
  }
  return { items, total: Number(data.total) || items.length }
}

async function searchViaIndex(
  query: string,
  options: {
    cfg: PluginConfig
    category?: string
    platform?: string
    securityLevel?: string
    sortBy: SortBy
    limit: number
    offset: number
    installed?: Set<string>
    signal?: AbortSignal
    fetchImpl?: typeof fetchJson
  },
): Promise<{ items: SkillCard[]; total: number }> {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (options.category) params.set('category', options.category)
  if (options.platform) params.set('platform', options.platform)
  if (options.securityLevel) params.set('security_level', options.securityLevel)
  params.set('skip', String(options.offset))
  params.set('limit', String(options.limit))
  params.set('mode', 'text')
  params.set('scope', 'summary')
  const url = `${options.cfg.apiBase.replace(/\/$/, '')}/api/v1/index/search?${params.toString()}`
  const fetchImpl = options.fetchImpl || fetchJson
  const body = await fetchImpl<WittyhubEnvelope<WittyhubSearchData>>(url, fetchOpts(options.cfg), options.signal)
  return parseSearchResponse(body, options.cfg.webBase, options.installed)
}

async function listViaSkills(
  options: {
    cfg: PluginConfig
    category?: string
    platform?: string
    securityLevel?: string
    sortBy: SortBy
    limit: number
    offset: number
    installed?: Set<string>
    signal?: AbortSignal
    fetchImpl?: typeof fetchJson
  },
): Promise<{ items: SkillCard[]; total: number }> {
  const params = new URLSearchParams()
  if (options.category) params.set('category', options.category)
  if (options.platform) params.set('platform', options.platform)
  if (options.securityLevel) params.set('security_level', options.securityLevel)
  params.set('skip', String(options.offset))
  params.set('limit', String(options.limit))
  params.set('sort_by', options.sortBy)
  const url = `${options.cfg.apiBase.replace(/\/$/, '')}/api/v1/skills?${params.toString()}`
  const fetchImpl = options.fetchImpl || fetchJson
  const body = await fetchImpl<WittyhubEnvelope<WittyhubListData>>(url, fetchOpts(options.cfg), options.signal)
  const data = unwrapEnvelope<WittyhubListData>(body, '/api/v1/skills')
  const items: SkillCard[] = []
  for (const raw of data.skills || []) {
    const card = mapSkill(raw, options.cfg.webBase, options.installed)
    if (card) items.push(card)
  }
  return { items, total: Number(data.total) || items.length }
}

export interface SkillQueryOptions {
  cfg: PluginConfig
  category?: string
  platform?: string
  securityLevel?: string
  sortBy?: SortBy
  limit?: number
  offset?: number
  installed?: Set<string>
  signal?: AbortSignal
  fetchImpl?: typeof fetchJson
}

export async function searchSkills(
  query: string,
  options: SkillQueryOptions,
): Promise<SearchResult> {
  const cfg = options.cfg
  const limit = clamp(options.limit ?? cfg.maxResults, 1, 96)
  const offset = Math.max(0, Math.floor(options.offset || 0))
  const category = parseCategory(options.category)
  const platform = options.platform ? String(options.platform).trim() : undefined
  const securityLevel = options.securityLevel ? String(options.securityLevel).trim().replace(/,+$/, '') : undefined
  const keyword = String(query || '').trim()
  const browsing = !keyword
  const sortBy = sanitizeSortBy(options.sortBy, browsing ? 'download_count' : cfg.sortBy)
  const signal = options.signal
  const fetchImpl = options.fetchImpl
  const installed = options.installed
  const common = { cfg, category, platform, securityLevel, sortBy, limit, offset, installed, signal, fetchImpl }

  if (keyword) {
    const parsed = await searchViaIndex(keyword, common)
    if (parsed.items.length || parsed.total > offset) {
      return {
        query: keyword,
        category,
        sortBy,
        items: parsed.items,
        total: parsed.total,
        offset,
        hasMore: offset + parsed.items.length < parsed.total,
      }
    }
    // 关键词无结果时回退到热门浏览。
    const popular = await listViaSkills(common)
    return {
      query: keyword,
      category,
      sortBy,
      items: popular.items,
      total: popular.total,
      offset,
      hasMore: offset + popular.items.length < popular.total,
      fallback: true,
    }
  }

  const popular = await listViaSkills(common)
  return {
    query: '',
    category,
    sortBy,
    items: popular.items,
    total: popular.total,
    offset,
    hasMore: offset + popular.items.length < popular.total,
  }
}

export function fetchOpts(cfg: Pick<PluginConfig, 'timeoutMs' | 'userAgent'>): FetchOptions {
  return { timeoutMs: cfg.timeoutMs, userAgent: cfg.userAgent }
}

export interface SkillDetail {
  skill_id: string
  name: string
  description: string
  version: string
  author?: string
  source?: string
  source_url?: string
  repo_url?: string
  category: string
  categoryLabel: string
  platform?: string
  tags: string[]
  risk_score?: number | null
  download_count: number
  rating?: string | null
  content?: string | null
  updated_at?: string | null
}

/** 详情（完整，含 content/author/source_url/repo_url/rating）：/api/v1/skills/{skill_id}。 */
export async function fetchSkillDetail(
  skill_id: string,
  cfg: PluginConfig,
  signal?: AbortSignal,
  fetchImpl?: typeof fetchJson,
): Promise<SkillDetail | null> {
  const id = parseSlug(skill_id)
  const fetch = fetchImpl || fetchJson
  const url = `${cfg.apiBase.replace(/\/$/, '')}/api/v1/skills/${encodeURIComponent(id)}`
  try {
    const body = await fetch<WittyhubEnvelope<WittyhubSkillRaw>>(url, fetchOpts(cfg), signal)
    const raw = unwrapEnvelope<WittyhubSkillRaw>(body, url)
    const category = String(raw.category || '').trim()
    return {
      skill_id: String(raw.skill_id || id),
      name: String(raw.name || id),
      description: String(raw.description || ''),
      version: String(raw.version || 'latest'),
      author: raw.author || undefined,
      source: raw.source || undefined,
      source_url: raw.source_url || undefined,
      repo_url: raw.repo_url || undefined,
      category,
      categoryLabel: categoryLabel(category),
      platform: raw.platform || undefined,
      tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
      risk_score: typeof raw.risk_score === 'number' ? raw.risk_score : undefined,
      download_count: Number(raw.download_count) || 0,
      rating: raw.rating || undefined,
      content: raw.content || undefined,
      updated_at: raw.updated_at || undefined,
    }
  } catch {
    return null
  }
}
