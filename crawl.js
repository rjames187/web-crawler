function normalizeURL (url) {
  const parsedURL = new URL(url)
  const { pathname } = parsedURL
  parsedURL.protocol = 'http:'
  if (pathname.charAt(pathname.length - 1) === '/') parsedURL.pathname = pathname.slice(0, pathname.length - 1)
  return parsedURL.toString()
}

module.exports = {
  normalizeURL
}