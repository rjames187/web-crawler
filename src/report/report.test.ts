import { sortPageEntries } from './report'

test('sorting an empty list returns an empty list', () => {
  const res = sortPageEntries([])
  expect(res).toEqual([])
})

test('sorting one item makes no changes', () => {
  const res = sortPageEntries([['url', 1]])
  expect(res).toEqual([['url', 1]])
})

test('sorts in descending order', () => {
  const res = sortPageEntries([
    ['url', 1],
    ['url', 2]
  ])
  expect(res).toEqual([
    ['url', 2],
    ['url', 1]
  ])
})

test('doesnt sort by url string', () => {
  const res = sortPageEntries([
    ['a', 1],
    ['b', 1]
  ])
  expect(res).toEqual([
    ['a', 1],
    ['b', 1]
  ])
})

test('sorts three entries correctly', () => {
  const res = sortPageEntries([
    ['url', 4],
    ['url', 2],
    ['url', 5]
  ])
  expect(res).toEqual([
    ['url', 5],
    ['url', 4],
    ['url', 2]
  ])
})
