const process = require('process')

function main () {
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
  console.log(`Crawler is starting at ${baseURL}...`)
}

main()