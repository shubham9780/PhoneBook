var users=[];
var userid=1;

var tab=document.getElementById("tab");
var btn=document.getElementById("au");
var frm=document.getElementById("frm");
var divListUsers=document.getElementById("divListUsers");

var d=JSON.parse(localStorage.getItem("users"));
if(d)
{
 for(var i=0;i<d.length;i++)
 {
 
      var objProduct = new Object();
    
    objProduct.Id = productId;
    objProduct.Name = d[i].Name;
    objProduct.Email = d[i].Email;
    objProduct.Phone = d[i].Phone;
    objProduct.Address = d[i].Address;
    users.push(objProduct);
    addusertoDOM(objProduct);
    userid++;
 }
}
function adduser()
{
    console.log('okk');
    hide();
   var form=document.createElement("form");
form.setAttribute("action","/add","method","post");
//form.setAttribute("mexthod","post");
form.setAttribute("onSubmit","addusertoArray()");
	var textname=document.createElement("input");
	textname.setAttribute("type","text");
	textname.setAttribute("class","box2");
    textname.setAttribute("name","name");
    textname.setAttribute("id","name");
	textname.setAttribute("placeholder","name");
	textname.setAttribute("required","true");
	form.appendChild(textname);

 	blankline(form);
 	blankline(form);

 	var textemail=document.createElement("input");
     textemail.setAttribute("type","email");
     textemail.setAttribute("class","box2");
     textemail.setAttribute("name","email");
     textemail.setAttribute("id","email");
     textemail.setAttribute("placeholder","E-mail");
     textemail.setAttribute("required","true");
     form.appendChild(textemail);

	blankline(form);
 	blankline(form);

 	var textPhone=document.createElement("input");
     textPhone.setAttribute("type","number");
     textPhone.setAttribute("class","box2");
     textPhone.setAttribute("name","phone");
     textPhone.setAttribute("id","phone");
     textPhone.setAttribute("maxlength","10");
     textPhone.setAttribute("minlength","10");
     textPhone.setAttribute("placeholder","Phone number");
     textPhone.setAttribute("required","true");
     form.appendChild(textPhone);

	blankline(form);
 	blankline(form);

 	var textaddress=document.createElement("input");
     textaddress.setAttribute("type","text-area");
     textaddress.setAttribute("class","box2");
     textaddress.setAttribute("name","address");
     textaddress.setAttribute("id","address");
     textaddress.setAttribute("placeholder","Address");
     textaddress.setAttribute("required","true");
     form.appendChild(textaddress);

	blankline(form);
 	blankline(form);

 	var btn=document.createElement("button");
 	btn.setAttribute("type","submit");
 	btn.setAttribute("class","abc");
 	btn.innerHTML="Add User";

     form.appendChild(btn);
    frm.appendChild(form);
}

function addusertoArray()
{
    console.log('okk');
    var objuser = new Object();
    
    objuser.Id = productId;
    objuser.Name = document.getElementById("textname").value;

    objuser.Email = document.getElementById("textemail").value;

    objuser.Phone = document.getElementById("textPhone").value;

    objuser.Address = document.getElementById("textaddress").value;
  
    users.push(objProduct);
    flag3=0;
    addusertoDOM(objuser);
    userid++;
     var strArray =  JSON.stringify(users);
      addtoserver(users);
      localStorage.setItem("users",strArray);
}

function addusertoDOM(objProduct)
{   
    console.log('okk');
    var divProduct = document.createElement("div");
    divProduct.setAttribute("id", userid);
    console.log(productId);
    var lbluserName = document.createElement("label");
    lbluserName.innerHTML = objuser.Name;

    divProduct.appendChild(lbluserName);
    //insertBlankLine(divProduct);
  
    var lbluserEmail = document.createElement("label");
    lbluserEmail.innerHTML = objuser.Email;

    divProduct.appendChild(lbluserEmail);
//insertBlankLine(divProduct);

        var lbluserPhone = document.createElement("label");
    lbluserPhone.innerHTML = objuser.Phone;
    divProduct.appendChild(lbluserPhone);
    //insertBlankLine(divProduct);
   
            var lbluserAddress = document.createElement("label");
    lbluserAddress.innerHTML = objuser.Address;
 
    divProduct.appendChild(lbluserAddress);

    divListUsers.appendChild(divProduct);

}

function hide()
{
btn.setAttribute("style","visibility:hidden")
}
function unhide()
{
btn.setAttribute("style","visibility:visible");
}
function blankline(i)
{
	var j=document.createElement("br");
	i.appendChild(j);
}
function addtoserver(i)
{
    xhttp.open("POST","http://localhost:3000/add"); 
xhttp.setRequestHeader("Content-Type","application/json");
xhttp.send(JSON.stringify(i));
}