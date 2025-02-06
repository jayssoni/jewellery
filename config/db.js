const mongoose = require('mongoose');

<<<<<<< HEAD
function connectDB()
{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connect to db")
    })
=======
const connectDB = async function userdb() {
   await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
>>>>>>> origin/jay
}

module.exports = connectDB;