import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeZipFiles, parseFrontmatter, parseVersion, safeRelPath, skillDir } from '../install.js'
import { join } from 'node:path'

test('parseFrontmatter extracts name description version', () => {
  const meta = parseFrontmatter('---\nname: My Skill\ndescription: does things\nversion: 1.2.0\n---\nbody')
  assert.deepEqual(meta, { name: 'My Skill', description: 'does things', version: '1.2.0' })
})

test('parseFrontmatter handles quoted and block scalars', () => {
  const meta = parseFrontmatter('---\nname: "Quoted"\ndescription: |\n  line one\n  line two\n---\n')
  assert.equal(meta.name, 'Quoted')
  assert.equal(meta.description, 'line one\nline two')
})

test('parseFrontmatter tolerates missing frontmatter', () => {
  assert.deepEqual(parseFrontmatter('# no frontmatter'), {})
})

test('parseVersion accepts sane versions and strips v prefix', () => {
  assert.equal(parseVersion('v1.0.0'), '1.0.0')
  assert.equal(parseVersion('1.0.0'), '1.0.0')
  assert.equal(parseVersion('latest'), 'latest')
  assert.equal(parseVersion(''), '')
  assert.throws(() => parseVersion('../../etc'), /无效版本/)
})

test('safeRelPath rejects traversal and absolute paths', () => {
  assert.equal(safeRelPath('SKILL.md'), 'SKILL.md')
  assert.throws(() => safeRelPath('../x'), /不安全路径/)
  assert.throws(() => safeRelPath('/etc/passwd'), /不安全路径/)
  assert.throws(() => safeRelPath('a/../../b'), /不安全路径/)
})

test('skillDir rejects path traversal and stays inside root', () => {
  // parseSlug 先拒绝 `..` 等危险输入。
  assert.throws(() => skillDir('/tmp/skills', '..'), /无效 skill_id/)
  assert.throws(() => skillDir('/tmp/skills', '../etc'), /无效 skill_id/)
  const target = skillDir('/tmp/skills', 'my-skill')
  assert.equal(target, join('/tmp/skills', 'my-skill'))
})

test('normalizeZipFiles strips a single common top dir', () => {
  const out = normalizeZipFiles({
    'my-skill/SKILL.md': Buffer.from('# skill'),
    'my-skill/refs/a.md': Buffer.from('a'),
  })
  assert.deepEqual(Object.keys(out).sort(), ['SKILL.md', 'refs/a.md'])
  assert.equal(out['SKILL.md'].toString(), '# skill')
})

test('normalizeZipFiles drops unsafe paths', () => {
  assert.throws(() => normalizeZipFiles({
    'SKILL.md': Buffer.from('# skill'),
    '../evil': Buffer.from('x'),
  }), /不安全路径/)
})
