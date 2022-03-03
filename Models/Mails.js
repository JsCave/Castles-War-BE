const database=require("../db");
const validator=require("validator");
const ObjectID = require('mongodb').ObjectID

let Mails=function(data){
this.data=data
}


Mails.prototype.displayMails=function(){
return new Promise((resolve,reject)=>{
database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
database.collection("mails").find({sendTo:this.data.username}).toArray((err, result)=> {
if(err) throw err;
resolve(result)
})
}
else{
reject("404 error , please visit us later")
}
		})
})
}
//////////////////////////////////////////////////////
Mails.prototype.displayMail=function(){
return new Promise((resolve,reject)=>{
const id= new ObjectID(this.data.id)
database.collection("mails").findOne({_id:id,sendTo:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result){
let myquery = {_id:id};
let newvalues = { $set: {status:'read'} };
await database.collection("mails").updateOne(myquery, newvalues)
resolve(result)
}
else{
reject("Mail not found")
}
        })
})
}
//////////////////////////////////////////////////////
    Mails.prototype.sendM=function(){   //start of function
    this.data={
        target:this.data.username.charAt(0).toUpperCase() + this.data.username.slice(1),
        subject:String(this.data.subject),
        message:String(this.data.message)
    }
return new Promise(async(resolve,reject)=>{   //start of promise
if(this.data.target==""){reject("you need to insert Castle Name That you want send Message to")}
else if(this.data.subject==""){reject("provide Subject to your Message")}
else if(this.data.message==""){reject("You Can't send blank message")} 
else if(this.data.target!="" && !validator.isAlphanumeric(this.data.target)){reject("insert Valid Reciever Name")}
else if(this.data.subject.length<4 || this.data.subject.length>100){reject("Subject should be between 4 to 100 characters, ")}
else if(this.data.message.length<10 || this.data.message.length>700){reject("Message should be between 10 to 700 characters, ")}
database.collection("customers").findOne({username:this.data.target}, async (err, result)=> {
if(err) throw err;
if(!result){reject("Send To Invalid Castle")}
else{
    let currentTime= new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit',minute:'2-digit', second:'2-digit'}); // 08/19/2020 (month and day with two digits)

let Body= { sendFrom: this.data.username, sendTo: this.data.target ,subject:this.data.subject,message:this.data.message,status:"unread",date:currentTime,target:this.data.target};
await database.collection("mails").insertOne(Body, function(err, res) {})
resolve("Message Sent")
}
})

})      //end of promise
    }    //end of function






//////////////////////////////////////////////////////
	Mails.prototype.delete=function(){
return new Promise((resolve,reject)=>{
const id= new ObjectID(this.data.id)
database.collection("mails").deleteOne({_id:id,sendTo:this.data.username}, async (err, result)=> {
    if (err) throw err;
    resolve("Success")
  });
})
	}


module.exports=Mails