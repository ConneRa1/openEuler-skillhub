/**
 * openEuler WittyHub 的规范分类（英文 key -> 中文展示 label）。
 * 与 wittyhub/src/api/services/categories.py 保持一致。
 */
export const CATEGORIES: Record<string, string> = {
  'Research and Design': '研究设计',
  'Development and Build': '开发构建',
  'Engineering and Compilation': '工程编译',
  'Quality and Validation': '质量验证',
  'Release and Deployment': '发布部署',
  'Monitoring and Operations': '监控运维',
  'Performance Optimization': '性能优化',
  'Security Hardening': '安全加固',
  others: '其他',
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES)

export function categoryLabel(key: string | undefined): string {
  if (!key) return ''
  return CATEGORIES[key] || key
}

/**
 * 解析分类参数：接受单个规范分类 key，或逗号分隔的多个分类（wittyhub 上游
 * 把 `category` 查询参数按 `,` 拆分为多选过滤）。逐项校验为规范 key，
 * 合法项用逗号保留；全部非法或为空时返回 undefined（不传 category 过滤）。
 */
export function parseCategory(raw: unknown): string | undefined {
  const text = String(raw || '').trim()
  if (!text) return undefined
  const valid = text
    .split(',')
    .map((s) => s.trim())
    .filter((s) => CATEGORY_KEYS.includes(s))
  return valid.length > 0 ? valid.join(',') : undefined
}
