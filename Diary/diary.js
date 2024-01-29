"use-strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const initializePassport = require('../userAccess/logInInstatialization ');
const createNewAccount = require('../userAccess/createNewAccount');
require('dotenv').config({path:".env"});
const mysql = require('mysql');

console.log(process.env.PASSWORD,"heere")
const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth:true
});

initializePassport(passport,mysqlConnection);

router.use(express.urlencoded({extended:false}));
router.use(flash());
router.use(session({
    secret: process.env.SECRET,
    // secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride('_method'));

router.get('/homepage', checkAuthenticated, (req,res) => {
    const main = require('../Diary/main');
    const ID = req.session.passport.user.usersID;
    const username = req.session.passport.user.usersUserName;
    main(mysqlConnection,ID,username,res);
});

router.get('/signUp',checkNotAuthenticated,(req,res) => {
    res.render('signUp.ejs',{error:false})
});

router.post('/signUp', (req,res)=>{
    createNewAccount(mysqlConnection,req.body.name,req.body.email,req.body.username,req.body.password,
    (err) => {
        if(err!==null) {
            console.log(err)
            res.render('signUp.ejs',{error:err.message})
        }
    });
});

router.get('/logIn', checkNotAuthenticated,(req,res) => {
    res.render('logIn.ejs');   
});

router.post('/logIn',checkNotAuthenticated,passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/logIn',
    failureFlash: true
}));

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/logIn')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/logIn')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/homepage')
    }
    next()
}

module.exports =  router;