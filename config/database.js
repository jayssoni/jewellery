const mongoose = require('mongoose')

function dbConneection()
{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB Connection successfully")
    })
}
module.exports = dbConneection;