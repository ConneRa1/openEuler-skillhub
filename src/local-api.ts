import type { IncomingMessage, ServerResponse } from 'node:http'
import { clamp, dirSlug, fetchSkillDetail, parseSlug, searchSkills } from './api.js'
import { parseCategory } from './categories.js'
import { assignConfig, publicConfig, sanitizePatch, sanitizeSortBy, writeOverlay } from './config-store.js'
import { installSkill, installedSlugs, listInstalled, uninstallSkill } from './install.js'
import { fetchJson } from './http.js'
import type { PluginConfig } from './types.js'

export async function handleApi(req: IncomingMessage, res: ServerResponse, cfg: PluginConfig): Promise<void> {
  try {
    const url = new URL(req.url || '/', 'http://127.0.0.1')
    const body = req.method === 'POST' ? await readBody(req) : {}
    const method = String(body.method || url.searchParams.get('method') || 'search')
    if (method === 'search') {
      const query = String(body.query || url.searchParams.get('query') || '').trim()
      const category = parseCategory(body.category || url.searchParams.get('category'))
      const platform = String(body.platform || url.searchParams.get('platform') || '').trim() || undefined
      const securityLevel = String(body.securityLevel || body.security_level || url.searchParams.get('security_level') || '').trim() || undefined
      const explicit = Number(body.limit)
      const limit = Number.isFinite(explicit) && explicit > 0 ? clamp(explicit, 1, 96) : cfg.maxResults
      const offset = Math.max(0, Math.floor(Number(body.offset) || 0))
      const installed = await installedSlugs(cfg.skillsDir)
      const result = await searchSkills(query, {
        cfg,
        category,
        platform,
        securityLevel,
        sortBy: sanitizeSortBy(body.sortBy, query ? cfg.sortBy : 'download_count'),
        limit,
        offset,
        installed,
      })
      return sendJson(res, 200, { ok: true, ...result })
    }
    if (method === 'install') {
      const slug = String(body.slug || url.searchParams.get('slug') || '').trim()
      if (!slug) return sendJson(res, 400, { ok: false, error: '缺少 skill_id' })
      const result = await installSkill(slug, cfg)
      return sendJson(res, 200, { ok: true, ...result })
    }
    if (method === 'list') {
      const items = await listInstalled(cfg.skillsDir)
      return sendJson(res, 200, { ok: true, skillsDir: cfg.skillsDir, items })
    }
    if (method === 'uninstall') {
      const slug = String(body.slug || url.searchParams.get('slug') || '').trim()
      if (!slug) return sendJson(res, 400, { ok: false, error: '缺少 skill_id' })
      const result = await uninstallSkill(slug, cfg.skillsDir)
      return sendJson(res, 200, { ok: true, ...result })
    }
    if (method === 'config') {
      if (body.save) {
        assignConfig(cfg, sanitizePatch(body))
        writeOverlay(cfg)
      }
      return sendJson(res, 200, { ok: true, ...publicConfig(cfg) })
    }
    if (method === 'detail') {
      const slug = parseSlug(String(body.slug || url.searchParams.get('slug') || ''))
      const detail = await fetchSkillDetail(slug, cfg)
      if (!detail) return sendJson(res, 404, { ok: false, error: `技能不存在: ${slug}` })
      const installed = await installedSlugs(cfg.skillsDir)
      // 已安装集合以安装目录名（dirSlug）为准，与路径式 skill_id 做同规格比较。
      return sendJson(res, 200, {
        ok: true,
        installed: installed.has(dirSlug(slug)),
        skill: detail,
      })
    }
    if (method === 'stats') {
      const stats = await fetchStats(cfg)
      return sendJson(res, 200, { ok: true, stats })
    }
    if (method === 'audit') {
      const slug = parseSlug(String(body.slug || url.searchParams.get('slug') || ''))
      const audit = await fetchAudit(slug, cfg)
      return sendJson(res, 200, { ok: true, audit })
    }
    sendJson(res, 400, { ok: false, error: 'unknown method' })
  } catch (err) {
    sendJson(res, 500, { ok: false, error: err instanceof Error ? err.message : String(err) })
  }
}

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = []
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c))
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return {}
  }
}

interface Envelope<T> { code?: number; msg?: string; data?: T }

async function wittyJson<T>(cfg: PluginConfig, path: string): Promise<T> {
  const url = `${cfg.apiBase.replace(/\/$/, '')}${path}`
  const body = await fetchJson<Envelope<T>>(url, { timeoutMs: cfg.timeoutMs, userAgent: cfg.userAgent })
  if (!body || body.data === undefined) throw new Error(`wittyhub 返回异常: ${url}`)
  return body.data
}

async function fetchStats(cfg: PluginConfig): Promise<unknown> {
  try { return await wittyJson(cfg, '/api/v1/index/stats') } catch { return null }
}

async function fetchAudit(skill_id: string, cfg: PluginConfig): Promise<unknown> {
  const id = parseSlug(skill_id)
  try { return await wittyJson(cfg, `/api/v1/skills/${encodeURIComponent(id)}/audit`) } catch { return null }
}

function sendJson(res: ServerResponse, code: number, body: unknown): void {
  res.statusCode = code
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}
