const database=require("../db");
const ObjectID = require('mongodb').ObjectID

let Reports=function(data){
this.data=data
}


Reports.prototype.displayReports=function(){
return new Promise((resolve,reject)=>{
database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
database.collection("reports").find({sendTo:this.data.username}).toArray((err, result)=> {
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
Reports.prototype.displayReport=function(){
return new Promise((resolve,reject)=>{
const id= new ObjectID(this.data.id)
database.collection("reports").findOne({_id:id,sendTo:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result){
let myquery = {_id:id};
let newvalues = { $set: {status:'read'} };
await database.collection("reports").updateOne(myquery, newvalues)
resolve(result)
}
else{
reject("report not found")
}
        })
})
}
//////////////////////////////////////////////////////
	Reports.prototype.delete=function(){
return new Promise((resolve,reject)=>{
const id= new ObjectID(this.data.id)
database.collection("reports").deleteOne({_id:id,sendTo:this.data.username}, async (err, result)=> {
    if (err) throw err;
    resolve("Success")
  });
})
	}


module.exports=Reports