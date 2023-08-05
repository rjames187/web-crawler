export function sortPageEntries (arr: [string, number][]) {
  arr.sort((a, b) => b[1] - a[1])
  return arr
}

export function printReport (pages: Map<string, number>) {
  console.log('Report starting ...')
  const arr = Array.from(pages.entries())
  sortPageEntries(arr)
  for (const [url, count] of arr) {
    console.log(`Found ${count} internal links to ${url}`)
  }
}
