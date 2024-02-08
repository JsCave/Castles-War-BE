const database=require("../db");
//const ObjectID = require('mongodb').ObjectID

let Reports=function(data){
this.data=data
}


Reports.prototype.displayReports=function(){
return new Promise((resolve,reject)=>{
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
if(err) throw err;
if(result.length>0){
    var sql2="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"'";
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
    Reports.prototype.deleteS=function(){
return new Promise((resolve,reject)=>{
    var sql=[]
    let selectedR=this.data.selectedR
    if(selectedR.length>0){
for(let i=0;i<selectedR.length;i++){
sql[i]="Delete FROM cwreports WHERE sendTo ='"+this.data.username+"' AND id='"+selectedR[i]+"'";
database.query(sql[i], (err, result)=> {if(err) throw err;})
}
resolve("Selected Reports Deleted")
}
else{resolve("Select First Reports you want to delete")}
})
    }

//////////////////////////////////////////////////////

Reports.prototype.displayReport=function(){
return new Promise((resolve,reject)=>{
const id=this.data.id
var sql="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"' AND id='"+id+"'";
database.query(sql, async (err, result)=> {
if(err) throw err;
if(result){
var sql2 = "UPDATE cwreports SET status = 'read' WHERE id ='"+id+"'";
database.query(sql2, async (err2, result2)=> {
if(err2) throw err2;
resolve(result) 
})
}
else{
reject("report not found")
}
        })
})
}
////////////////////////////////////////////////////////////////
    Reports.prototype.delete=function(){
return new Promise(async(resolve,reject)=>{
    let selectedR=this.data.selectedR

sql="Delete FROM cwreports WHERE sendTo ='"+this.data.username+"' AND id='"+selectedR+"'";
await database.query(sql, (err, result)=> {
if(err) throw err;
resolve("Selected Report Deleted")
})


})
    }
////////////////////////////////////////////////////////////////
    Reports.prototype.deleteAll=function(){
return new Promise(async(resolve,reject)=>{
sql="Delete FROM cwreports WHERE sendTo ='"+this.data.username+"'";
await database.query(sql, (err, result)=> {
if(err) throw err;
resolve("All Reports Deleted")
})


})
    }
module.exports=Reports