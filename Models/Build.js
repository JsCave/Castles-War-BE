const database=require("../db");
let Build=function(data){
this.data=data
}

function town(town){
let towndata=town.split("-");
return towndata;
}

Build.prototype.addBuild=function(){   //start of function
return new Promise((resolve,reject)=>{   // start of promise
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {   //start of sql
    var provinces="SELECT * FROM cwworld WHERE owner ='"+result[0].owner+"'";
    database.query(provinces, (errprovinces, resultprovinces)=> {    //start of provinces

if(err) throw err;
if(result.length>0){

	let newbuild
    let totalPrice
    let bamount=1
    var buildings=town(result[0].buildings)
 if(this.data.type=="barracks"){buildings[1]=Number(buildings[1])+bamount;newbuild=buildings[0]+"-"+buildings[1]+"-"+buildings[2]+"-"+buildings[3]+"-"+buildings[4]; totalPrice=10000}
 if(this.data.type=="archery"){buildings[2]=Number(buildings[2])+bamount;newbuild=buildings[0]+"-"+buildings[1]+"-"+buildings[2]+"-"+buildings[3]+"-"+buildings[4];  totalPrice=15000}
 if(this.data.type=="knightsAC"){buildings[3]=Number(buildings[3])+bamount;newbuild=buildings[0]+"-"+buildings[1]+"-"+buildings[2]+"-"+buildings[3]+"-"+buildings[4];  totalPrice=20000}
 if(this.data.type=="elephantsAC"){buildings[4]=Number(buildings[4])+bamount;newbuild=buildings[0]+"-"+buildings[1]+"-"+buildings[2]+"-"+buildings[3]+"-"+buildings[4];  totalPrice=25000}
 if(this.data.type=="mines"){buildings[0]=Number(buildings[0])+bamount;newbuild=buildings[0]+"-"+buildings[1]+"-"+buildings[2]+"-"+buildings[3]+"-"+buildings[4];  totalPrice=30000}
let edit=town(newbuild)
let totalBuildings=Number(edit[0])+Number(edit[1])+Number(edit[2])+Number(edit[3])+Number(edit[4])
let MaxBuilding=25*resultprovinces.length


if(result[0].gold<totalPrice){reject("you don't have enough gold")}
else if(totalBuildings>MaxBuilding){reject("You Can't Build,Try To Invade More Lands")}
    else{
let remainGold=result[0].gold-totalPrice
let myquery = {username:this.data.username};
var sql2 = "UPDATE cwplayers SET gold = '"+remainGold+"',buildings='"+newbuild+"' WHERE owner ='"+this.data.username+"'";

//let newvalues = { $set: {gold:remainGold,buildings:newbuild} };
database.query(sql2, (err2, result2)=> {
    if(err2) throw err2;
    var newbuildings=town(newbuild)
  const boxData={
  title:"you Constructed 1 "+this.data.type+" cost you "+totalPrice+"",
  mines:buildings[0],
  barracks:buildings[1],
  archery:buildings[2],
  knightsAC:buildings[3],
  elephantsAC:buildings[4],
  gold:remainGold,
  totalBuildings:Number(newbuildings[0])+Number(newbuildings[1])+Number(newbuildings[2])+Number(newbuildings[3])+Number(newbuildings[4])
  }
resolve(boxData)
})
}
}else{
reject("404 error , please visit us later")
}
})  //end of provinces query
		})  //end of sql query
})   //end of promise

}  //end of function



module.exports=Build