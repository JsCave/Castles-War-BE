const database=require("../db");
const ObjectID = require('mongodb').ObjectID

let Reports=function(data){
this.data=data
}


Reports.prototype.addBuild=function(){
return new Promise((resolve,reject)=>{
database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
if(!Number(this.data.uamount)){reject("please use number only")}else{
	let newbuild
    let totalPrice
    let uamount=Number(this.data.uamount)
 if(this.data.type=="barracks"){newbuild={barracks:result.buildings.barracks+uamount,archery:result.buildings.archery,knightsA:result.buildings.knightsA,elephantsA:result.buildings.elephantsA,mine:result.buildings.mine}; totalPrice=5000*this.data.uamount}
 if(this.data.type=="archery"){newbuild={barracks:result.buildings.barracks,archery:result.buildings.archery+uamount,knightsA:result.buildings.knightsA,elephantsA:result.buildings.elephantsA,mine:result.buildings.mine}; totalPrice=10000*this.data.uamount}
 if(this.data.type=="knightsAC"){newbuild={barracks:result.buildings.barracks,archery:result.buildings.archery,knightsA:result.buildings.knightsA+uamount,elephantsA:result.buildings.elephantsA,mine:result.buildings.mine}; totalPrice=15000*this.data.uamount}
 if(this.data.type=="elephantsAC"){newbuild={barracks:result.buildings.barracks,archery:result.buildings.archery,knightsA:result.buildings.knightsA,elephantsA:result.buildings.elephantsA+uamount,mine:result.buildings.mine}; totalPrice=20000*this.data.uamount}
 if(this.data.type=="mine"){newbuild={barracks:result.buildings.barracks,archery:result.buildings.archery,knightsA:result.buildings.knightsA,elephantsA:result.buildings.elephantsA,mine:result.buildings.mine+uamount}; totalPrice=25000*this.data.uamount}





if(result.gold<totalPrice){reject("you don't have enough gold")}else{
let remainGold=result.gold-totalPrice
let myquery = {username:this.data.username};
let newvalues = { $set: {gold:remainGold,buildings:newbuild} };
database.collection("customers").updateOne(myquery, newvalues)
resolve("you spent "+totalPrice+"")
}
}}
else{
reject("404 error , please visit us later")
}
		})
})
}



module.exports=Reports