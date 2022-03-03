const database=require("../db");
const ObjectID = require('mongodb').ObjectID

let Diplomacy=function(data){
this.data=data
}


Diplomacy.prototype.setDiplomacy=function(){
return new Promise(async (resolve,reject)=>{
await database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
await database.collection("diplomacy").findOne({userFrom:this.data.username,userTo:this.data.target}, async (err2, result2)=> {
if(err2) throw err2;
if(result2){
if(this.data.type==result2.type){reject("you already set "+result2.userTo+" as "+result2.type)}
else{
let myquery = {userFrom:this.data.username,userTo:this.data.target};
let newvalues = { $set: {type:this.data.type} };
await database.collection("diplomacy").updateOne(myquery, newvalues)
resolve("you set "+result2.userTo+" as "+this.data.type)
}
}else{
	let newrecord = { userFrom: this.data.username, userTo: this.data.target ,type:this.data.type};
await database.collection("diplomacy").insertOne(newrecord, function(err, res) {})
resolve("you set "+this.data.target+" as "+this.data.type)
}
})



}
else{
reject("404 error , please visit us later")
}
		})
})
}



module.exports=Diplomacy