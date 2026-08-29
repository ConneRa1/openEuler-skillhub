export type SortBy = 'updated_at' | 'download_count'

export interface FetchOptions {
  timeoutMs: number
  userAgent: string
}

export interface PluginConfig {
  apiBase: string
  webBase: string
  skillsDir: string
  timeoutMs: number
  userAgent: string
  maxResults: number
  sortBy: SortBy
}

export interface SkillCard {
  skill_id: string
  name: string
  description: string
  category: string
  categoryLabel: string
  version: string
  author?: string
  source?: string
  source_url?: string
  platform?: string
  tags: string[]
  risk_score?: number | null
  download_count: number
  rating?: string | null
  created_at?: string | null
  updated_at?: string | null
  pageUrl: string
  installed?: boolean
}

export interface SearchResult {
  query: string
  category?: string
  sortBy: SortBy
  items: SkillCard[]
  total: number
  offset: number
  hasMore: boolean
  fallback?: boolean
}

export interface InstalledSkill {
  slug: string
  name: string
  description: string
  version?: string
  path: string
}

/** 已安装技能的本地 Meta 统计（只读，带截断保护）。 */
export interface SkillMetaStat {
  files: number
  totalBytes: number
  mtimeMs: number
  truncated: boolean
}

export type InstalledSkillMeta = InstalledSkill & SkillMetaStat

export interface InstallResult {
  slug: string
  name: string
  version: string
  path: string
  files: number
}

/** wittyhub /api/v1 返回的单个技能原始对象（SkillResponse 序列化后的字段）。 */
export interface WittyhubSkillRaw {
  id?: string
  skill_id?: string
  name?: string
  description?: string | null
  version?: string | null
  commit_id?: string | null
  author?: string | null
  source?: string
  source_url?: string
  repo_url?: string | null
  category?: string | null
  category_label?: string | null
  tags?: string[] | null
  platform?: string | null
  risk_score?: number | null
  download_count?: number | null
  period_downloads?: number | null
  rating?: string | null
  created_at?: string | null
  updated_at?: string | null
  last_indexed_at?: string | null
  content?: string | null
  metadata?: Record<string, unknown> | null
}

/**
 * wittyhub 统一响应壳：所有 2xx JSON 响应会被 ResponseWrapper 包装成
 * { code, msg, data }。data 内才是真正的业务载荷。
 */
export interface WittyhubEnvelope<T> {
  code: number
  msg?: string
  data?: T
}

/** /api/v1/skills 列表响应。 */
export interface WittyhubListData {
  skills?: WittyhubSkillRaw[]
  total?: number
  skip?: number
  limit?: number
}

/** /api/v1/index/search 响应。 */
export interface WittyhubSearchData {
  results?: WittyhubSkillRaw[]
  total?: number
  query?: string
  skip?: number
  limit?: number
  mode?: string
}
