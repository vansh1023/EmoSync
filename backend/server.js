require('dotenv').config()
const app = require('./src/app.js')
const connectToDB = require('./src/config/database.js')



// Connected to Database
connectToDB()


const port = process.env.Port || 3000
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})