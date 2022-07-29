var express = require('express');
require('dotenv').config();
var cors = require('cors')

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/',require('./src/apis/middlewares/api'))


app.listen(process.env.PORT);