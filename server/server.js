require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', async (req,res) => {
    try{
        const body = _.pick[req.body, ['email','password']];
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    }catch(err){
        res.status(400).send(err);
    }
});

app.listen( port , () => {
    console.log("Server Started on",port);
});