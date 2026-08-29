import assert from 'node:assert/strict'
import test from 'node:test'
import { CATEGORY_KEYS, CATEGORIES, categoryLabel, parseCategory } from '../categories.js'

test('category labels cover all canonical keys', () => {
  for (const key of CATEGORY_KEYS) {
    assert.ok(CATEGORIES[key], `missing label for ${key}`)
  }
  assert.equal(categoryLabel('Research and Design'), '研究设计')
  assert.equal(categoryLabel('Security Hardening'), '安全加固')
  assert.equal(categoryLabel('others'), '其他')
})

test('categoryLabel falls back to raw key for unknown', () => {
  assert.equal(categoryLabel('bogus'), 'bogus')
  assert.equal(categoryLabel(undefined), '')
})

test('parseCategory accepts canonical keys and rejects others', () => {
  assert.equal(parseCategory('Development and Build'), 'Development and Build')
  assert.equal(parseCategory('   others  '), 'others')
  assert.equal(parseCategory('not-a-category'), undefined)
  assert.equal(parseCategory(undefined), undefined)
  assert.equal(parseCategory(''), undefined)
})
