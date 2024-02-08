const bcrypt=require("bcryptjs");
const validator=require("validator");
const database=require("../db.js");
const jwt=require('jsonwebtoken')


function town(town){
let towndata=town.split("-");
return towndata;
}

let Providers=function(data){
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


////////////////////////////////////////////////security function///////////////////////
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




//////////////////////////////////////////////////////////////////////////////////////////











Providers.prototype.login=function(){  //start of function
return new Promise((resolve,reject)=>{   //start of promise
  //function process and insert new registration in database
//select from user where id=id
//if  id create session and send hash token
//if id not exist
//register new one then return hash

var sql="SELECT * FROM customers WHERE providerId ='"+this.data.id+"'";
database.query(sql, (err, result)=> {        //start of customer check
  if(result.length>0){   //if found customer
         var sql2="SELECT * FROM cwplayers WHERE owner ='"+result[0].username+"'";
    database.query(sql2,async (err2, result2)=> {  //get player data
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
})  //end of get player data
  }   //end if found customer
else{  //in case not found customer
let titles=["City","Empire","Kingdom","King","Lord","Duke","Baron","Sultan","Caliphate"]
let randTitle=Math.floor(Math.random()*titles.length)
let finalTitle=titles[randTitle]
let numbers=[0,1,2,3,4,5,6,7,8,9]
let randNumber=[]
randNumber[0]=Math.floor(Math.random()*numbers.length)
randNumber[1]=Math.floor(Math.random()*numbers.length)
randNumber[2]=Math.floor(Math.random()*numbers.length)
let FinalDecision=finalTitle+randNumber[0]+randNumber[1]+randNumber[2]

var sqlworldchoose="SELECT * FROM cwworld WHERE owner='' ORDER BY RAND() LIMIT 1";
database.query(sqlworldchoose, (errworldchoose, resultworldchoose)=> {  //start select empty place at map for new player
var updateWorld= "UPDATE cwworld SET owner = '"+FinalDecision+"' ,type='1' ,control='Human' WHERE id ='"+resultworldchoose[0].id+"'";
database.query(updateWorld, (errupdateWorld, resultupdateWorld)=> { //start of update world
  let newCustomer={
username:FinalDecision,
providerId:this.data.id,
email:this.data.email
}
        var sql = "INSERT INTO customers Set ?";
           database.query(sql,newCustomer,(err, result)=>{   //start insert customer record
           if (err) throw err;

           var sql2 = "INSERT INTO cwplayers Set ?";
let newPlayer={
owner:FinalDecision,
last_morale:new Date().getTime(),
x:resultworldchoose[0].x,
y:resultworldchoose[0].y,
flag:flagColor,
provider:1
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
})  //end insert customer record
}) //end of update world
}) //end select empty place at map for new player
}  //end in case not found customer

})   //end of customer check
})   //end of promise
}   //end of function

module.exports=Providers



















