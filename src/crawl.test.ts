import { normalizeURL, getURLsFromHTML } from './crawl'

const NORMAL_URL = 'http://wagslane.dev/path'

const ONE_LINK_HTML = `<html>
  <body>
      <a href="https://blog.boot.dev/funny"><span>Go to Boot.dev</span></a>
  </body>
  </html>`

const THREE_LINK_HTML = `<html>
  <body>
      <a href="https://blog.boot.dev/funny"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/funny"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev/funny"><span>Go to Boot.dev</span></a>
  </body>
  </html>`

const REL_LINK_HTML = `<html>
<body>
    <a href="/blog"><span>Go to Boot.dev</span></a>
</body>
</html>`

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

test('extracts a link from html', () => {
  const links = getURLsFromHTML(ONE_LINK_HTML, 'https://blog.boot.dev')
  expect(links[0]).toEqual('https://blog.boot.dev/funny')
})

test('extracts multiple links from html', () => {
  const links = getURLsFromHTML(THREE_LINK_HTML, 'https://blog.boot.dev')
  expect(links).toHaveLength(3)
  for (const link of links) {
    expect(link).toEqual('https://blog.boot.dev/funny')
  }
})

test('expect relative urls to be populated with base url', () => {
  const links = getURLsFromHTML(REL_LINK_HTML, 'https://blog.boot.dev')
  expect(links[0]).toEqual('https://blog.boot.dev/blog')
})
