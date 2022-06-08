const diary = require('../Diary/diary');
const crudRouterPath = require('../crudOperations/crudRouterPath');
const express = require('express');
const app = express();


app.use(express.static('./public'));
app.use('/',diary);
app.use('/',crudRouterPath)
app.set('view-engine','ejs');

app.listen(5000,()=>{console.log('works 5000')});

