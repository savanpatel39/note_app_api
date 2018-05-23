require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//signup new user
app.post('/users/signup', async (req,res) => {
    try{
        const body = _.pick(req.body, ['email','password']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    }catch(err){
        res.status(400).send(err);
    }
});

//signin user
app.post('/users/signin', async (req,res)=>{
    try{
        const body = _.pick(req.body,['email','password']);
        const user = await User.findByCredentials(body.email,body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    }catch(err){
        res.status(400).send();
    }
});


app.listen( port , () => {
    console.log("Server Started on",port);
});