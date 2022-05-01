const { Sequelize, DataTypes } = require('sequelize')
const { execSync } = require('child_process')


if (!process.env.DATABASE_URL) {
  execSync('heroku config').toString().split('\n').forEach(
    line => {
      if (line.startsWith('DATABASE_URL')) {
        process.env.DATABASE_URL = line.split(' ')[1].trim()
      }
    })
}

const db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
})

db.authenticate()
  .then(() => console.log('Connection to database has been established successfully!'))
  .catch(error => console.error('Unable to connect to the database:', error))


const PendingMessage = db.define('User', {
  is_pending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'pending_message',
  timestamps: false
})


db.sync()


module.exports = {
  PendingMessage
}
