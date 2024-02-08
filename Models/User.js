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

let User=function(data){
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
User.prototype.clean=function(){
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
User.prototype.validate=function(){
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
User.prototype.register=function(){    //end of function
    return new Promise(async (resolve,reject)=>{   //start of promise
      this.clean();
      await this.validate();
      if(!this.errors.length){     //start if there is errors
      //query for check if username or email used before
      var sql="SELECT * FROM customers WHERE username ='"+this.data.username+"' OR email='"+this.data.email+"' ";
        database.query(sql, (err, result)=> {        //start of customer check
         if(result.length>0){          //if cst with same name or email exist
          if(result[0].username==this.data.username) this.errors.push("Username Already Taken")
          if(result[0].email==this.data.email) this.errors.push("Email Already Registered")
         reject(this.errors)
         }    //end if cst with same name or email exist
         else{    //if name and email not taken
          var sqlaicheck="SELECT * FROM factions WHERE owner ='"+this.data.username+"'";
          database.query(sql, (erraicheck, resultaicheck)=> {      //check if name taken by AI query
            if(resultaicheck.length>0){     //start if name taken by AI
                  if(result[0].username==this.data.username) this.errors.push("Username Already Taken")
                    reject(this.errors)
            }   //end if name taken by AI
            else{   //start if name not taken by AI

              var sqlworldchoose="SELECT * FROM cwworld WHERE owner='' ORDER BY RAND() LIMIT 1";
        database.query(sqlworldchoose, (errworldchoose, resultworldchoose)=> {  //start select empty place at map for new player
var updateWorld= "UPDATE cwworld SET owner = '"+this.data.username+"' ,type='1' ,control='HUMAN' WHERE id ='"+resultworldchoose[0].id+"'";
database.query(updateWorld, (errupdateWorld, resultupdateWorld)=> { //start of update world
          
                  let salt=bcrypt.genSaltSync(10)
        this.data.password=bcrypt.hashSync(this.data.password,salt)
        newowner=this.data.username
        var sql = "INSERT INTO customers Set ?";
           database.query(sql,this.data ,(err, result)=>{   //start insert customer record
           if (err) throw err;
           var sql2 = "INSERT INTO cwplayers Set ?";
newPlayer={
owner:newowner,
last_morale:new Date().getTime(),
x:resultworldchoose[0].x,
y:resultworldchoose[0].y,
flag:flagColor
}
database.query(sql2,newPlayer ,(err2, result2)=>{    //start insert player record
if (err2) throw err2;
let finalResult=[[]]
Security(newPlayer.owner).then((resultSecurity)=>{
  finalResult[0].token=resultSecurity
  finalResult[0].username=newPlayer.owner
resolve(finalResult[0])
}).catch()

})    //end insert player record
           });   //end insert customer record


}) //end of update world
})    //end select empty place at map for new player


            }    //end if name not taken by AI
          })   //end if name taken by AI query


        } //end of else
       }) //end of customer check
     }  //if no errors end

     else{   //else there is errors
     reject(this.errors)
     }   //end of else

   })    //end of promise
}  //end of function

//Login
User.prototype.verify=function(){
  return new Promise((resolve,reject)=>{
    
console.log("running")
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
var str = "1e";

User.prototype.login=function(){
  return new Promise(async (resolve,reject)=>{
    this.clean();
    var sql="SELECT * FROM customers WHERE username ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
     if (err) throw err;
     if(result.length>0 && bcrypt.compareSync(this.data.password,result[0].password)) {
         var sql2="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql2,async (err2, result2)=> {
      //update Morale
      let currentTime=new Date().getTime()
      let timePassed=Math.floor((((currentTime-result2[0].last_morale)/1000)/60)/12)
      if(timePassed>0){
       let newmoraleamount=timePassed+result2[0].morale
      if(newmoraleamount>100){newmoraleamount=100}
     var updateMorale = "UPDATE cwplayers SET morale = '"+newmoraleamount+"' , last_morale='"+currentTime+"' WHERE owner ='"+this.data.username+"'";
     await database.query(updateMorale, (errupdateMorale, resultupdateMorale)=> {
       result2[0].morale=newmoraleamount
     })

     } //end of update Morale
     

await Security(result2[0].owner).then((result)=>{result2[0].token=result
resolve(result2[0])
}).catch()

})
     }
     else  {reject("Please sure you entered info Correct")}
    });
  })
}

//Grab Data
User.prototype.grabData=function(){
  return new Promise(async (resolve,reject)=>{
         var sql2="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql2, (err2, result2)=> {
      //update Morale
      let currentTime=new Date().getTime()
      let timePassed=Math.floor((((currentTime-result2[0].last_morale)/1000)/60)/12)
      if(timePassed>0){
       let newmoraleamount=timePassed+result2[0].morale
      if(newmoraleamount>100){newmoraleamount=100}
     var updateMorale = "UPDATE cwplayers SET morale = '"+newmoraleamount+"' , last_morale='"+currentTime+"' WHERE owner ='"+this.data.username+"'";
     database.query(updateMorale, (errupdateMorale, resultupdateMorale)=> {
       result2[0].morale=newmoraleamount
     })

     } //end of update Morale

     var mailnumbers="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND Status='unread'";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> {    
     var reportnumbers="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"' AND Status='unread'";
     database.query(reportnumbers, (errR, resultR)=> {
      var Lands="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
     database.query(Lands, (errLands, resultLands)=> {
     result2[0].mNo=resultM.length
     result2[0].rNo=resultR.length
     result2[0].lands=resultLands.length

      result2[0].title="Welcome My Liege"
      result2[0].pic="pics/city.jpg"
      result2[0].subject="Your Empire Is Waiting For Your Orders"

      resolve(result2[0])
      }) //end of check player lands
     }) //end of get reports numbers
     }) //end of get mails numbers





})   //end of sql2
     
    
    
  })  //end of promise
}
/*
//update Status


//get gold
*/
User.prototype.getGold=function(){
  return new Promise(async (resolve,reject)=>{
        var sqlworld="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(sqlworld, (errworld, resultworld)=> {   //start of sqlworld
      if(resultworld.length>0){
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql,async (err, result)=> {
     if (err) throw err;
     if(result.length>0) {   //check if player record exist
            //update Morale
      let currentTime=new Date().getTime()
      let timePassed=Math.floor((((currentTime-result[0].last_morale)/1000)/60)/12)
      console.log(timePassed)
      if(timePassed>0){
       let newmoraleamount=timePassed+result[0].morale
      if(newmoraleamount>100){newmoraleamount=100}

     var updateMorale = "UPDATE cwplayers SET morale = '"+newmoraleamount+"' , last_morale='"+currentTime+"' WHERE owner ='"+this.data.username+"'";
     await database.query(updateMorale, (errupdateMorale, resultupdateMorale)=> {
       result[0].morale=newmoraleamount
     })

     } //end of update Morale
      if(result[0].morale>0){   //if player have enough morale

          //****
           var sql2="SELECT * FROM cweconomy ORDER BY RAND() LIMIT 1";
          database.query(sql2, (err2, result2)=> {

        let rand=Math.floor(Math.random()*1000);
        let buildings=town(result[0].buildings)
        let units=town(result[0].units)
        let newmorale=result[0].morale-1
        let eventEffect=0;
        if(result2[0].Effect<=0){eventEffect=Math.floor(Math.random()*((buildings[0]*50)+rand));}
        let goldcollected=((buildings[0]*50)+rand)
        if(eventEffect>goldcollected){goldcollected=0}else{goldcollected=((buildings[0]*50)+rand)}

        let newgold=result[0].gold+goldcollected-eventEffect



var sqlupdate = "UPDATE cwplayers SET gold = '"+newgold+"',morale='"+newmorale+"' WHERE owner ='"+this.data.username+"'";

database.query(sqlupdate, (err3, result3)=> { //start of update
if (err3) throw err3;
      result2[0].title=result2[0].Subject
      result2[0].subject=result2[0].Event+(goldcollected-eventEffect)
      if(eventEffect<=0){result2[0].error="You collected "+goldcollected +" piece of gold"}else{
        result2[0].error="You collected "+goldcollected +" piece of gold but sadly event cost you -"+eventEffect
      }
      result2[0].newgold=newgold
      result2[0].newmorale=newmorale
      
resolve(result2[0])
      }) //end of update
          
          //****
    }) //end of select random event from economy

        //end if player morale>0
   //end check if there is already event or not
      }  //end if enough morale
else{    //if not enough morale
reject("you don't have enough morale")
     } //end if not enough morale
     }  //end of check if player exist
   })   //end of query for get player info
  }else{reject("You Lost Game Over")}
}) //end of sql world
  })   //end of promise
}   //end of function


//get Units

User.prototype.getUnits=function(){
    return new Promise(async (resolve,reject)=>{
    var sqlworld="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(sqlworld, (errworld, resultworld)=> {   //start of sqlworld
      if(resultworld.length>0){
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
     if (err) throw err;
     if(result.length>0) {   //check if player record exist
            //update Morale
      let currentTime=new Date().getTime()
      let timePassed=Math.floor((((currentTime-result[0].last_morale)/1000)/60)/12)
      if(timePassed>=12){
       let newmoraleamount=timePassed+result[0].morale
      if(newmoraleamount>100){newmoraleamount=100}
     var updateMorale = "UPDATE cwplayers SET morale = '"+newmoraleamount+"' , last_morale='"+currentTime+"' WHERE owner ='"+this.data.username+"'";
     database.query(updateMorale, (errupdateMorale, resultupdateMorale)=> {
       result[0].morale=newmoraleamount
     })

     } //end of update Morale
      if(result[0].morale>0){   //if player have enough morale
        var sql2="SELECT * FROM cwmilitary ORDER BY RAND() LIMIT 1";
          database.query(sql2, (err2, result2)=> {  //start of choose random military event

        var units=town(result[0].units)
        var buildings=town(result[0].buildings)
        let upunits={swordman:Number(units[0])+1+(1*Number(buildings[1])),spearman:Number(units[1])+(1*Number(buildings[1])),axeman:Number(units[2])+(1*Number(buildings[1])),archers:Number(units[3])+(1*Number(buildings[2])),knights:Number(units[4])+(1*Number(buildings[3])),elephants:Number(units[5])+(1*Number(buildings[4]))}
        let newmorale=result[0].morale-1
        let totalRecruited=(1+(3*buildings[1]))+(1*buildings[2])+(1*buildings[3])+(1*buildings[4])
        let finalUnits=upunits.swordman+"-"+upunits.spearman+"-"+upunits.axeman+"-"+upunits.archers+"-"+upunits.knights+"-"+upunits.elephants

let newPrestige=Math.ceil(
((1+(3*buildings[1]))*0.01)+
(((1*buildings[2]))*0.02)+
(((1*buildings[3]))*0.03)+
(((1*buildings[4]))*0.04)
  )+result[0].prestige


var sqlupdate = "UPDATE cwplayers SET units = '"+finalUnits+"',prestige='"+newPrestige+"',morale='"+newmorale+"' WHERE owner ='"+this.data.username+"'";

database.query(sqlupdate, async(err3, result3)=> { //start of update
if (err3) throw err3;
let bonus=Math.floor(Math.random()*(10-0+1))+0
if(bonus==3){  //start of bonus
var sqlBonus="SELECT * FROM bonuses ORDER BY RAND() LIMIT 1";
await database.query(sqlBonus, async(errBonus, resultBonus)=> {
if (errBonus) throw errBonus;
var Details={
sendTo:this.data.username,
sendFrom:resultBonus[0].author,
Date:new Date().getTime(),
Subject:resultBonus[0].subject,
pic:resultBonus[0].pic,
control:'AI',
type:'bonus',
name:resultBonus[0].name
    }

let randAmount
if(newPrestige<100){
randAmount=Math.floor(Math.random()*(200-100+1))+100;
}else{
randAmount=Math.floor(Math.random()*(newPrestige-100+1))+100;
}
bonusMessage=town(resultBonus[0].message)
if(resultBonus[0].bonus==1){
if(buildings[1]<1){randAmount=Math.floor(Math.random()*(100-25+1))+25;}else{randAmount=randAmount*buildings[1]}
Details.bonus="0-"+randAmount+"-0-0-0-0-0"
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
if(resultBonus[0].bonus==2){
if(buildings[1]<1){randAmount=Math.floor(Math.random()*(100-25+1))+25;}else{randAmount=randAmount*buildings[1]}
Details.bonus="0-0-"+randAmount+"-0-0-0-0"
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
if(resultBonus[0].bonus==3){
if(buildings[1]<1){randAmount=Math.floor(Math.random()*(100-25+1))+25;}else{randAmount=randAmount*buildings[1]}
Details.bonus="0-0-0-"+randAmount+"-0-0-0"
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
if(resultBonus[0].bonus==4){
if(buildings[2]<1){randAmount=Math.floor(Math.random()*(25-5+1))+25;}else{randAmount=randAmount*buildings[2]}
Details.bonus="0-0-0-0-"+randAmount+"-0-0"
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
if(resultBonus[0].bonus==5){
if(buildings[3]<1){randAmount=Math.floor(Math.random()*(15-5+1))+5;}else{randAmount=randAmount*buildings[3]}
Details.bonus="0-0-0-0-0-"+randAmount+"-0"
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
if(resultBonus[0].bonus==6){
if(buildings[4]<1){randAmount=Math.floor(Math.random()*(10-1+1))+1;}else{randAmount=randAmount*buildings[4]}
Details.bonus="0-0-0-0-0-0-"+randAmount
Details.Message=bonusMessage[0]+" "+randAmount+" "+resultBonus[0].name+", "+bonusMessage[1]
}
var bonusMail = "INSERT INTO cwmails Set ?";
           await database.query(bonusMail,Details ,(err, result)=> {
            if (err) throw err;
      var mailnumbers="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND Status='unread'";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> { 
      result2[0].title=result2[0].Subject
      result2[0].error="You Spent 1 Morale And You Recruited "+totalRecruited+" Soldier & Warrior At Your Empire"
      result2[0].newunits=finalUnits
      result2[0].newmorale=newmorale
      result2[0].prestige=newPrestige
      result2[0].mails=resultM.length
resolve(result2[0])
})
           })



})
}  //end of Bonus
else{
      result2[0].title=result2[0].Subject
      result2[0].error="You Spent 1 Morale And You Recruited "+totalRecruited+" Soldier & Warrior At Your Empire"
      result2[0].newunits=finalUnits
      result2[0].newmorale=newmorale
      result2[0].prestige=newPrestige
resolve(result2[0])
}
      }) //end of update



      }) //end of choose random event from Military
      }  //end if player have enough Morale

      else{
reject("you don't have enough morale")
      }
     }  //end if player record exist
   }) //end of get player info
  }else{reject("You Lost Your Lands")}
  }) //end of sql world
  }) //end of promise   
}  //end of function



User.prototype.Forget=function(){    //start of function
  return new Promise((resolve,reject)=>{     //start of promise
    if(this.data.email==""){reject({error:"please write your registred email"})}else{
    var inquiry="SELECT * FROM customers WHERE email ='"+this.data.email+"'";
    database.query(inquiry, (err, result)=> {   //start of inquiry
if(result.length>0){    //if we found customer
let stamp=new Date().getTime()
let color=[]
let letters=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g",
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
+letters[color[6]]+letters[color[7]]+letters[color[8]]+letters[color[9]]+letters[color[10]]


var sql2 = "INSERT INTO forget Set ?";
  let newRecord={
id:tokenHash,
email:this.data.email,
expire:Number(stamp)+7200000
  }

    var check="SELECT * FROM forget WHERE email ='"+this.data.email+"'";
    database.query(check, (errcheck, resultcheck)=> {   //start of check
      if(resultcheck.length>0){   //if there is previous request
let deleteOrder="Delete FROM forget WHERE email ='"+this.data.email+"'";
  database.query(deleteOrder, (errdeleteOrder, resultdeleteOrder)=> {  //start of delete old record order
database.query(sql2,newRecord ,(err2, result2)=>{    //start insert forget record
  sendgrid.send({
to:this.data.email,
from:"support@castleswar.com",
subject:"retrieve password",
text:"please copy & paste that link: castleswar.com/forget/"+tokenHash,
html:"<div style=border:'1px solid #000'; width:300px; height:300px; margin:0 auto; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#fff;><p>go to that link</p><a href=castleswar.com/forget/"+tokenHash+" style='background:#000;padding:10px;text-decoration:none;color:#fff;font-weight:bold;'>Go Now</a></div>"
  })
  resolve({error:"we sent to your email link for reset password,Check spam if nothing at inbox"})
}) //end of insert forget record
})   //end of delete old record order

      } //end if there is previous request
else{ //no previous password request
database.query(sql2,newRecord ,(err2, result2)=>{    //start insert forget record
  sendgrid.send({
to:this.data.email,
from:'support@castleswar.com',
subject:'retrieve password',
text:"please copy & paste that link: castleswar.com/forget/"+tokenHash,
html:"<div style=border:'1px solid #000'; width:300px; height:300px; margin:0 auto; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#fff;><p>go to that link</p><a href=castleswar.com/forget/"+tokenHash+" style='background:#000;padding:10px;text-decoration:none;color:#fff;font-weight:bold;'>Go Now</a></div>"
  })
  resolve({error:"we sent to your email link for reset password,Check spam if nothing at inbox"})
}) //end of insert forget record

}  //end of no previous request
}) //end of check
} //end if found customer
else{reject({error:"there is no user with that email"})} //end if no customer

})   //end of inquiry
} //end of else email not empty
})   //end of promise   
}  //end of function

User.prototype.Reset=function(){    //start of function
  return new Promise((resolve,reject)=>{     //start of promise
if(typeof(this.data.password) !="string"){this.data.password=""}
if(this.data.password.length<6 || this.data.password.length>30){reject({error:"Password should be between 6 to 30 characters"})}else{ //start of password length 
if(this.data.password==""){reject({error:"please write your password"})}else{     //if password empty
    var inquiry="SELECT * FROM forget WHERE id ='"+this.data.id+"'";
    database.query(inquiry, (err, result)=> {   //start of inquiry
if(result.length>0){   //if there is request
let stamp=new Date().getTime()
if(stamp>result[0].expire){ //if request expired
reject({error:"Expired Link,You Can Try To Apply New Password Reset Request"})
} //end if requestexpired
else{  //if request not expired
let prepareHash=bcrypt.genSaltSync(10)
hash=bcrypt.hashSync(this.data.password,prepareHash)
var inquirycst="SELECT * FROM customers WHERE email ='"+result[0].email+"'";
database.query(inquirycst, (errcst, resultcst)=> {   //start of inquiry cst
if(resultcst.length>0){ //if we found cst
  var updatecst = "UPDATE customers SET password= '"+hash+"' WHERE email ='"+result[0].email+"'";
database.query(updatecst, (errupdatecst, resultupdatecst)=> {   //start update cst
    if(errupdatecst) throw errupdatecst;
let deleteOrder="Delete FROM forget WHERE id ='"+this.data.id+"'";
  database.query(deleteOrder, (errdeleteOrder, resultdeleteOrder)=> {  //start of delete old record order
 resolve({error:"You changed your password successfully"})
  })  //end of delete record
  })   //end of update cst
}else{reject({error:"we can't process with your request"})}  //if we didn't find cst
}) //end of inquiry cst
}  //end if request not expired
}// end if there is request
else{ //if there is no request
reject({error:"Wrong Link, You Can Try To Apply New Password Reset Request"})
}   //end if there is no request
})
}  //end if password not empty
}  //end of else password length
})   //end of promise   
}  //end of function




User.prototype.Visitor=function(){
return new Promise((resolve,reject)=>{
var visitors="SELECT * FROM visitors WHERE id =1";
database.query(visitors, (errvisitors, resultvisitors)=> {   //start of inquiry cst
  let newVisitors=resultvisitors[0].visitors+1
  var update = "UPDATE visitors SET visitors= '"+newVisitors+"'";
database.query(update, (errupdate, resultupdate)=> {   //start update cst
resolve()
})
})
})
}

module.exports=User