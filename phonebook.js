var express=require("express"); 
var bodyParser=require("body-parser"); 
var session = require('express-session');
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/PhoneBook'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  

var app=express() 
  
app.use(session({
    secret: 'abcd12345',
    resave: false,
    saveUninitialized: true
  }));
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('user').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('index.html'); 
}) 
var auth = (req,res,next)=>{
    if(req.session.isLogin){
        next();
    }else{
        res.redirect('/');
    }
}

app.post('/login', function(req, res){
    email = req.body.email;
    password = req.body.password;
        var query = {email: email, password: password}
        db.collection('user').findOne(query, function(err, user){
            if(err) throw new Error(err);
            if(!user) 
              {
                  console.log('Not found');
                  res.redirect("/");
              }
            else 
              {
                console.log('Found!');
                req.session.isLogin = 'ture';
                req.session.user=user;
                res.redirect('/home');
              }
        });
        
    });
// app.post("/add",function(req,res)
// {
//     console.log("chl geya");
//     var name = req.body.textname; 
//     var email =req.body.textemail; 
//     var phone = req.body.textphone; 
//     var address =req.body.textaddress; 

//     var data = { 
//         "name": name, 
//         "email":email, 
//         "password":phone, 
//         "phone":address 
//     } 
//     var bodydata=req.body;
//     fs.readFile("file.txt",(err,fdata)=>
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             filedata=JSON.parse(fdata);
//             filedata.push(bodydata);
//     fs.writeFile("file.txt",JSON.stringify(data),(err,data)=>
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//     });
//     console.log(data);

// }
// });
// });

app.get('/home',auth,(req,res)=>{
            res.redirect("phonebook.html");
    })
app.get('/',function(req,res){ 
return res.redirect('index.html'); 
}).listen(3000)