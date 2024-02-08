const bcrypt=require("bcryptjs");
const validator=require("validator");
const database=require("../db.js");
const jwt=require('jsonwebtoken')
const sendgrid=require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRIDKEYAPI)

function town(town){
let towndata=town.split("-");
return towndata;
}

let Admin=function(data){
  this.data=data,
  this.errors=[]
}
let color=[]
let letters=[0,1,2,3,4,5,6,7,8,9]
color[0]=Math.floor(Math.random()*letters.length)
color[1]=Math.floor(Math.random()*letters.length)
color[2]=Math.floor(Math.random()*letters.length)
color[3]=Math.floor(Math.random()*letters.length)
color[4]=Math.floor(Math.random()*letters.length)
color[5]=Math.floor(Math.random()*letters.length)
let flagColor="#"+letters[color[0]]+letters[color[1]]+letters[color[2]]+letters[color[3]]+letters[color[4]]+letters[color[5]]

// clean inputs from user and remove any white spaces
Admin.prototype.clean=function(){
   if(typeof(this.data.username) !="string"){this.data.username=""}
   if(typeof(this.data.password) !="string"){this.data.password=""}
   if(typeof(this.data.email) !="string"){this.data.email=""}

   //get rid of bogus
   this.data={
   username:this.data.username.charAt(0).toUpperCase() + this.data.username.slice(1),
   password:this.data.password,
   email:this.data.email.trim().toLowerCase(),
   //last_morale:new Date().getTime()
   }
}
//check user inputs and sure it's valid in terms of min&max characters and email valid
Admin.prototype.validate=function(){
    return new Promise(async(resolve,reject)=>{
 if(this.data.username==""){this.errors.push("You Need To Enter Username")}
   if(this.data.username!="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Username should contain Numbers& Alpha only")}
   if(this.data.password==""){this.errors.push("You Need To Set Password")}
    if(!validator.isEmail(this.data.email)){this.errors.push("Please insert Correct Email")}
    if(this.data.username.length<4 || this.data.username.length>12){this.errors.push("Username should be between 4 to 12 characters")}
    if(this.data.password.length<6 || this.data.password.length>30){this.errors.push("Password should be between 6 to 30 characters")} 
resolve()
    })
}
////////////////////////////////////////////////////////////////////
function Security(owner){
  return new Promise((resolve,reject)=>{
let stamp=new Date().getTime()
let color=[]
let letters=[0,1,2,3,4,5,6,7,8,9,"@","-","_","*","+","/","%","!","#","$",".","?","<",">","&","a","b","c","d","e","f","g",
  "h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G",
  "H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
color[0]=Math.floor(Math.random()*letters.length)
color[1]=Math.floor(Math.random()*letters.length)
color[2]=Math.floor(Math.random()*letters.length)
color[3]=Math.floor(Math.random()*letters.length)
color[4]=Math.floor(Math.random()*letters.length)
color[5]=Math.floor(Math.random()*letters.length)
color[6]=Math.floor(Math.random()*letters.length)
color[7]=Math.floor(Math.random()*letters.length)
color[8]=Math.floor(Math.random()*letters.length)
color[9]=Math.floor(Math.random()*letters.length)
color[10]=Math.floor(Math.random()*letters.length)
let tokenHash=letters[color[0]]+letters[color[1]]+letters[color[2]]+letters[color[3]]+letters[color[4]]+letters[color[5]]
+stamp+letters[color[6]]+letters[color[7]]+letters[color[8]]+letters[color[9]]+letters[color[10]]

                  let prepareHash=bcrypt.genSaltSync(10)
        hash=bcrypt.hashSync(tokenHash,prepareHash)
        let token=jwt.sign({username:owner},process.env.JWTSECRET,{expiresIn:'1d'})

           var sql2 = "INSERT INTO session Set ?";
newSession={
owner:owner,
token:token,
keyGate:tokenHash,
keyId:hash,
start:stamp,
expire:(Number(stamp)+Number(86400000))
}
    var inquiry="SELECT * FROM session WHERE owner ='"+owner+"'";
    database.query(inquiry, (err, result)=> {   //start of inquiry
      if(result.length>0){
let deleteOrder="Delete FROM session WHERE owner ='"+owner+"'";
  database.query(deleteOrder, (errdeleteOrder, resultdeleteOrder)=> {  //start of delete old record order
database.query(sql2,newSession ,(err2, result2)=>{    //start insert session record
  resolve(hash)
}) //end of insert session record
})   //end of delete old record order
      }else{
database.query(sql2,newSession ,(err2, result2)=>{    //start insert session record
  resolve(hash)
}) //end of insert session record
}
}) //end of inquiry
})  //end of promise
}  //end of function
//function process and insert new registration in database


//Login
Admin.prototype.verify=function(){
  return new Promise((resolve,reject)=>{
    

    var sql="SELECT * FROM session WHERE keyId ='"+this.data.token+"'";
    database.query(sql, (err, result)=> {
     if (err) throw err;
     if(result.length>0 && bcrypt.compareSync(result[0].keyGate,this.data.token)) {
      try{
let apiUser=jwt.verify(result[0].token,process.env.JWTSECRET)
resolve({status:true,username:result[0].owner})
}catch{
resolve({status:false})
}


     }

})
})
}


Admin.prototype.login=function(){
  return new Promise(async (resolve,reject)=>{
    this.clean();
    var sql="SELECT * FROM admin WHERE username ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
     if (err) throw err;
     if(result.length>0 && bcrypt.compareSync(this.data.password,result[0].password)) {
         var sql2="SELECT * FROM cwplayers";
    database.query(sql2,async (err2, result2)=> {
await Security(result[0].username).then((result)=>{result2[0].token=result
resolve(result2[0])
}).catch()


})
     }
     else  {reject("Please sure you entered info Correct")}
    });
  })
}

//Grab Data
Admin.prototype.grabData=function(){
  return new Promise(async (resolve,reject)=>{
         var sql2="SELECT * FROM cwplayers";
    database.query(sql2, (err2, result2)=> {


     var mailnumbers="SELECT * FROM cwmails";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> {    
     var reportnumbers="SELECT * FROM cwreports";
     database.query(reportnumbers, (errR, resultR)=> {
      var Lands="SELECT * FROM cwworld WHERE owner !=''";
     database.query(Lands, (errLands, resultLands)=> {
     result2[0].mNo=resultM.length
     result2[0].rNo=resultR.length
     result2[0].lands=resultLands.length
     result2[0].mails=resultM
     result2[0].reports=resultR
     result2[0].players=result2

      resolve(result2[0])
      }) //end of check player lands
     }) //end of get reports numbers
     }) //end of get mails numbers





})   //end of sql2
     
    
    
  })  //end of promise
}








module.exports=Admin