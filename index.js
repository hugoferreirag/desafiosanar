const app = require('express')();
const consign = require('consign');
const db = require('./config/db')
const mongoose = require('mongoose');

app.db = db

consign()
    .include('./config/passport.js')
    .then('./models/validations.js')
    .then('./config/middlewares.js')
    .then('./controllers')
    .then('./models')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () =>{
    console.log('Back end running');
})
module.exports = app