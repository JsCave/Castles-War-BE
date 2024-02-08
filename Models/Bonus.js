const database=require("../db");
//const ObjectID = require('mongodb').ObjectID

let Bonus=function(data){
this.data=data
}

function town(town){
let towndata=town.split("-");
return towndata;
}


Bonus.prototype.accept=function(){   //start of function
return new Promise(async(resolve,reject)=>{   //start of promise
var sqlworld="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(sqlworld, (errworld, resultworld)=> {   //start of sqlworld
if(resultworld.length>0){
var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(sql, (err, result)=> {
if (err) throw err;
var getMail="SELECT * FROM cwmails WHERE id ='"+this.data.mailId+"'";
database.query(getMail, async (errgetMail, resultgetMail)=> {  //start of get Mail


if(resultgetMail[0].action=="No"){       //if still no action taken
let currentUnits=town(result[0].units)
let bonuses=town(resultgetMail[0].bonus)
let name
if(bonuses[0]>0){name="Balance"}
if(bonuses[1]>0){name="Swordmen Troops"}
if(bonuses[2]>0){name="Spearmen Troops"}
if(bonuses[3]>0){name="Axemen Troops"}
if(bonuses[4]>0){name="Archers Troops"}
if(bonuses[5]>0){name="Knights Troops"}
if(bonuses[6]>0){name="Elephants Troops"}
if(bonuses[7]>0){name="Bribe Balance"}
let No=bonuses.find((Element)=>Element>0)
const unitsUpdated=(Number(bonuses[1])+Number(currentUnits[0]))+"-"+(Number(bonuses[2])+Number(currentUnits[1]))+"-"+(Number(bonuses[3])+Number(currentUnits[2]))+"-"+(Number(bonuses[4])+Number(currentUnits[3]))+"-"+(Number(bonuses[5])+Number(currentUnits[4]))+"-"+(Number(bonuses[6])+Number(currentUnits[5]))
let newPrestige=Math.ceil(
((bonuses[1])*0.01)+
((bonuses[2])*0.01)+
((bonuses[3])*0.01)+
((bonuses[4])*0.02)+
((bonuses[5])*0.03)+
((bonuses[6])*0.04)
  )+result[0].prestige
let newgold=result[0].gold+Number(bonuses[0])
let newbribe=result[0].bribe+Number(bonuses[7])
var sqlupdate = "UPDATE cwplayers SET units = '"+unitsUpdated+"',prestige='"+newPrestige+"',gold='"+newgold+"',bribe='"+newbribe+"' WHERE owner ='"+this.data.username+"'";

database.query(sqlupdate, async(err3, result3)=> { //start of update
if (err3) throw err3;
var updateMail= "UPDATE cwmails SET action = 'Yes' WHERE id ='"+resultgetMail[0].id+"'";
await database.query(updateMail, (errupdateMail, resultupdateMail)=> { //start of update mail
resolve("There is "+No+" "+ resultgetMail[0].name +" Added To your "+name)
})  //end of update mail
})
}else{ //if action already taken
resolve("You Already accepted Before")
}
})
})
}else{reject("You Lost Your Lands")}
})
})
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
Bonus.prototype.vote=function(){   //start of function
return new Promise(async(resolve,reject)=>{   //start of promise
var sqlworld="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(sqlworld, (errworld, resultworld)=> {   //start of sqlworld
if(resultworld.length>0){
var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(sql, async(err, result)=> {
if (err) throw err;
let votes=town(result[0].votes)
let currentTime=new Date().getTime()
if(votes[0]<=currentTime && votes[1]<=currentTime){
var sqlBonus="SELECT * FROM votes ORDER BY RAND() LIMIT 1";
await database.query(sqlBonus, async(errBonus, resultBonus)=> {
if (errBonus) throw errBonus;
var Details={
sendTo:this.data.username,
sendFrom:resultBonus[0].author,
Date:new Date().getTime(),
Subject:resultBonus[0].subject,
pic:resultBonus[0].pic,
control:'AI',
type:'vote',
name:resultBonus[0].name
    }

let randAmount
let buildings=town(result[0].buildings)
if(result[0].prestige<100){
randAmount=Math.floor(Math.random()*(4-1+1))+1;
}else{
randAmount=Math.floor(Math.random()*(10-5+1))+5;
}
if(resultBonus[0].bonus==0){
if(buildings[0]>0){
randAmount=1000+Math.floor((buildings[0]*randAmount)*50)
}else{randAmount=1000+Math.floor((1*randAmount)*50) }
Details.bonus=randAmount+"-0-0-0-0-0-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==1){
if(buildings[1]>0){
randAmount=Math.floor((buildings[1]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }
Details.bonus="0-"+randAmount+"-0-0-0-0-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==2){
if(buildings[1]>0){
randAmount=Math.floor((buildings[1]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }
Details.bonus="0-0-"+randAmount+"-0-0-0-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==3){
if(buildings[1]>0){
randAmount=Math.floor((buildings[1]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }

Details.bonus="0-0-0-"+randAmount+"-0-0-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==4){
if(buildings[2]>0){
randAmount=Math.floor((buildings[2]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }

Details.bonus="0-0-0-0-"+randAmount+"-0-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==5){
if(buildings[3]>0){
randAmount=Math.floor((buildings[3]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }

Details.bonus="0-0-0-0-0-"+randAmount+"-0-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==6){
if(buildings[4]>0){
randAmount=Math.floor((buildings[4]*randAmount)*1)
}else{randAmount=Math.floor((1*randAmount)*1) }

Details.bonus="0-0-0-0-0-0-"+randAmount+"-0"
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
if(resultBonus[0].bonus==7){
randAmount=Math.floor(Math.random()*(100-20+1))+20;
Details.bonus="0-0-0-0-0-0-0-"+randAmount
Details.Message=resultBonus[0].message+" "+randAmount+" "+resultBonus[0].name
}
var bonusMail = "INSERT INTO cwmails Set ?";
           await database.query(bonusMail,Details ,(errb, resultb)=> {
            if (errb) throw errb;
            let votes=town(result[0].votes)
            let newVotes
if(this.data.num==0){newVotes=Details.Date+"-"+votes[1]}
if(this.data.num==1){newVotes=votes[0]+"-"+Details.Date}
var sqlupdate = "UPDATE cwplayers SET votes = '"+newVotes+"' WHERE owner ='"+this.data.username+"'";
database.query(sqlupdate, async(err3, result3)=> { //start of update
if (err3) throw err3;
let votesF=town(newVotes)
resolve(votesF)
})

           })



})
}else{reject('You Already Voted Before')}
}) //end of player query
}else{reject("You Lost Your Lands")}
})
})
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bonus.prototype.collect=function(){   //start of function
return new Promise(async(resolve,reject)=>{   //start of promise
var sqlworld="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(sqlworld, (errworld, resultworld)=> {   //start of sqlworld
if(resultworld.length>0){
var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(sql, (err, result)=> {
if (err) throw err;
var getMail="SELECT * FROM cwmails WHERE id ='"+this.data.mailId+"'";
database.query(getMail, async (errgetMail, resultgetMail)=> {  //start of get Mail


if(resultgetMail[0].action=="No"){       //if still no action taken
let currentUnits=town(result[0].units)
let bonuses=town(resultgetMail[0].bonus)
let name
if(bonuses[0]>0){name="Balance"}
if(bonuses[1]>0){name="Swordmen"}
if(bonuses[2]>0){name="Spearmen"}
if(bonuses[3]>0){name="Axemen"}
if(bonuses[4]>0){name="Archers"}
if(bonuses[5]>0){name="Knights"}
if(bonuses[6]>0){name="Elephants"}
if(bonuses[7]>0){name="Bribes"}

let No=bonuses.find((Element)=>Element>0)
const unitsUpdated=(Number(bonuses[1])+Number(currentUnits[0]))+"-"+(Number(bonuses[2])+Number(currentUnits[1]))+"-"+(Number(bonuses[3])+Number(currentUnits[2]))+"-"+(Number(bonuses[4])+Number(currentUnits[3]))+"-"+(Number(bonuses[5])+Number(currentUnits[4]))+"-"+(Number(bonuses[6])+Number(currentUnits[5]))
let newPrestige=Math.ceil(
((bonuses[1])*0.01)+
((bonuses[2])*0.01)+
((bonuses[3])*0.01)+
((bonuses[4])*0.02)+
((bonuses[5])*0.03)+
((bonuses[6])*0.04)
  )+result[0].prestige
var sqlupdate = "UPDATE cwplayers SET units = '"+unitsUpdated+"',prestige='"+newPrestige+"' WHERE owner ='"+this.data.username+"'";

database.query(sqlupdate, async(err3, result3)=> { //start of update
if (err3) throw err3;
var updateMail= "UPDATE cwmails SET action = 'Yes' WHERE id ='"+resultgetMail[0].id+"'";
await database.query(updateMail, (errupdateMail, resultupdateMail)=> { //start of update mail
resolve("There is "+No+" "+ resultgetMail[0].name +"Added To your "+name+" Troops")
})  //end of update mail
})
}else{ //if action already taken
resolve("You Already accepted Before")
}
})
})
}else{reject("You Lost Your Lands")}
})
})
}





module.exports=Bonus