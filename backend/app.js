require('dotenv').config()

const express = require('express')

const bot = require('./bot')
const { PendingMessage } = require('./orm')

const app = express()
const { PORT = 2901 } = process.env


app.get('/', (req, res) => {

})

app.get('/getPendingMessage', async (req, res) => {
  const msg = await PendingMessage.findOne()
  const { is_pending, content } = msg.toJSON()
  if (is_pending)
    await PendingMessage.update({
      is_pending: false
    }, {
      where: {}
    })
  res.json({
    isNew: is_pending,
    content: is_pending ? content : undefined
  })
})

// app.post(`/${ bot.TOKEN }`, (req, res) => {
//   bot.webhook(req.body)
//   res.sendStatus(200)
// })

app.listen(PORT, () => {
  console.log(`App is listening on port ${ PORT }`)
})

bot.longPolling()
