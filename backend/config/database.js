const mongoose = require("mongoose");

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log(`database is running on ${process.env.MONGO_URI}`);
    })
    .catch(()=>{
        console.log("error in connecting database")
    })
};




