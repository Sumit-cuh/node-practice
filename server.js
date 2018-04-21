const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;
var app = express();

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
//middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log  = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{}) 
    next();
});

    app.use((req,res,next)=>{
        res.render('maintenance.hbs');
    });
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));
app.get('/about',function(req,res){
    res.render('about.hbs',{
        pageTitle:'About Page'
        
    });
});

app.get('/',function(req,res){
    res.render('home.hbs',{
        pageTitle:'HomePage',
        msg:'Welcome',        
    });
});

app.get('/bad',function(req,res){
    res.send('Unable to handle request...');
});
app.listen(port);
console.log(`server is running on ${port}`);