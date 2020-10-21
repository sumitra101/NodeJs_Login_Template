const express= require('express');
const User = require('../models/User');

const router=express.Router();

//User models
const user=require('../models/User');

//Login Page
router.get('/login',(req,res)=> res.render('login'));

//Register Page
router.get('/register',(req,res)=> res.render('register'));

//Register handle
router.post('/register',(req,res)=>{
    const{name, email, password,password2}=req.body;
    let errors=[];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill all the fields'});
    }

    //Check passwords match
    if(password !== password2){
        errors.push({msg:'Password do not match'});
    }

    //Check password length
    if(password.length<6){
        errors.push({msg:'Password should be at least 6 character'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //validation passed
        User.findOne({email : email})
        .then(user=>{
            if(user){
                //user exist
                errors.push({msg:'Email already exist'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                //validation passed
                User.findOne({email:email})
                .then(user=>{
                    if(user){
                        //User exists
                        errors.push({msg:'Email already registered'});
                        res.render('register',{
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                    }else{
                        
                    }
                })
            }
        });
    }
})

module.exports=router;