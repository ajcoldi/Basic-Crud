require('dotenv').config()
const { Router } = require('express')
const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

//METHOD OVERRIDE IS USED TO MAKE IT SO A FORM BUTTON IS NOT LIMMITED TO GET/POST
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

 
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user:user1234@cluster0.czjuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to db'))

const People = require('./models/nameModel')


app.get('/', async (req, res) => {
    const people = await People.find()
    res.render('index', { people: people })

})
app.get('/:id', async (req, res) => {
    const people = await People.findById(req.params.id)
    if (people == null) res.redirect('/')
    res.render('show', { people: people })
})

app.delete('/:id', async (req, res) => {
    await People.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
app.get('/edit/:id', async (req, res) => {
    const person = await People.findById(req.params.id)
    res.render('edit', { person: person })
})


app.post('/', async (req, res) => {
    let person = new People({
        name: req.body.name,
        age: req. body.age
    })
    try {
        person = await person.save()
        res.redirect('/')
    } catch {
        res.send('errorrrrr')
    }
    
})

app.put('/:id', async (req, res) => {
    req.person = await People.findById(req.params.id)
    
    let person = req.person
        person.name = req.body.name
        person.age = req. body.age
    try {
        person = await person.save()
        res.redirect('/')
    } catch {
        res.send('errorrrrr')
    }
})

app.listen(3000, () => console.log('listening on port 3000'))