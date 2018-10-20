const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const db = require('./db')
const app = express()
module.exports = app


const createApp = () => {
  //logging
  app.use(morgan('dev'))

  //body parsing
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  //compression
  app.use(compression())

  //routes
  app.use('/game', require('./api'))
  app.use('/move', require('./api'))
  //static
  app.use(express.static(path.join(__dirname, '..', 'public')))

  //send 404 for anything else
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err= new Error('Not Found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  //send index.html
  app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  //error handling
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal Server Error!')
  })
}

const startListening = () => {
  const server = app.listen(8080, () => {
    console.log('Server Listening on port 8080')
    })
}

const syncDb = () => db.sync()

async function bootApp() {
  await createApp()
  await syncDb()
  await startListening()
}

bootApp()
