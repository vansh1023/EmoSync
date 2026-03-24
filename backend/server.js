require('dotenv').config()
const app = require('./src/app.js')
const connectToDB = require('./src/config/database.js')



// Connected to Database
connectToDB()



app.listen(process.env.Port, () => {
    console.log(`Server is running on Port: ${process.env.Port}`)
})