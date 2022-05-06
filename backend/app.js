require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const bot = require('./bot')
const { PendingMessage } = require('./orm')

const app = express()
const { PORT, TOKEN, WEBHOOK } = process.env


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../frontend/dist')))

app.get('/', (req, res) => {
  res.sendFile('index.html')
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

app.post(`/${ TOKEN }`, (req, res) => {
  console.log('REQ.BODY', req.body)
  bot.webhook(req.body)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${ PORT }`)
})

if (WEBHOOK === 'no')
  bot.longPolling()
