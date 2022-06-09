"use-strict";
const createNewDiary = require('../crudOperations/createNewDiary');
const storeEditedDiaryDetails = require('../crudOperations/editExistingDiary');
const readDiary = require('../crudOperations/readExisitingDiary');
const deleteDiary = require('../crudOperations/deleteExistingDiary');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
require('dotenv').config();
const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth:true
});

router.get('/homepage/createDiary',checkAuthenticated,(req,res)=>{
    res.render('newDiary.ejs',{userDetails:''});
});

router.post('/insertNewDiaryData',(req,res)=>{
    const ID = req.session.passport.user.usersID;
    const username = req.session.passport.user.usersUserName;
    const date = req.body.date;
    const title = req.body.title;
    const data = req.body.data;
    createNewDiary(mysqlConnection,ID,username,date,title,data,res);
});

router.post('/insertEditedDiaryData/:ID&:DN',(req,res)=>{
    const ID = req.params.ID;
    const DN = req.params.DN;
    const title = req.body.title;
    const data = req.body.data;
    storeEditedDiaryDetails(mysqlConnection,ID,DN,title,data,res);
});


router.post('/homepage/delete/:ID&:DN',(req,res)=>{
    deleteDiary(mysqlConnection,req.params.ID,req.params.DN,res)
});

router.get('/homepage/read/:ID&:DN',checkAuthenticated,(req,res)=>{
    readDiary(mysqlConnection,req.params.ID,req.params.DN,res)
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/logIn')
}


module.exports =  router;