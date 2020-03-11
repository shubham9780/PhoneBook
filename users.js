
var fs=require("fs");
var express=require("express");
var app=express();
app.use(express.json());
app.use(express.urlencoded({isextended:false}));
app.use(express.static("public"));

app.use(function(req,res,next)
{
  console.log("m1 fired");
  next();
});
app.get("/add",function(req,res)
{
	let data=req.query;
	console.log(data);
    res.send("get");
});
app.post("/add",function(req,res)
{
	console.log("chl geya");
    var name = req.body.textname; 
    var email =req.body.textemail; 
    var phone = req.body.textphone; 
    var address =req.body.textaddress; 

    var data = { 
        "name": name, 
        "email":email, 
        "password":phone, 
        "phone":address 
    } 
    var bodydata=req.body;
    fs.readFile("file.txt",(err,fdata)=>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            filedata=JSON.parse(fdata);
            filedata.push(bodydata);
    fs.writeFile("file.txt",JSON.stringify(data),(err,data)=>
    {
        if(err)
        {
            console.log(err);
        }
    });
    console.log(data);


}
});
});

app.listen(4000,function(error)
{
  console.log("start at 4000");
});