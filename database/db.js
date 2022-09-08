const mongoose = require('mongoose')


mongoose
    .connect('mongodb+srv://dkingbrandt:gorilla1986@cluster0.9zx9wmx.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
