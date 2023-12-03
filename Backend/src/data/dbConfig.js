require('dotenv').config()

const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URI_PROD


const connect = async () =>{
   try {
    await  mongoose.connect(MONGO_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true
        

    })

    console.log("conectado")
       
   } catch (error) {

    console.log(error.message)
       
   }
    
    
}



module.exports = { connect }
