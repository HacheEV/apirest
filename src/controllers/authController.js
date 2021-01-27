const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../services/user-service');
const { User } = require('../models/mongoose');


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
});
router.post('/register', (req, res) => {
    const hashedPass = bcrypt.hashSync(req.body.password, 8);
    const token = jwt.sign({id: req.body.email}, process.env.SECRET, {expiresIn: 86400});
    
    try{
        UserService.create({email: req.body.email, password: hashedPass, token: token});
        res.status(201).send({token: token});
    }catch(e){
        console.log(e);
        res.status(500).send({error: e});
    }
   
});
router.post('/login', (req, res) => {
    
        User.findOne({ email: req.body.email}, (err, user) => {

            if(err) return res.status(500).send("Server error");
            if(!user) return res.status(404).send('User not found');
    
            const passwordValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordValid) return res.status(401).send({token: null});
    
            const token = jwt.sign({id: user.email}, process.env.SECRET, {expiresIn: 86400});
            res.status(200).send({token: token});
        })
  
})

module.exports = router;