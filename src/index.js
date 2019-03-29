const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn')
    .then(db => console.log('BD esta conectada'))
    .catch(err => console.error(err))

//Setting
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json())

//Routes
app.use('/tasks', require('./routes/tasks'))

//Static files
app.use(express.static(__dirname+'/public'))

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})