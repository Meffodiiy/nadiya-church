const https = require('https')

class TelegramBot {

  constructor(token) {
    this.token = token
  }

  method(method, data, callback) {
    data = JSON.stringify(data)
    const req = https.request(
      {
        method: 'POST',
        hostname: 'api.telegram.org',
        path: `/bot${ this.token }/${ method }`,
        encoding: null,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      },
      res => {
        res.setEncoding('utf-8')
        res.on('data', data => {
          const { ok, result, error_code, description } = JSON.parse(data)
          if (ok) callback?.(result)
          else console.error(`ERROR ${ error_code }: ${ description }`)
        })
      }
    )
    req.write(data)
    req.end()
  }

  longPolling(callback) {
    let lastUpdatedId = 0
    const loop = () => {
      this.method('getUpdates', {
        offset: lastUpdatedId
      }, updates => {
        updates.forEach(update => {
          lastUpdatedId = update['update_id'] + 1
          callback(update)()
        })
        setTimeout(loop, 1)
      })
    }
    setTimeout(loop, 1)
  }

  webhook(callback) {
    return update => callback(update)()
  }
}

module.exports = TelegramBot
