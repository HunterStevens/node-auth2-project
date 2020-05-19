const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const profiles = require('./profile-model');
const configVars = require('../data/ConfigVars');

router.post('/register', (req,res)=>{

});

router.post('/login', (req,res) =>{

});

router.get('/users', (req,res)=>{

});

function authorized(req, res, next){
    // add code here to verify users are logged in
    const token = req.headers.authorization;
  
    if(token){
      const secret = process.env.JWT_SECRET ||'keepitsecret'
  
      jwt.verify(token, secret, (error,decodedToken) =>{
        if(error){
          res.status(401).json({message:'Hacker has been identified.'})
        }else{
          req.jwt = decodedToken;
          next();
        }
      })
    }else{
      res.status(400).json({message:'please provide the authentication.'})
    }
  }

function createToken(subject){
    const payload = {
      sub:subject.id,
      username:subject.username,
      role:subject.role
    };
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, configVars.jwtSecret, options);
  }

module.exports = router;