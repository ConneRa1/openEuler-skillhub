import assert from 'node:assert/strict'
import test from 'node:test'
import { dirSlug, mapSkill, parseSearchResponse, parseSlug, searchSkills } from '../api.js'
import { withDefaults } from '../config-store.js'
import type { PluginConfig, WittyhubEnvelope, WittyhubSearchData } from '../types.js'

function cfg(over: Partial<PluginConfig> = {}): PluginConfig {
  return withDefaults({ apiBase: 'http://localhost:8081', webBase: 'http://localhost:8080', ...over })
}

test('mapSkill maps wittyhub skill to a card', () => {
  const card = mapSkill({
    skill_id: 'deploy-to-vercel',
    name: 'Deploy to Vercel',
    description: '部署到 Vercel',
    category: 'Release and Deployment',
    tags: ['vercel', 'deploy'],
    download_count: 42,
    risk_score: 12,
  }, 'http://localhost:8080')
  assert.ok(card)
  assert.equal(card!.skill_id, 'deploy-to-vercel')
  assert.equal(card!.categoryLabel, '发布部署')
  assert.equal(card!.pageUrl, 'http://localhost:8080/skills/deploy-to-vercel')
  assert.equal(card!.download_count, 42)
  assert.equal(card!.installed, false)
})

test('mapSkill marks installed slugs', () => {
  const card = mapSkill({ skill_id: 'a-b' }, 'http://localhost:8080', new Set(['a-b']))
  assert.equal(card!.installed, true)
})

test('mapSkill skips empty skill_id', () => {
  assert.equal(mapSkill({ name: 'x' }, 'http://localhost:8080'), null)
})

test('parseSearchResponse unwraps wittyhub envelope', () => {
  const body: WittyhubEnvelope<WittyhubSearchData> = {
    code: 200,
    msg: 'ok',
    data: {
      results: [
        { skill_id: 'pdf-ocr', name: 'PDF OCR', download_count: 10 },
        { skill_id: 'report', name: '周报', download_count: 5 },
      ],
      total: 2,
      query: 'pdf',
    },
  }
  const parsed = parseSearchResponse(body, 'http://localhost:8080')
  assert.equal(parsed.total, 2)
  assert.equal(parsed.items.length, 2)
  assert.equal(parsed.items[0].skill_id, 'pdf-ocr')
})

test('parseSearchResponse rejects error code', () => {
  assert.throws(() => parseSearchResponse({ code: 500, msg: 'boom' }, 'http://localhost:8080'), /boom/)
})

test('parseSlug accepts canonical names and path-style ids', () => {
  assert.equal(parseSlug('@group/deploy-to-vercel'), 'group/deploy-to-vercel')
  assert.equal(parseSlug('pdf-ocr-md'), 'pdf-ocr-md')
  assert.equal(parseSlug('github/posthog/posthog/.agents/skills/writing-pr-descriptions'), 'github/posthog/posthog/.agents/skills/writing-pr-descriptions')
  assert.throws(() => parseSlug('../etc'), /无效 skill_id/)
  assert.throws(() => parseSlug(''), /无效 skill_id/)
})

test('dirSlug picks a safe trailing segment', () => {
  assert.equal(dirSlug('github/github/awesome-copilot/skills/convert-pdf-to-md'), 'convert-pdf-to-md')
  assert.equal(dirSlug('deploy-to-vercel'), 'deploy-to-vercel')
  assert.throws(() => dirSlug('../etc'), /无效 skill_id/)
})

test('searchSkills with a keyword returns index results and hasMore', async () => {
  const c = cfg()
  const fake = async <T>(_url: string) => ({
    code: 200,
    msg: 'ok',
    data: { results: [{ skill_id: 'pdf-ocr', name: 'PDF OCR' }], total: 1, query: 'pdf' },
  } as unknown as T)
  const r = await searchSkills('pdf', { cfg: c, limit: 1, offset: 0, fetchImpl: fake, installed: new Set() })
  assert.equal(r.items.length, 1)
  assert.equal(r.items[0].skill_id, 'pdf-ocr')
  assert.equal(r.hasMore, false)
})

test('searchSkills falls back to popular browse when keyword yields nothing', async () => {
  const c = cfg()
  let hitIndex = false
  const fake = async <T>(url: string) => {
    if (String(url).includes('/index/search')) {
      hitIndex = true
      return { code: 200, msg: 'ok', data: { results: [], total: 0 } } as unknown as T
    }
    // /api/v1/skills browse
    return {
      code: 200,
      msg: 'ok',
      data: { skills: [{ skill_id: 'popular-1', name: '热门' }], total: 1 },
    } as unknown as T
  }
  const r = await searchSkills('nonexistent', { cfg: c, limit: 1, offset: 0, fetchImpl: fake, installed: new Set() })
  assert.ok(hitIndex)
  assert.equal(r.fallback, true)
  assert.equal(r.items[0].skill_id, 'popular-1')
})

test('searchSkills browse uses /api/v1/skills without keyword', async () => {
  const c = cfg()
  let hitList = false
  const fake = async <T>(url: string) => {
    hitList = String(url).includes('/api/v1/skills?')
    assert.ok(String(url).includes('sort_by='), 'browse should use sort_by')
    return {
      code: 200,
      msg: 'ok',
      data: { skills: [{ skill_id: 'popular', name: '热门技能', download_count: 99 }], total: 1 },
    } as unknown as T
  }
  const r = await searchSkills('', { cfg: c, limit: 1, offset: 0, fetchImpl: fake, installed: new Set() })
  assert.ok(hitList)
  assert.equal(r.items[0].skill_id, 'popular')
})
