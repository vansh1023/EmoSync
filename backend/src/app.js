const express = require('express')
const cookieParser = require('cookie-parser')



// Creating server instance
const app = express()


// Middlewares
app.use(express.json())
app.use(cookieParser())




// Require Routes
const authRoutes = require('./routes/auth.route.js')




// Use Routes
app.use('/api/auth', authRoutes)





module.exports = app