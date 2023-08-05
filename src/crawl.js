const { JSDOM } = require('jsdom')

function normalizeURL (url) {
  const parsedURL = new URL(url)
  const { pathname } = parsedURL
  parsedURL.protocol = 'http:'
  if (pathname.charAt(pathname.length - 1) === '/') parsedURL.pathname = pathname.slice(0, pathname.length - 1)
  return parsedURL.toString()
}

function getURLsFromHTML (htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody)
  const anchors = Array.from(dom.window.document.querySelectorAll('a'))
  const res = anchors.map((a) => {
    let { href } = a
    if (href.charAt(0) === '/') href = `${baseURL}${href}`
    return href
  })
  return res
}

async function crawlPage (baseURL, currentURL, pages) {
  if (!currentURL.startsWith(baseURL)) return pages
  const normalURL = normalizeURL(currentURL)
  if (pages.has(normalURL)) {
    pages.set(normalURL, pages.get(normalURL) + 1)
    return pages
  } else pages.set(normalURL, 0)
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
  if (!response.headers.get('Content-Type').includes('text/html')) {
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

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}