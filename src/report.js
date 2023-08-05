function sortPageEntries(arr) {
  arr.sort((a, b) => b[1] - a[1])
}

function printReport(pages) {
  console.log('Report starting ...')
  const arr = Array.from(pages.entries())
  sortPageEntries(arr)
  for (const [url, count] of arr) {
    console.log(`Found ${count} internal links to ${url}`)
  }
}

module.exports = {
  printReport
}