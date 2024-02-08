const database=require("../db.js");

function town(town){
let towndata=town.split("-");
return towndata;
}

let World=function(data){
  this.data=data,
  this.errors=[]
}







World.prototype.displayMap=function(){  //start of function
  return new Promise((resolve,reject)=>{   //start of promise
var cwplayers="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(cwplayers, async (errplayers, resultplayers)=> {  //start of first query

var cwplayerLocation="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(cwplayerLocation, async (errplayerLocation, resultplayersLocation)=> {  //get player location

var cwworld="SELECT * FROM cwworld";
database.query(cwworld, async (errworld, resultworld)=> {  //start of second query

var cwdiplomacy="SELECT * FROM cwdiplomacy WHERE sendFrom='"+this.data.username+"'";
database.query(cwdiplomacy, async (errdiplomacy, resultdiploamcy)=> { //start of third query 

var allplayers="SELECT * FROM cwplayers";
database.query(allplayers, async (errallplayers, resultallplayers)=> {  //start of fourth query 
if(!resultplayersLocation[0]){
resultplayersLocation[0].x=0
resultplayersLocation[0].y=0
}
  //adjust position

const startingPosition={
grid_x:99,
grid_y:99,
x:resultplayersLocation[0].x,
y:resultplayersLocation[0].y,
display:10,
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
  playerData:resultplayers,
  diplomacy:resultdiploamcy,
  playerLocation:startingPosition,
    mapData:resultworld,
    playersData:resultallplayers
  }
  
resolve(worldData)
}) //end of fourth query
}) //end of third query
}) //end of second query
})  //end of playerLocation
})  //end of first query
})   //end of promise
}   //end of function


World.prototype.Reveal=function(){  //start of function
  return new Promise((resolve,reject)=>{   //start of promise
   var provincesNum="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(provincesNum, async (errprovincesNum, resultprovincesNum)=> {  //start of provinces Numbers query
    var checkPlayerIsOwner="SELECT * FROM cwworld WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"'";
    database.query(checkPlayerIsOwner, async (errPlayerOwner, resultPlayerOwner)=> {  //start of checkPlayerIsOwner query
      if(resultPlayerOwner[0].owner==this.data.username){  //if player owner
  const boxData={
  info:2,
  damage:resultPlayerOwner[0].damage
  }
  resolve(boxData)


      }
        else{      //if player not owner
var checkReveal="SELECT * FROM reveal WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"' AND owner='"+this.data.username+"'";
database.query(checkReveal, async (err, result)=> {  //start of checkReveal query
if(result.length<1){
  var playerGold="SELECT * FROM cwplayers WHERE owner='"+this.data.username+"'";
database.query(playerGold, async (errplayergold, resultplayergold)=> {  //start of playergold query
  const price=10000*Number(resultprovincesNum.length)
  const boxData={
  info:0,
  name:0,
  prestige:0,
  troops:0,
  price:price,
  }
  resolve(boxData)
})
}else{    //start of else 
  var playerGold="SELECT * FROM cwplayers WHERE owner='"+this.data.username+"'";
database.query(playerGold, async (errplayergold, resultplayergold)=> {  //start of playergold query
  const boxData={
  info:1,
  owner:result[0].target,
  prestige:result[0].prestige,
  troops:result[0].troops,
  provinces:result[0].provinces,
  timeUpdate:result[0].date,
  x:result[0].x,
  y:result[0].y,
  control:result[0].control,
  type:result[0].type,
  price:10000*Number(resultprovincesNum.length)
  }
  resolve(boxData)
})
}  //end of else

})  //end of checkReveal query
} //end of else player not owner
})  //end of check if player owner query
  }) //end of check provinces Numbers
})   //end of promise
}   //end of function
module.exports=World