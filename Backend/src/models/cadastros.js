const mongoose = require('mongoose')


const cadastroSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
   
    item: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: new Date
    }
    
})


module.exports = mongoose.model('cadastro', cadastroSchema)