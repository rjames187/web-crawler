import { crawlPage } from './crawl/crawlUtils.js'
import { printReport } from './report/report.js'
import SequentialCrawler from './crawl/SequentialCrawler.js'
import ConcurrentCrawler from './crawl/ConcurrentCrawler.js'
import { performance } from 'perf_hooks'

async function main () {
  const args = process.argv.slice(2)
  if (!args.length) {
    console.log('base URL argument is required')
    return
  }
  if (args.length > 2) {
    console.log('base URL and crawler type should be the only argument')
    return
  }
  const baseURL = args[0]
  const crawlerName = args[1] || 'concurrent'
  if (!['sequential', 'concurrent'].includes(crawlerName)) {
    console.log('Crawler type can only be sequential or concurrent')
    return
  }
  let crawler = undefined
  if (crawlerName === 'sequential') crawler = new SequentialCrawler(baseURL)
  else crawler = new ConcurrentCrawler(baseURL)
  console.log(`Crawler is starting at ${baseURL}...`)
  const start = performance.now()
  const pages = await crawler.crawlPage(baseURL, baseURL, new Map())
  printReport(pages)
  const end = performance.now()
  const elapsed = end - start
  console.log(`Completed in ${elapsed} ms`)
}

main()
