const TelegramBot = require('./telegrambot')
const { PendingMessage } = require('../orm')

const { TOKEN } = process.env
const CHANNEL_ID = -1001527772169

const bot = new TelegramBot(TOKEN)


async function handleChannelPost () {
  if ('text' in this.channel_post && this.channel_post.chat.id === CHANNEL_ID) {
    await PendingMessage.update({
      is_pending: true,
      content: this.channel_post.text
    }, { where: {} })
  }
}

function onUpdateReceived (update) {
  this.token = bot.token
  this.method = bot.method

  let func

  for (const [key, value] of Object.entries(update)) {
    switch (key) {
      case 'channel_post':
        this.channel_post = value
        func = handleChannelPost
        break
    }
  }

  return () => func?.()
}

module.exports = {
  TOKEN,
  longPolling: () => bot.longPolling(onUpdateReceived),
  webhook: onUpdateReceived
}
