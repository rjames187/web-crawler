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

async function crawlPage (baseURL) {
  try {
      const response = await fetch(baseURL, {
      method: 'GET'
    })
  } catch (e) {
    console.log(e)
  }
  if (response.status >= 400) {
    console.log(`request to ${baseURL} failed with status ${response.status}`)
    return
  }
  if (response.headers.get('content-type') !== 'text/html') {
    console.log('response is not html')
    return
  }
  const html = await response.text()
  console.log(html)
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}