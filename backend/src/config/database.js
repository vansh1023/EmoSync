const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/Emo-Sync-DB`);
        console.log("Connected to DB")
    } catch (err) {
        console.log(err)
    }
}


module.exports = connectToDB