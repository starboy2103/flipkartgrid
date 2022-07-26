var express = require('express');
require('dotenv').config();
var cors = require('cors')

const app=express();


//app.use('/',require('./src/apis/routes/home'));
app.use('/api/',require('./src/apis/routes/api'))

// app.get('/tp.js',(req,res)=>{
//     res.sendFile(__dirname+'/tp.js')
// })

app.listen(process.env.PORT);