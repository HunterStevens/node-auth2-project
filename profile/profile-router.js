const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const profiles = require('./profile-model');
const configVars = require('../data/ConfigVars');

router.post('/register', (req,res)=>{
    const creds = req.body;
    console.log("req.body: ", req.body);
    if(profiles.isValid(creds)){
        const rounds = process.env.BCYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(creds.password, rounds);
        creds.password = hash;

        profiles.addProfile(creds).then(user =>{
            console.log("addProfile", user);
            res.status(201).json({data:user});
        }).catch(err =>{res.status(500).json(err.message)});
    }else{
        res.status(400).json({message:"credentials are invalid."})
    }
});

router.post('/login', (req,res) =>{
    const {username, password} = req.body;

    if(profiles.isValid(req.body)){
        profiles.findBy({username:username})
        .then(([user])=>{
            if(user && bcrypt.compareSync(password, user.password)){
                const token = createToken(user);
                res.status(200).json({token});
            }else{
                res.status(401).json({message:'re-enter credentials, correctly, next time'})
            }
        }).catch(err =>{res.status(500).json(err.message)});
    }else{
        res.status(400).json({message:'please provide the correct credentials'})
    }
});

router.use(authorized);
router.get('/users', (req,res)=>{
    profiles.getAll().then(user =>{
        res.status(200).json(user);
    }).catch(err =>{
        res.status(500).json(err.message);
    })
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