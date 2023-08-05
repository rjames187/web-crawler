import { JSDOM } from 'jsdom'

export function normalizeURL (url: string) {
  const parsedURL = new URL(url)
  const { pathname } = parsedURL
  parsedURL.protocol = 'http:'
  if (pathname.charAt(pathname.length - 1) === '/')
    parsedURL.pathname = pathname.slice(0, pathname.length - 1)
  return parsedURL.toString()
}

export function getURLsFromHTML (htmlBody: string, baseURL: string) {
  const dom = new JSDOM(htmlBody)
  const anchors = Array.from(dom.window.document.querySelectorAll('a'))
  const res = anchors.map(a => {
    let { href } = a
    if (href.charAt(0) === '/') href = `${baseURL}${href}`
    return href
  })
  return res
}

export async function crawlPage (
  baseURL: string,
  currentURL: string,
  pages: Map<string, number>
) {
  if (!currentURL.startsWith(baseURL)) return pages
  const normalURL = normalizeURL(currentURL)
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
    console.log(`response is ${response.headers.get('Content-Type')} not html`)
    return pages
  }
  const html = await response.text()
  const urls = getURLsFromHTML(html, baseURL)
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages)
  }
  return pages
}
