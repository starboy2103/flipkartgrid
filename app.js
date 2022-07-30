var express = require('express');
require('dotenv').config();
const mongoose=require('mongoose')

//------------------------------SERVER CONNECTION--------------------------------------//

mongoose.connect('mongodb+srv://Kowshal:sadhushi1208@cluster0.jdqwe.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


//-------------------------------ROUTES-----------------------------------------------//

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/',require('./src/apis/middlewares/api'))
// app.use('/schemas/',require('./src/apis/middlewares/dbc'))


app.listen(process.env.PORT);