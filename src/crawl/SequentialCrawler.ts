import { AbstractCrawler } from './crawlUtils.js'

export default class SequentialCrawler extends AbstractCrawler {
  public async crawlPage (
    baseURL: string,
    currentURL: string,
    pages: Map<string, number>
  ): Promise<Map<string, number>> {
    if (!currentURL.startsWith(baseURL)) return pages
    const normalURL = this.normalizeURL(currentURL)
    const seenBefore = pages.has(normalURL)
    if (seenBefore) {
      const curPageCount = pages.get(normalURL)!
      pages.set(normalURL, curPageCount + 1)
      return pages
    }
    pages.set(normalURL, 0)
    console.log(`requesting ${normalURL}`)
    let response
    try {
      response = await fetch(baseURL, {
        method: 'GET'
      })
    } catch (e) {
      console.log(e)
      return pages
    }
    if (response.status >= 400) {
      console.log(`request to ${baseURL} failed with status ${response.status}`)
      return pages
    }
    if (!response.headers.get('Content-Type')?.includes('text/html')) {
      console.log(
        `response is ${response.headers.get('Content-Type')} not html`
      )
      return pages
    }
    const html = await response.text()
    const urls = this.getURLsFromHTML(html, baseURL)
    for (const url of urls) {
      pages = await this.crawlPage(baseURL, url, pages)
    }
    return pages
  }
}
