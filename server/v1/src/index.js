const express = require('express')
const http = require('http')
const cors = require('cors')
const config = require('./config/index')
const responseHandler = require('./middlewares/responseHandler')
const routes = require('./routes/index')
const cookieParser = require('cookie-parser')
const { duesCronJob } = require('./helpers/addDuesToAllResidents')

config()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(responseHandler)
app.use('/api/v1', routes)

// duesCronJob.start();

const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`🚀🚀🚀 Server ready at: http://localhost:${PORT} 🚀🚀🚀`)
})
