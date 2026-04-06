const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')



// Creating server instance
const app = express()


// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))




// Require Routes
const authRoutes = require('./routes/auth.route.js')




// Use Routes
app.use('/api/auth', authRoutes)





module.exports = app