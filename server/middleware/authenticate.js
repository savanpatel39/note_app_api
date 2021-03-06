var { User } = require('../models/user');

var authenticate = (req,res,next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        //User is valid as the token received from client matches with stored token
        req.user = user;
        req.token = token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    });
}

module.exports = { authenticate };