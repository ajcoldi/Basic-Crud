const mongoose  = require('mongoose')

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('People', peopleSchema)