const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

const NORMAL_URL = 'http://wagslane.dev/path'

test('a slash at the end of a url is removed', () => {
  const res = normalizeURL('http://wagslane.dev/path/')
  expect(res).toEqual(NORMAL_URL)
})

test('https is converted to http', () => {
  const res = normalizeURL('https://wagslane.dev/path')
  expect(res).toEqual(NORMAL_URL)
})

test('url to converted to lower case', () => {
  const res = normalizeURL('http://wagsLane.Dev/path')
  expect(res).toEqual(NORMAL_URL)
})

test('multiple aspects can be normalized at once', () => {
  const res = normalizeURL('https://WagsLane.DEV/path/')
  expect(res).toEqual(NORMAL_URL)
})