const bcrypt=require("bcryptjs");
const validator=require("validator");
const database=require("../db.js");

let World=function(data){
this.data=data
}


World.prototype.displayMap=function(){  //start of function
	return new Promise((resolve,reject)=>{   //start of promise

database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {  //start of first query

database.collection("world").find({}).toArray((err,result2)=> {  //start of second query

database.collection("diplomacy").find({userFrom:this.data.username}).toArray((err, result3)=> { //start of third query	

database.collection("customers").find({}).toArray((err, result4)=> {  //start of fourth query	

	//adjust position
const startingPosition={
grid_x:9,
grid_y:9,
x:this.data.x,
y:this.data.y,
display:2,
display_half:"",
other_half:"",
start_x:"",
end_x:"",
start_y:"",
end_y:""
}

startingPosition.display_half=Math.floor(startingPosition.display/ 2)
startingPosition.other_half=startingPosition.display - startingPosition.display_half

startingPosition.start_y=startingPosition.y - startingPosition.display_half
startingPosition.start_x=startingPosition.x - startingPosition.display_half

startingPosition.end_x=startingPosition.x + startingPosition.other_half



startingPosition.end_y=startingPosition.y + startingPosition.other_half


if(startingPosition.start_x<0){
startingPosition.start_x=0;
startingPosition.end_x=startingPosition.display;
}

if(startingPosition.end_x>startingPosition.grid_x){
let extra=startingPosition.end_x-startingPosition.grid_x;
startingPosition.end_x=startingPosition.grid_x;
startingPosition.start_x = startingPosition.start_x - extra;
}





if(startingPosition.start_y<0){
startingPosition.start_y=0;
startingPosition.end_y=startingPosition.display;
}
if(startingPosition.end_y>startingPosition.grid_y){
let extra=startingPosition.end_y-startingPosition.grid_y;
startingPosition.end_y=startingPosition.grid_y;
startingPosition.start_y = startingPosition.start_y - extra;
}


	//end of adjust position
	const worldData={
	diplomacy:result3,
	playerLocation:startingPosition,
    mapData:result2,
    playersData:result4
	}
	
resolve(worldData)
}) //end of fourth query
}) //end of third query
}) //end of second query
})  //end of first query
})   //end of promise
}   //end of function

module.exports=World