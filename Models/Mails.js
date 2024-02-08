const database=require("../db");
//const ObjectID = require('mongodb').ObjectID

let Mails=function(data){
this.data=data
}

function town(town){
let towndata=town.split("-");
return towndata;
}

Mails.prototype.displayMails=function(){
return new Promise((resolve,reject)=>{
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
if(err) throw err;
if(result.length>0){
    var sql2="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"'";
    database.query(sql2, (err2, result2)=> {
if(err2) throw err2;
resolve(result2)
})
}
else{
reject("404 error , please visit us later")
}
		})
})
}
//////////////////////////////////////////////////////////////////
    Mails.prototype.deleteS=function(){
return new Promise((resolve,reject)=>{
    var sql=[]
    let selectedM=this.data.selectedM
    if(selectedM.length>0){
for(let i=0;i<selectedM.length;i++){
sql[i]="Delete FROM cwmails WHERE sendTo ='"+this.data.username+"' AND type!='gameOver' AND id='"+selectedM[i]+"'";
database.query(sql[i], (err, result)=> {if(err) throw err;})
}
resolve("Selected Messages Deleted")
}
else{resolve("Select First Messages you want to delete")}
})
    }
////////////////////////////////////////////////////////////////
    Mails.prototype.delete=function(){
return new Promise(async(resolve,reject)=>{
    let selectedM=this.data.selectedM

sql="Delete FROM cwmails WHERE sendTo ='"+this.data.username+"' AND type!='gameOver' AND id='"+selectedM+"'";
await database.query(sql, (err, result)=> {
if(err) throw err;
resolve("Selected Message Deleted")
})


})
    }
////////////////////////////////////////////////////////////////
    Mails.prototype.deleteAll=function(){
return new Promise(async(resolve,reject)=>{
sql="Delete FROM cwmails WHERE type!='gameOver' AND sendTo ='"+this.data.username+"'";
await database.query(sql, (err, result)=> {
if(err) throw err;
resolve("All Messages Deleted")
})


})
    }

//////////////////////////////////////////////////////
Mails.prototype.displayMail=function(){
return new Promise((resolve,reject)=>{
const id=this.data.id
var sql="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND id='"+id+"'";
database.query(sql, async (err, result)=> {
if(err) throw err;
if(result){
var sql2 = "UPDATE cwmails SET status = 'read' WHERE id ='"+id+"'";
database.query(sql2, async (err2, result2)=> {
if(err2) throw err2;
resolve(result) 
})
}
else{
reject("Message not found")
}
        })
})
}

//////////////////////////////////////////////////////

/*
/////////////////////////////////////////////////////start OF HELP///////////////////////////////////////
Mails.prototype.Help=function(){
return new Promise((resolve,reject)=>{    //start of promise


    Data={
sendTo:this.data.target,
sendFrom:this.data.username,
Date:new Date().getTime(),
Subject:0,
type:this.data.type,
}


Data.Subject="Please Help Me"

if(this.data.control=="HUMAN"){
var sql = "INSERT INTO cwmails Set ?";
           database.query(sql,Data ,(err, result)=>{
if(err) throw err;
resolve("Help Request Sent") 
})
}       //end if player is human

else{   //start of else player is AI
let rand=Math.floor(Math.random()*1)
if(rand>0){     //start if rand >0
var checkAi="SELECT * FROM cwai WHERE owner ='"+Data.sendTo+"'";
database.query(checkAi, async (errcheckAi, resultcheckAi)=> {  //start of check if owner at AI table
let resourceType=Math.floor(Math.random()*1)
let units=town(resultcheckAi[0].units)

    Allowgold=Math.floor(Math.random()*(Number(resultcheckAi[0].gold)*0.2))
    Allowsword=Math.floor(Math.random()*(Number(units[0])*0.2))
    Allowspear=Math.floor(Math.random()*(Number(units[1])*0.2))
    Allowaxe=Math.floor(Math.random()*(Number(units[2])*0.2))
    Allowarcher+=Math.floor(Math.random()*(Number(units[3])*0.2))
    Allowknight=Math.floor(Math.random()*(Number(units[4])*0.2))
    Allowelephants=Math.floor(Math.random()*(Number(units[5])*0.2))
    totalUnits=Allowgold+Allowsword+Allowspear+Allowaxe+Allowarcher+Allowknight+Allowelephants

        var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:Allowgold+"-"+Allowsword+"-"+Allowspear+"-"+Allowaxe+"-"+Allowarcher+"-"+Allowknight+"-"+Allowelephants
    }

    if(resourceType==0){   //if resource type =gold 
    if(Allowgold<=0){      //if no gold
    Details.Subject="your help request rejected"
    Details.Message="You Not Deserve our help"
    Details.type="help"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("your Help request sent") 
})

    }   //end if no gold
    else{    //if there is gold
    Details.Subject="your help request accepted"
    Details.Message="You Get Financial Support from "+this.data.target
    Details.type="help"
    Details.action="gold"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=> {
if(err) throw err;
resolve("your Help request sent") 
})

    }  //end if there is gold
}   //end if resource type =gold 
else{  //if resource type =troops

    if(totalUnits<=0){      //if no troops
    Details.Subject="your help request rejected"
    Details.Message="You Not Deserve our help"
    Details.type="help"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=> {
if(err) throw err;
resolve("your Help request sent") 
})

    }   //end if no troops
    else{    //if there is troops
    Details.Subject="your help request accepted"
    Details.Message="You Get Military Support from "+this.data.target
    Details.type="help"
    Details.action="troops"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=>{
if(err) throw err;
resolve("your Help request sent") 
})

    }  //end if there is troops


} //end if resource type=troops
}) //end of check if owner at AI table
}   //end if rand >0
else{     //start if rand <0 mean your request rejected
            var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:0-0-0-0-0-0-0
    }
    Details.Subject="your help request rejected"
    Details.Message="You Not Deserve our help"
    Details.type="help"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("your Help request sent") 
})
}    //end if rand <0 mean your request rejected
}         //end if player is AI
})   //end of promise
}
/////////////////////////////////////////////////////END OF HELP///////////////////////////////////////
/////////////////////////////////////////////////////start OF TRADE///////////////////////////////////////
Mails.prototype.Trade=function(){
return new Promise((resolve,reject)=>{    //start of promise


    Data={
sendTo:this.data.target,
sendFrom:this.data.username,
Date:new Date().getTime(),
Subject:0,
type:this.data.type,
}


Data.Subject="Trade Agreement"

if(this.data.control=="HUMAN"){
var sql = "INSERT INTO cwmails Set ?";
           database.query(sql,Data ,(err, result)=>{
if(err) throw err;
resolve("Trade Request Sent") 
})
}       //end if player is human

else{   //start of else player is AI
let rand=Math.floor(Math.random()*1)
if(rand>0){     //start if rand >0
var checkAi="SELECT * FROM cwai WHERE owner ='"+Data.sendTo+"'";
database.query(checkAi, async (errcheckAi, resultcheckAi)=> {  //start of check if owner at AI table
let resourceType=Math.floor(Math.random()*1)
let units=town(resultcheckAi[0].units)

    Allowgold=Math.floor(Math.random()*(Number(resultcheckAi[0].gold)*0.2))
    Allowsword=Math.floor(Math.random()*(Number(units[0])*0.2))
    Allowspear=Math.floor(Math.random()*(Number(units[1])*0.2))
    Allowaxe=Math.floor(Math.random()*(Number(units[2])*0.2))
    Allowarcher+=Math.floor(Math.random()*(Number(units[3])*0.2))
    Allowknight=Math.floor(Math.random()*(Number(units[4])*0.2))
    Allowelephants=Math.floor(Math.random()*(Number(units[5])*0.2))
    totalUnits=Allowgold+Allowsword+Allowspear+Allowaxe+Allowarcher+Allowknight+Allowelephants

        var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:Allowgold+"-"+Allowsword+"-"+Allowspear+"-"+Allowaxe+"-"+Allowarcher+"-"+Allowknight+"-"+Allowelephants
    }

    if(resourceType==0){   //if resource type =gold 
    if(Allowgold<=0){      //if no gold
    Details.Subject="your trade request rejected"
    Details.Message="we can't establish trade route with you"
    Details.type="trade"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("your Trade request sent") 
})

    }   //end if no gold
    else{    //if there is gold
    Details.Subject="your Trade request accepted"
    Details.Message=this.data.target+" paid for you and he get slaves"
    Details.type="trade"
    Details.action="gold"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=> {
if(err) throw err;
resolve("your Trade request sent") 
})

    }  //end if there is gold
}   //end if resource type =gold 
else{  //if resource type =troops

    if(totalUnits<=0){      //if no troops
    Details.Subject="your trade request rejected"
    Details.Message="we can't establish trade route with you"
    Details.type="trade"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=> {
if(err) throw err;
resolve("your Trade request sent") 
})

    }   //end if no troops
    else{    //if there is troops
    Details.Subject="your Trade request accepted"
    Details.Message="you get slaves from trade with "+this.data.target
    Details.type="trade"
    Details.action="troops"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=>{
if(err) throw err;
resolve("your Trade request sent") 
})

    }  //end if there is troops


} //end if resource type=troops
}) //end of check if owner at AI table
}   //end if rand >0
else{     //start if rand <0 mean your request rejected
            var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:0-0-0-0-0-0-0
    }
    Details.Subject="your trade request rejected"
    Details.Message="you not worth to trade with us"
    Details.type="trade"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("your Trade request sent") 
})
}    //end if rand <0 mean your request rejected
}         //end if player is AI
})   //end of promise
}
/////////////////////////////////////////////////////END OF Trade///////////////////////////////////////
/////////////////////////////////////////////////////start OF TRIBUTE///////////////////////////////////////
Mails.prototype.Tribute=function(){
return new Promise((resolve,reject)=>{    //start of promise


    Data={
sendTo:this.data.target,
sendFrom:this.data.username,
Date:new Date().getTime(),
Subject:0,
type:this.data.type,
}


Data.Subject="Tribute Answer"

if(this.data.control=="HUMAN"){
var sql = "INSERT INTO cwmails Set ?";
           database.query(sql,Data ,(err, result)=>{
if(err) throw err;
resolve("Tribute Demand Sent") 
})
}       //end if player is human

else{   //start of else player is AI
let rand=Math.floor(Math.random()*1)
if(rand>0){     //start if rand >0
var checkAi="SELECT * FROM cwai WHERE owner ='"+Data.sendTo+"'";
database.query(checkAi, async (errcheckAi, resultcheckAi)=> {  //start of check if owner at AI table
let resourceType=Math.floor(Math.random()*1)
let units=town(resultcheckAi[0].units)

    Allowgold=Math.floor(Math.random()*(Number(resultcheckAi[0].gold)*0.2))
    Allowsword=Math.floor(Math.random()*(Number(units[0])*0.2))
    Allowspear=Math.floor(Math.random()*(Number(units[1])*0.2))
    Allowaxe=Math.floor(Math.random()*(Number(units[2])*0.2))
    Allowarcher+=Math.floor(Math.random()*(Number(units[3])*0.2))
    Allowknight=Math.floor(Math.random()*(Number(units[4])*0.2))
    Allowelephants=Math.floor(Math.random()*(Number(units[5])*0.2))
    totalUnits=Allowgold+Allowsword+Allowspear+Allowaxe+Allowarcher+Allowknight+Allowelephants

        var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:Allowgold+"-"+Allowsword+"-"+Allowspear+"-"+Allowaxe+"-"+Allowarcher+"-"+Allowknight+"-"+Allowelephants
    }


    if(Allowgold<=0){      //if no gold
    Details.Subject="Your Demand Request Rejected"
    Details.Message="We Declare War over you COWARD!"
    Details.type="tribute"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("Tribute Demand Sent") 
})

    }   //end if no gold
    else{    //if there is gold
    Details.Subject="Your Tribute Demand Accepted"
    Details.Message=this.data.target+" Paid To You My Greate Liege"
    Details.type="tribute"
    Details.action="gold"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,(err, result)=> {
if(err) throw err;
resolve("Tribute Demand Sent") 
})

    }  //end if there is gold

}) //end of check if owner at AI table
}   //end if rand >0
else{     //start if rand <0 mean your request rejected
            var Details={
sendTo:this.data.username,
sendFrom:this.data.target,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:0-0-0-0-0-0-0
    }
    Details.Subject="Your Demand Request Rejected"
    Details.Message="We Declare War over you COWARD!"
    Details.type="tribute"
    Details.action="no"

var sql = "INSERT INTO cwreports Set ?";
           database.query(sql,Details ,function (err, result) {
if(err) throw err;
resolve("Tribute Demand Sent") 
})
}    //end if rand <0 mean your request rejected
}         //end if player is AI
})   //end of promise
}
/////////////////////////////////////////////////////END OF TRIBUTE///////////////////////////////////////
Mails.prototype.sendMail=function(){
return new Promise(async(resolve,reject)=>{    //start of promise
if(this.data.type=="help"){await this.Help().then((result)=>{resolve(result)})}
if(this.data.type=="trade"){await this.Trade().then((result)=>{resolve(result)})}
if(this.data.type=="tribute"){await this.Tribute().then((result)=>{resolve(result)})}
})   //end of promise
}      


////////////////////////////////////////////////////////////////////////////////////////////////////////////
Mails.prototype.sendReply=function(){   //start of function
return new Promise(async(resolve,reject)=>{   //start of promise
var getMail="SELECT * FROM cwmails WHERE id ='"+this.data.mailId+"'";
database.query(getMail, async (errgetMail, resultgetMail)=> {  //start of get Mail

var getTarget=""
if(resultgetMail[0].control=="HUMAN"){getTarget="SELECT * FROM cwplayers WHERE owner ='"+resultgetMail[0].sendFrom+"'";}
if(resultgetMail[0].control=="AI"){getTarget="SELECT * FROM cwai WHERE owner ='"+resultgetMail[0].sendFrom+"'";}
database.query(getTarget, async (errgetTarget, resultgetTarget)=> {  //start of get Target
    if(resultgetMail[0].action=="No"){       //if still no action taken
    var Details={
sendTo:this.data.target,
sendFrom:this.data.username,
Date:new Date().getTime(),
Subject:0,
title:0,
Message:0,
pic:0,
type:0,
action:0,
eunits:0
    }





if(this.data.type=="help"){
const resources=town(this.data.resources)
const currentUnits=town(resultgetTarget[0].units)
const unitsUpdated=(Number(resources[1])+Number(currentUnits[0]))+"-"+(Number(resources[2])+Number(currentUnits[1]))+"-"+(Number(resources[3])+Number(currentUnits[2]))+"-"+(Number(resources[4])+Number(currentUnits[3]))+"-"+(Number(resources[5])+Number(currentUnits[4]))+"-"+(Number(resources[6])+Number(currentUnits[5]))
Details.type="help"
if(this.data.action=="gold"){
Details.action="gold"
Details.Subject="your help request accepted"
Details.Message="You Get Financial Support from "+this.data.username
Details.pic="3"
Details.eunits=resources[0]+"-"+0+"-"+0+"-"+0+"-"+0+"-"+0+"-"+0
let newGold=(Number(resources[0])+Number(resultgetTarget[0].gold))
var updatePlayer
if(resultgetMail[0].control=="HUMAN"){updatePlayer= "UPDATE cwplayers SET gold= '"+newGold+"' WHERE id ='"+resultgetTarget[0].id+"'";}
if(resultgetMail[0].control=="AI"){updatePlayer= "UPDATE cwai SET gold= '"+newGold+"' WHERE id ='"+resultgetTarget[0].id+"'";}
await database.query(updatePlayer, (errupdatePlayer, resultupdatePlayer)=> { //start of update player
    console.log("update player gold")
})  //end of update player
}
if(this.data.action=="troops"){
Details.action="troops"
Details.Subject="your help request accepted"
Details.Message="You Get Support from "+this.data.username
Details.pic="3"
Details.eunits=0-resources[1]-resources[2]-resources[3]-resources[4]-resources[5]-resources[6]
var updatePlayer
if(resultgetMail[0].control=="HUMAN"){updatePlayer= "UPDATE cwplayers SET units='"+unitsUpdated+"' WHERE id ='"+resultgetTarget[0].id+"'";}
if(resultgetMail[0].control=="AI"){updatePlayer= "UPDATE cwai SET units= '"+unitsUpdated+"' WHERE id ='"+resultgetTarget[0].id+"'";}
await database.query(updatePlayer, (errupdatePlayer, resultupdatePlayer)=> { //start of update player
    console.log("update player troops")
})  //end of update player
}
if(this.data.action=="no"){
Details.action="no"
Details.Subject="your help request Rejected"
Details.Message=this.data.username+" Refused to Help you"
Details.pic="3"
Details.eunits=0
}
}
var updateMail= "UPDATE cwmails SET action = 'Yes' WHERE id ='"+resultgetMail[0].id+"'";
await database.query(updateMail, (errupdateMail, resultupdateMail)=> { //start of update mail
    console.log("update mail")
})  //end of update mail


var sql = "INSERT INTO cwreports Set ?";
await database.query(sql,Details ,function (err, result) {  //insert new report
if(err) throw err;
console.log("insert report")
})  //end of insert new report
console.log("done")
resolve("Your Response Sent")
} //end if no action taken
else{ //if action already taken
resolve("You Already Sent Your Response")

}  //end if action already taken

})  //end of get target
})  //end of get Mail
})   //end of promise

} //end of function
/*
//////////////////////////////////////////////////////

*/

module.exports=Mails