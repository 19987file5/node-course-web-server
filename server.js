const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//var hb = hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine' , 'hbs');

hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear()
});

app.use((req , res , next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log +'\n' , (err)=>{
    if (err){
      console.log('unable to append file');
    }
  });
  next();
});

app.use((req ,res , next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt' , (text)=>{
  return text.toUpperCase();
});

app.get('/' , (req , res)=>{
  //res.send('<h1>hello express</h1>');

res.render('home.hbs', {
  welcome: 'welcome to our website',
  pageTitle: 'about page',
  currentYear: new Date().getFullYear()
});
  // res.send({
  //   status: 'OK' ,
  //   name3: 'ghg',
  //   name: 'mesh',
  //   likes: [
  //     'coding',
  //     'reading'
  //   ]
  // })

});



app.get('/about', (req , res)=>{
  res.render('about.hbs' , {
    pageTitle: 'about page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/test', (req , res)=>{
  res.send('<h1>test page</h1>');
});
app.get('/bad', (req ,res)=>{
  res.send({
    errorMessage: 'unable to handle request'
  });
});
app.listen(3100 , ()=>{
  console.log('server is up on port 3100');
});
