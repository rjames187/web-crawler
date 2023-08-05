import { crawlPage } from './crawl/crawlUtils.js'
import { printReport } from './report/report.js'
import SequentialCrawler from './crawl/SequentialCrawler.js'
import ConcurrentCrawler from './crawl/ConcurrentCrawler.js'

async function main () {
  const args = process.argv.slice(2)
  if (!args.length) {
    console.log('base URL argument is required')
    return
  }
  if (args.length > 1) {
    console.log('base URL should be the only argument')
    return
  }
  const baseURL = args[0]
  const crawler = new SequentialCrawler(baseURL)
  console.log(`Crawler is starting at ${baseURL}...`)
  const pages = await crawler.crawlPage(baseURL, baseURL, new Map())
  printReport(pages)
}

main()
