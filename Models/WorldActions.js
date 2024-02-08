const database=require("../db.js");

function town(town){
let towndata=town.split("-");
return towndata;
}

let WorldActions=function(data){
  this.data=data,
  this.errors=[]
}

///////////////////////////////////////////////////////check if target has border with player////////////////////////

let borders=0;
let searching=0;

WorldActions.prototype.Validate=function(){  //start of function
      return new Promise(async(resolve,reject)=>{  //start of promise
let username=this.data.username


let targetX=this.data.x
let targetY=this.data.y

let startX=Number(targetX)-1
let startY=Number(targetY)-1



let endX=Number(targetX)+1
let endY=Number(targetY)+1


function alaa(x,y){
  return new Promise(async(resolve,reject)=>{
checkReveal="SELECT * FROM cwworld WHERE x ='"+x+"' AND y ='"+y+"'";
await database.query(checkReveal,(err, result)=> {  //start of checkReveal query
  searching++
  if(result.length>0){
if(result[0].owner==username){
borders++
}
}
resolve()
}) //end of query
})
}

for(let y=startY;y<=endY;y++){
for(let x=startX;x<=endX;x++){
  /////////////////////////////////////////////////////////////////////////////////////////////////////
await alaa(x,y)
////////////////////////////////////////////////////////////////////////////////////////////////////////
} //end of x loop
} //end of y loop

if(borders>0){resolve("there is borders")}else{resolve("no borders")}

})  //end of promise
}

/*WorldActions.prototype.Test=function(){  //start of function
  return new Promise(async(resolve,reject)=>{   //start of promise
     await this.ValidateTest().then((result)=>{borders=1}).catch((e)=>{borders=0})
console.log(borders)

})
}*/
///////////////////////////////////////////////////////////////////EXPLORE///////////////////////////////////////////////
WorldActions.prototype.Explore=function(){  //start of function
  return new Promise(async (resolve,reject)=>{   //start of promise
    borders=0
    await this.Validate();
    if(borders>0){    //if borders>0
var player="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(player, async (errplayer, resultplayer)=> {  //start of player query
var provincesNum="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(provincesNum, async (errprovincesNum, resultprovincesNum)=> {  //start of provinces query
  let price=Number(resultprovincesNum.length)*10000
  if(resultplayer[0].gold>=price){    //if there is enough gold
var checkReveal="SELECT * FROM cwworld WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"'";
database.query(checkReveal, async (err, result)=> {  //start of checkReveal query
if(result.length<1){
  reject("No information found try again later")
}else{    //start of else found record at cwworld
var targetInfo
if(result[0].control=="HUMAN"){targetInfo="SELECT * FROM cwplayers WHERE owner ='"+result[0].owner+"'";}
if(result[0].control=="AI"){targetInfo="SELECT * FROM cwai WHERE owner ='"+result[0].owner+"'";}
database.query(targetInfo, async (errinfo, resultinfo)=> {  //start of target query
  if(result[0].control==""){resultinfo=[]}
if(resultinfo.length>0){ //if there is owner
  var units=town(resultinfo[0].units)
  var totalUntis=Number(units[0])+Number(units[1])+Number(units[2])+Number(units[3])+Number(units[4])+Number(units[5])
  var provinces="SELECT * FROM cwworld WHERE owner ='"+result[0].owner+"'";
database.query(provinces, async (errprovines, resultprovinces)=> {  //start of provinces number query

  const boxData={
  info:1,
  owner:resultinfo[0].owner,
  race:0,
  prestige:resultinfo[0].prestige,
  troops:totalUntis,
  provinces:resultprovinces.length,
  price:this.data.price,
  x:this.data.x,
  y:this.data.y,
  control:result[0].control,
  type:"full"
  }

             var createReveal = "INSERT INTO reveal Set ?";
revealRecord={
x:this.data.x,
y:this.data.y,
target:result[0].owner,
prestige:resultinfo[0].prestige,
troops:totalUntis,
owner:this.data.username,
date:new Date().getTime(),
control:result[0].control,
type:"full"
}
////////////////////////////////////////////////////////////////////////////
    var inquiryReveal="SELECT * FROM reveal WHERE x='"+this.data.x+"' AND y='"+this.data.y+"' AND owner ='"+this.data.username+"'";
    database.query(inquiryReveal, (errinquiryReveal, resultinquiryReveal)=> {   //start of inquiry reveal
      if(resultinquiryReveal.length>0){    //if there is already record
let deleteOrder="Delete FROM reveal WHERE id ='"+resultinquiryReveal[0].id+"'";
  database.query(deleteOrder, (errdeleteOrder, resultdeleteOrder)=> {  //start of delete old record order
database.query(createReveal,revealRecord ,function (err2, result2) {  //start of create Reveal record
if (err2) throw err2;
  console.log(boxData)
  resolve(boxData)
})   //end of create Reveal record
})   //end of delete old record order
      }else{    //if no record
database.query(createReveal,revealRecord ,function (err2, result2) {
if (err2) throw err2;    //start of create Reveal record
  console.log(boxData)
  resolve(boxData)
}) //end of create Reveal record
}   //end if no record
}) //end of inquiryreveal
////////////////////////////////////////////////////////////////////////////

}) //end of provinces query
}  //end of if owner
else{ //in case not found Ai record create new one
  var selectRandomFaction="SELECT * FROM factions ORDER BY RAND() LIMIT 1";
  database.query(selectRandomFaction, (errselectRandomFaction, resultselectRandomFaction)=> { //start of selectRandomFaction query
  var provinces="SELECT * FROM cwworld WHERE owner ='"+resultselectRandomFaction[0].owner+"'";
  database.query(provinces, async (errprovines, resultprovinces)=> {  //start of provinces number query

  var units=town(resultplayer[0].units)
  var buildings=town(resultplayer[0].buildings)
  let unitsDetails={   //contain player details that i use for create AI
        swordman:Math.floor(Math.random()*(units[0]*10)),
        spearman:Math.floor(Math.random()*(units[1]*10)),
        axeman:Math.floor(Math.random()*(units[2]*10)),
        archer:Math.floor(Math.random()*(units[3]*10)),
        knights:Math.floor(Math.random()*(units[4]*10)),
        elephants:Math.floor(Math.random()*(units[5]*10)),
        mines:Math.floor(Math.random()*(buildings[0]*10)),
        barracks:Math.floor(Math.random()*(buildings[1]*10)),
        archery:Math.floor(Math.random()*(buildings[2]*10)),
        knightsAC:Math.floor(Math.random()*(buildings[3]*10)),
        elephantsAc:Math.floor(Math.random()*(buildings[4]*10))

  }
  var totalUntis=Number(unitsDetails.swordman)+Number(unitsDetails.spearman)+Number(unitsDetails.axeman)+Number(unitsDetails.archer)+Number(unitsDetails.knights)+Number(unitsDetails.elephants)
  let aiGold=Math.floor(Math.random()*(resultplayer[0].gold*10))
  let aiPrestige=(
  Math.ceil(unitsDetails.swordman*0.01)+
  Math.ceil(unitsDetails.spearman*0.01)+
  Math.ceil(unitsDetails.axeman*0.01)+
  Math.ceil(unitsDetails.archer*0.02)+
  Math.ceil(unitsDetails.knights*0.03)+
  Math.ceil(unitsDetails.elephants*0.04)+
    +(resultprovinces.length*100))
let aiRecord={
owner:resultselectRandomFaction[0].owner,
gold:aiGold,
prestige:aiPrestige,
morale:0,
last_morale:new Date().getTime(),
units:unitsDetails.swordman+"-"+unitsDetails.spearman+"-"+unitsDetails.axeman+"-"+unitsDetails.archer+"-"+unitsDetails.knights+"-"+unitsDetails.elephants,
buildings:unitsDetails.mines+"-"+unitsDetails.barracks+"-"+unitsDetails.archery+"-"+unitsDetails.knightsAC+"-"+unitsDetails.elephantsAc,
x:this.data.x,
y:this.data.y,
provinces:resultprovinces.length,
}

const boxData={
  info:1,
  owner:resultselectRandomFaction[0].owner,
  race:resultselectRandomFaction[0].race,
  prestige:aiPrestige,
  troops:totalUntis,
  provinces:resultprovinces.length,
  price:this.data.price,
  x:this.data.x,
  y:this.data.y,
  control:"AI",
  type:"full"
  }

var createAI = "INSERT INTO cwai Set ?";
database.query(createAI,aiRecord ,function (errcreateAI, resultcreateAI) {   //start of insert record at AI 
if (errcreateAI) throw errcreateAI;
var createReveal = "INSERT INTO reveal Set ?";
let revealRecord={
prestige:aiPrestige,
target:resultselectRandomFaction[0].owner,
troops:totalUntis,
owner:resultplayer[0].owner,
date:new Date().getTime(),
x:boxData.x,
y:boxData.y,
control:result[0].control,
type:"full"
}

database.query(createReveal,revealRecord ,function (errcreateREVEAL, resultcreateREVEAL) {   //start of insert reveal record
if (errcreateREVEAL) throw errcreateREVEAL;
     var mapUpdate = "UPDATE cwworld SET owner = '"+resultselectRandomFaction[0].owner+"',control='AI' WHERE x='"+revealRecord.x+"' AND y='"+revealRecord.y+"'";
     database.query(mapUpdate, (errupdateMorale, resultupdateMorale)=> {   //start map Update
       resolve(boxData)
     })  //end of map update

})  //end of insert reveal record

})  //end of insert record at AI

  }) //end of provinces number
  }) // end of selectRandomFaction query

} //end of in case not found Ai record create new one



}) //end of targets query
}  //end of else found cwworld record

})  //end of checkReveal query
}//end if there is enough gold
else{reject("you don't have enough gold for explore area,You Need "+price)}//if there is no enough gold
}) //end of provinces query
})  //end of player query

}  //end if borders>0

else{    //if borders<=0
reject("you not have borders with that province")
}   //end if border<=0
})   //end of promise
}   //end of Explore function



  ///////////////////////////create AI record
WorldActions.prototype.createAI=function(){
  return new Promise((resolve,reject)=>{
    var player="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(player, async (errplayer, resultplayer)=> {  //start of player query
  var selectRandomFaction="SELECT * FROM factions ORDER BY RAND() LIMIT 1";
 database.query(selectRandomFaction, (errselectRandomFaction, resultselectRandomFaction)=> { //start of selectRandomFaction query
  var provinces="SELECT * FROM cwworld WHERE owner ='"+resultselectRandomFaction[0].owner+"'";
  database.query(provinces, async (errprovines, resultprovinces)=> {  //start of provinces number query
  var units=town(resultplayer[0].units)
  var buildings=town(resultplayer[0].buildings)
  let unitsDetails={   //contain player details that i use for create AI
        swordman:Math.floor(Math.random()*(units[0]*10)),
        spearman:Math.floor(Math.random()*(units[1]*10)),
        axeman:Math.floor(Math.random()*(units[2]*10)),
        archer:Math.floor(Math.random()*(units[3]*10)),
        knights:Math.floor(Math.random()*(units[4]*10)),
        elephants:Math.floor(Math.random()*(units[5]*10)),
        mines:Math.floor(Math.random()*(buildings[0]*10)),
        barracks:Math.floor(Math.random()*(buildings[1]*10)),
        archery:Math.floor(Math.random()*(buildings[2]*10)),
        knightsAC:Math.floor(Math.random()*(buildings[3]*10)),
        elephantsAc:Math.floor(Math.random()*(buildings[4]*10))

  }
  var totalUntis=Number(unitsDetails.swordman)+Number(unitsDetails.spearman)+Number(unitsDetails.axeman)+Number(unitsDetails.archer)+Number(unitsDetails.knights)+Number(unitsDetails.elephants)
  let aiGold=Math.floor(Math.random()*(resultplayer[0].gold*10))
  let aiPrestige=Math.floor((totalUntis*0.01)+(resultprovinces.length*1000))
let aiRecord={
owner:resultselectRandomFaction[0].owner,
gold:aiGold,
prestige:aiPrestige,
morale:0,
last_morale:new Date().getTime(),
units:unitsDetails.swordman+"-"+unitsDetails.spearman+"-"+unitsDetails.axeman+"-"+unitsDetails.archer+"-"+unitsDetails.knights+"-"+unitsDetails.elephants,
buildings:unitsDetails.mines+"-"+unitsDetails.barracks+"-"+unitsDetails.archery+"-"+unitsDetails.knightsAC+"-"+unitsDetails.elephantsAc,
x:this.data.x,
y:this.data.y,
provinces:resultprovinces.length,
}

const boxData={
  info:1,
  owner:resultselectRandomFaction[0].owner,
  race:resultselectRandomFaction[0].race,
  prestige:aiPrestige,
  troops:totalUntis,
  provinces:resultprovinces.length,
  price:this.data.price,
  x:this.data.x,
  y:this.data.y,
  control:"AI"
  }
if(resultprovinces.length<1){
  boxData.provinces=1
var createAI = "INSERT INTO cwai Set ?";
database.query(createAI,aiRecord ,(errcreateAI, resultcreateAI)=>{   //start of insert record at AI 
if (errcreateAI) throw errcreateAI;



     var mapUpdate = "UPDATE cwworld SET owner = '"+resultselectRandomFaction[0].owner+"',control='AI' WHERE x='"+this.data.x+"' AND y='"+this.data.y+"'";
     database.query(mapUpdate, (errupdateMorale, resultupdateMorale)=> {   //start map Update
       resolve(resultselectRandomFaction[0].owner)
     })  //end of map update



})  //end of insert record at AI
}else{ //if ai already exist
     var mapUpdate = "UPDATE cwworld SET owner = '"+resultselectRandomFaction[0].owner+"',control='AI' WHERE x='"+this.data.x+"' AND y='"+this.data.y+"'";
     database.query(mapUpdate, (errupdateMorale, resultupdateMorale)=> {   //start map Update
       resolve(resultselectRandomFaction[0].owner)
     })
}
  }) //end of provinces number
  }) // end of selectRandomFaction query
}) //end of player query
})
}
  ///////////////////////////end create AI record

////////////////////////////////////////////////////////////////WAR////////////////////////////////////////////////////
WorldActions.prototype.War=function(){     //start of function
return new Promise(async(resolve,reject)=>{    //start of promise
      borders=0
    await this.Validate();
    if(borders>0){    //if borders>0
var attacker="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
database.query(attacker, async (errattacker, resultattacker)=> {  //start of attacker query
if(errattacker) throw errattacker;
if(resultattacker.length>0){
  let checkPower=town(resultattacker[0].units)
  let totalPower=Number(checkPower[0])+Number(checkPower[1])+Number(checkPower[2])+Number(checkPower[3])+Number(checkPower[4])+Number(checkPower[5])
  if(totalPower>=5000){
var targetQuery="SELECT * FROM cwworld WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"'";
await database.query(targetQuery, async (errtargetQuery, resulttargetQuery)=> {   //start of target query on map




if(resulttargetQuery[0].owner!=this.data.username){  //start if player attack himself
  var defender=""

if(resulttargetQuery[0].control=="HUMAN"){defender="SELECT * FROM cwplayers WHERE owner ='"+resulttargetQuery[0].owner+"'";}
if(resulttargetQuery[0].control=="AI"){defender="SELECT * FROM cwai WHERE owner ='"+resulttargetQuery[0].owner+"'";}
if(resulttargetQuery[0].control==""){
await this.createAI().then((result)=>{defender="SELECT * FROM cwai WHERE owner ='"+result+"'";
resulttargetQuery[0].owner=result
})
}

var attackerProvinces
var defenderProvinces
var provincesQueryAttacker="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
var provincesQueryDefender="SELECT * FROM cwworld WHERE owner ='"+resulttargetQuery[0].owner+"'";
await database.query(provincesQueryAttacker, async (errprovincesQueryAttacker, resultprovincesQueryAttacker)=> {   //start of attacker provinces query
await database.query(provincesQueryDefender, async (errprovincesQueryDefender, resultprovincesQueryDefender)=> {   //start of defender provinces query
attackerProvinces=resultprovincesQueryAttacker.length
defenderProvinces=resultprovincesQueryDefender.length
console.log("provincesatk"+attackerProvinces)
console.log("provincesdef"+defenderProvinces)
database.query(defender, async (errdefender, resultdefender)=> {  //start of defender query
if(errdefender) throw errdefender;
if(resultdefender.length>0){

let attackerArmy=town(resultattacker[0].units)
let enemyArmy=town(resultdefender[0].units)

let attackerPower
let enemyPower

if(resultprovincesQueryAttacker[0].control=="AI"){attackerPower={swordman:Number(attackerArmy[0])*0.01,spearman:Number(attackerArmy[1])*0.02,axeman:Number(attackerArmy[2])*0.03,archers:Number(attackerArmy[3])*0.04,knights:Number(attackerArmy[4])*0.05,elephants:Number(attackerArmy[5])*0.06}}
  else{attackerPower={swordman:(Number(attackerArmy[0])/attackerProvinces)*0.01,spearman:(Number(attackerArmy[1])/attackerProvinces)*0.02,axeman:(Number(attackerArmy[2])/attackerProvinces)*0.03,archers:(Number(attackerArmy[3])/attackerProvinces)*0.04,knights:(Number(attackerArmy[4])/attackerProvinces)*0.05,elephants:(Number(attackerArmy[5])/attackerProvinces)*0.06}}


if(resultprovincesQueryDefender[0].control=="AI"){enemyPower={swordman:Number(enemyArmy[0])*0.011,spearman:Number(enemyArmy[1])*0.016,axeman:Number(enemyArmy[2])*0.027,archers:Number(enemyArmy[3])*0.038,knights:Number(enemyArmy[4])*0.055,elephants:Number(enemyArmy[5])*0.058}}
else{enemyPower={swordman:(Number(enemyArmy[0])/defenderProvinces)*0.011,spearman:(Number(enemyArmy[1])/defenderProvinces)*0.016,axeman:(Number(enemyArmy[2])/defenderProvinces)*0.027,archers:(Number(enemyArmy[3])/defenderProvinces)*0.038,knights:(Number(enemyArmy[4])/defenderProvinces)*0.055,elephants:(Number(enemyArmy[5])/defenderProvinces)*0.058}}


let attackerLossL1={
swordman:(Number(attackerArmy[0])-(Number(attackerArmy[0])-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
spearman:(Number(attackerArmy[1])-(Number(attackerArmy[1])-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers))),
axeman:(Number(attackerArmy[2])-(Number(attackerArmy[2])-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
archers:(Number(attackerArmy[3])-(Number(attackerArmy[3])-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights))),
knights:(Number(attackerArmy[4])-(Number(attackerArmy[4])-(enemyPower.spearman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
elephants:(Number(attackerArmy[5])-(Number(attackerArmy[5])-(enemyPower.spearman+enemyPower.elephants)))
}

let enemyLossL1={
swordman:(Number(enemyArmy[0])-(Number(enemyArmy[0])-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
spearman:(Number(enemyArmy[1])-(Number(enemyArmy[1])-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers))),
axeman:(Number(enemyArmy[2])-(Number(enemyArmy[2])-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
archers:(Number(enemyArmy[3])-(Number(enemyArmy[3])-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights))),
knights:(Number(enemyArmy[4])-(Number(enemyArmy[4])-(attackerPower.spearman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
elephants:(Number(enemyArmy[5])-(Number(enemyArmy[5])-(attackerPower.spearman+attackerPower.elephants)))
}


let attackerLossL2={
swordman:Math.floor(attackerLossL1.swordman/4),
spearman:Math.floor(attackerLossL1.spearman/4),
axeman:Math.floor(attackerLossL1.axeman/4),
archers:Math.floor(attackerLossL1.archers/4),
knights:Math.floor(attackerLossL1.knights/4),
elephants:Math.floor(attackerLossL1.elephants/4)
}

let enemyLossL2={
swordman:Math.floor(enemyLossL1.swordman/4),
spearman:Math.floor(enemyLossL1.spearman/4),
axeman:Math.floor(enemyLossL1.axeman/4),
archers:Math.floor(enemyLossL1.archers/4),
knights:Math.floor(enemyLossL1.knights/4),
elephants:Math.floor(enemyLossL1.elephants/4)
}

let attackerLossL3={
swordman:Math.floor(Math.random()*(attackerLossL1.swordman-attackerLossL2.swordman+1))+attackerLossL2.swordman,
spearman:Math.floor(Math.random()*(attackerLossL1.spearman-attackerLossL2.spearman+1))+attackerLossL2.spearman,
axeman:Math.floor(Math.random()*(attackerLossL1.axeman-attackerLossL2.axeman+1))+attackerLossL2.axeman,
archers:Math.floor(Math.random()*(attackerLossL1.archers-attackerLossL2.archers+1))+attackerLossL2.archers,
knights:Math.floor(Math.random()*(attackerLossL1.knights-attackerLossL2.knights+1))+attackerLossL2.knights,
elephants:Math.floor(Math.random()*(attackerLossL1.elephants-attackerLossL2.elephants+1))+attackerLossL2.elephants,
}

let enemyLossL3={
swordman:Math.floor(Math.random()*(enemyLossL1.swordman-enemyLossL2.swordman+1))+enemyLossL2.swordman,
spearman:Math.floor(Math.random()*(enemyLossL1.spearman-enemyLossL2.spearman+1))+enemyLossL2.spearman,
axeman:Math.floor(Math.random()*(enemyLossL1.axeman-enemyLossL2.axeman+1))+enemyLossL2.axeman,
archers:Math.floor(Math.random()*(enemyLossL1.archers-enemyLossL2.archers+1))+enemyLossL2.archers,
knights:Math.floor(Math.random()*(enemyLossL1.knights-enemyLossL2.knights+1))+enemyLossL2.knights,
elephants:Math.floor(Math.random()*(enemyLossL1.elephants-enemyLossL2.elephants+1))+enemyLossL2.elephants,
}

if(attackerLossL3.swordman>Number(attackerArmy[0])){attackerLossL3.swordman=Number(attackerArmy[0])}
if(attackerLossL3.swordman<0){attackerLossL3.swordman=0}
if(attackerLossL3.spearman>Number(attackerArmy[1])){attackerLossL3.spearman=Number(attackerArmy[1])}
if(attackerLossL3.spearman<0){attackerLossL3.spearman=0}
if(attackerLossL3.axeman>Number(attackerArmy[2])){attackerLossL3.axeman=Number(attackerArmy[2])}
if(attackerLossL3.axeman<0){attackerLossL3.axeman=0}
if(attackerLossL3.archers>Number(attackerArmy[3])){attackerLossL3.archers=Number(attackerArmy[3])}
if(attackerLossL3.archers<0){attackerLossL3.archers=0}
if(attackerLossL3.knights>Number(attackerArmy[4])){attackerLossL3.knights=Number(attackerArmy[4])}
if(attackerLossL3.knights<0){attackerLossL3.knights=0}
if(attackerLossL3.elephants>Number(attackerArmy[5])){attackerLossL3.elephants=Number(attackerArmy[5])}
if(attackerLossL3.elephants<0){attackerLossL3.elephants=0}


if(enemyLossL3.swordman>Number(enemyArmy[0])){enemyLossL3.swordman=Number(enemyArmy[0])}
if(enemyLossL3.swordman<0){enemyLossL3.swordman=0}
if(enemyLossL3.spearman>Number(enemyArmy[1])){enemyLossL3.spearman=Number(enemyArmy[1])}
if(enemyLossL3.spearman<0){enemyLossL3.spearman=0}
if(enemyLossL3.axeman>Number(enemyArmy[2])){enemyLossL3.axeman=Number(enemyArmy[2])}
if(enemyLossL3.axeman<0){enemyLossL3.axeman=0}
if(enemyLossL3.archers>Number(enemyArmy[3])){enemyLossL3.archers=Number(enemyArmy[3])}
if(enemyLossL3.archers<0){enemyLossL3.archers=0}
if(enemyLossL3.knights>Number(enemyArmy[4])){enemyLossL3.knights=Number(enemyArmy[4])}
if(enemyLossL3.knights<0){enemyLossL3.knights=0}
if(enemyLossL3.elephants>Number(enemyArmy[5])){enemyLossL3.elephants=Number(enemyArmy[5])}
if(enemyLossL3.elephants<0){enemyLossL3.elephants=0}

let finalAttackerLoss=attackerLossL3.swordman+'-'+attackerLossL3.spearman+'-'+attackerLossL3.axeman+'-'+attackerLossL3.archers+'-'+attackerLossL3.knights+'-'+attackerLossL3.elephants
let finalEnemyLoss=enemyLossL3.swordman+'-'+enemyLossL3.spearman+'-'+enemyLossL3.axeman+'-'+enemyLossL3.archers+'-'+enemyLossL3.knights+'-'+enemyLossL3.elephants

let attackerLeft=
(Number(attackerArmy[0])-Number(attackerLossL3.swordman))+"-"+
(Number(attackerArmy[1])-Number(attackerLossL3.spearman))+"-"+
(Number(attackerArmy[2])-Number(attackerLossL3.axeman))+"-"+
(Number(attackerArmy[3])-Number(attackerLossL3.archers))+"-"+
(Number(attackerArmy[4])-Number(attackerLossL3.knights))+"-"+
(Number(attackerArmy[5])-Number(attackerLossL3.elephants))


let enemyLeft=
(Number(enemyArmy[0])-Number(enemyLossL3.swordman))+"-"+
(Number(enemyArmy[1])-Number(enemyLossL3.spearman))+"-"+
(Number(enemyArmy[2])-Number(enemyLossL3.axeman))+"-"+
(Number(enemyArmy[3])-Number(enemyLossL3.archers))+"-"+
(Number(enemyArmy[4])-Number(enemyLossL3.knights))+"-"+
(Number(enemyArmy[5])-Number(enemyLossL3.elephants))


let totalAttackerL=attackerLossL3.swordman+attackerLossL3.spearman+attackerLossL3.axeman+attackerLossL3.archers+attackerLossL3.knights+attackerLossL3.elephants
let totalEnemyL=enemyLossL3.swordman+enemyLossL3.spearman+enemyLossL3.axeman+enemyLossL3.archers+enemyLossL3.knights+enemyLossL3.elephants
let newPrestigeA
let newPrestigeD
if(totalAttackerL<totalEnemyL){newPrestigeA=Number(resultattacker[0].prestige+10); newPrestigeD=Number(resultdefender[0].prestige-10)}
if(totalAttackerL>=totalEnemyL){newPrestigeA=Number(resultattacker[0].prestige-10); newPrestigeD=Number(resultdefender[0].prestige+10)}
if(newPrestigeA<10){newPrestigeA=10}
if(newPrestigeD<10){newPrestigeD=10}
let subjectE=this.data.username+" Attacked You"
let subjectA="You Attacked "+resulttargetQuery[0].owner

let titleE
let titleA
let eventA
let eventE
let goldLooted
let damage

var randomEvent="SELECT * FROM warscenario ORDER BY RAND() LIMIT 1";
database.query(randomEvent, async (errevent, resultevent)=> {  //start of choose random event query
if (errevent) throw errevent;
var inquiryReveal="SELECT * FROM reveal WHERE x='"+this.data.x+"' AND y='"+this.data.y+"' AND owner ='"+this.data.username+"'";
database.query(inquiryReveal,async (errinquiryReveal, resultinquiryReveal)=> {   //start of inquiry reveal

if(totalAttackerL>=totalEnemyL){eventA=resultevent[0].losser; titleA="You Lost The Battle"; titleE="You Are Victorious"; eventE=resultevent[0].winner; goldLooted=0.0; damage=0}

if(totalAttackerL<totalEnemyL){eventA=resultevent[0].winner;titleA="You Are Victorious"; titleE="You Lost The Battle"; eventE=resultevent[0].losser; goldLooted=0.05; damage=10}
let goldfinallooted=Math.floor(resultdefender[0].gold*goldLooted)
let newgoldE=Math.floor(resultdefender[0].gold-(resultdefender[0].gold*goldLooted))
let newgoldA=Math.floor(resultattacker[0].gold+goldfinallooted)
let finalDamage=Number(resulttargetQuery[0].damage)+damage

let currentTime= new Date().getTime()
let ReportA = { 
    sendFrom: this.data.username, 
    sendTo: this.data.username ,
    Date:currentTime,
    Subject:subjectA,
    title:titleA,
    Message:eventA,
    pic:resultevent[0].pic,
    type:"war",
    status:"unread",
    target:resulttargetQuery[0].owner,
    uunits:finalAttackerLoss,
    eunits:finalEnemyLoss,
    golde:goldfinallooted,
    golda:0,
    totalLossA:totalAttackerL,
    totalLossE:totalEnemyL
};
if(damage>0){ReportA.damage=finalDamage}

if(finalDamage<100){
var updateWorld= "UPDATE cwworld SET damage = '"+finalDamage+"' WHERE id ='"+resulttargetQuery[0].id+"'";
}else{
var updateWorld= "UPDATE cwworld SET damage ='0' ,owner='"+this.data.username+"',control='HUMAN',type=1 WHERE id ='"+resulttargetQuery[0].id+"'";
}
await database.query(updateWorld, (errupdateWorld, resultupdateWorld)=> { //start of update world
if(errupdateWorld) throw errupdateWorld
})


if(resulttargetQuery[0].control=="AI" || resulttargetQuery[0].control==""){
if(finalDamage>=100 && resultprovincesQueryDefender.length==1){
let deleteAi="Delete FROM cwai WHERE id ='"+resultdefender[0].id+"'";
 await database.query(deleteAi, (errdeleteOrder, resultdeleteOrder)=> {  //start of delete old record order
  })
}
}

if(finalDamage>=100 && defenderProvinces==1){
let mailGameOver = { 
  sendFrom: this.data.username, 
  sendTo:resulttargetQuery[0].owner ,
  Date:currentTime,
  Subject:"Game Over",
  Message:this.data.username+" Invaded Your Last Castle, You Lost, But You Can always start Again",
  pic:"../pics/mails/lost.jpg",
  type:"gameOver",
  status:"unread",
  control:"Human"}

if(resultprovincesQueryDefender[0].control=="HUMAN"){
var sql = "INSERT INTO cwmails Set ?";
await database.query(sql,mailGameOver ,(err, result)=>{
if(err) throw err;
})
}

}

var sql = "INSERT INTO cwreports Set ?";
await database.query(sql,ReportA ,(err, result)=>{
if(err) throw err;
})
let RevealData={
x:resulttargetQuery[0].x,
y:resulttargetQuery[0].y,
prestige:000,
troops:000,
owner:this.data.username,
target:resulttargetQuery[0].owner,
date:new Date().getTime(),
control:resulttargetQuery[0].control,
type:"full"
}
if(resultinquiryReveal.length<1){
RevealData.type="notFull"
var sqlReveal = "INSERT INTO reveal Set ?";
await database.query(sqlReveal,RevealData ,(err, result)=>{
if(err) throw err;
})
}
let ReportB = { 
  sendFrom: this.data.username, 
  sendTo:resulttargetQuery[0].owner ,
  subject:subjectE,
  title:titleE,
  Message:eventE,
  pic:resultevent[0].pic,
  type:"war",
  status:"unread",
  Date:currentTime,
  target:this.data.username,
  uunits:finalEnemyLoss,
  eunits:finalAttackerLoss,
  golde:0,
  golda:goldfinallooted,
  totalLossA:totalEnemyL,
  totalLossE:totalAttackerL};
if(damage>0){ReportB.damage=finalDamage}
if(resultprovincesQueryDefender[0].control=="HUMAN"){
var sql = "INSERT INTO cwreports Set ?";
await database.query(sql,ReportB ,(err, result)=>{
if(err) throw err;
})
}

if(finalDamage>=100){newPrestigeA=Number(resultattacker[0].prestige+100);  newPrestigeD=Number(resultattacker[0].prestige-100);}
var updateAttacker= "UPDATE cwplayers SET units = '"+attackerLeft+"' ,prestige='"+newPrestigeA+"',gold='"+newgoldA+"' WHERE id ='"+resultattacker[0].id+"'";

var updateDefender
if(resulttargetQuery[0].control=="AI" || resulttargetQuery[0].control==""){
updateDefender="UPDATE cwai SET units = '"+enemyLeft+"' ,prestige='"+newPrestigeD+"',gold='"+newgoldE+"' WHERE id ='"+resultdefender[0].id+"'";
}else{
updateDefender="UPDATE cwplayers SET units = '"+enemyLeft+"' ,prestige='"+newPrestigeD+"',gold='"+newgoldE+"' WHERE id ='"+resultdefender[0].id+"'";
}
await database.query(updateAttacker, (errupdateAttacker, resultupdateAttacker)=> { //start of update attacker
if(errupdateAttacker) throw errupdateAttacker
database.query(updateDefender, (errupdateDefender, resultupdateDefender)=> { //start of update attacker
if(errupdateDefender) throw errupdateDefender
       var mailnumbers="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND Status='unread'";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> {    
     var reportnumbers="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"' AND Status='unread'";
     database.query(reportnumbers, (errR, resultR)=> {
resolve({error:"Your Army Killed "+totalEnemyL+" And You Lost "+totalAttackerL+" Check Reports",screen:RevealData.type,owner:RevealData.target,Reports:resultR.length,Mails:resultM.length})
}) //end of reports number
})  //end of mails number
})
})





let alldata={
enemyLosses:totalEnemyL,
attackerLosses:totalAttackerL,
lootedgold:goldfinallooted,
attackerUnits:resultattacker[0].units,
TargetUnits:resultdefender[0].units,
attackeraftetWar:attackerLeft,
enemyAfterWar:enemyLeft,
mylosses:attackerLossL3,
enemylosses:enemyLossL3,
}
console.log(alldata)
})  //end of inquiry reveal
})  //end of choose random event query
} //end if defender query length>0
})  //end of defender query
})   //end of attacker provinces query
})   //end of deffender provinces query
}else{reject({error:"You Already Captured That province, Refresh Page",screen:"invalid"})}
}) // end of target query on map
}//end if power>5000
else{reject({error:"You Need At Least 5000 Men For Attack",screen:"invalid"})}
}   //end if attacker query length>0
else{  //if attacker not exist
reject({error:"404 error , please visit us later",screen:"invalid"})
}  //end of else attacker not exist
        }) //end of player query

}  //end if borders>0

else{    //if borders<=0
reject({error:"you not have borders with that province",screen:"invalid"})
}   //end if borders<=0

}) //end of promise
} //end of war function


//////////////////////////////////////////exploreupdate///////////////////////
WorldActions.prototype.ExploreUpdate=function(){  //start of function
  return new Promise(async (resolve,reject)=>{   //start of promise
var provincesNum="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
database.query(provincesNum, async (errprovincesNum, resultprovincesNum)=> {  //start of provinces query
  let price=Number(resultprovincesNum.length)*10000
var checkReveal="SELECT * FROM reveal WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"' AND owner='"+this.data.username+"'";
database.query(checkReveal, async (err, result)=> {  //start of checkReveal query
var player="SELECT * FROM cwplayers WHERE owner='"+this.data.username+"'";
database.query(player, async (errplayer, resultplayer)=> {  //start of player query
if(resultplayer[0].gold>=price){       //start if there is enough gold
var checkWorld="SELECT * FROM cwworld WHERE x ='"+result[0].x+"' AND y ='"+result[0].y+"'";
database.query(checkWorld, async (errworld, resultworld)=> {  //start of checkWorld query
var target
if(resultworld[0].control=="HUMAN"){target="SELECT * FROM cwplayers WHERE owner='"+resultworld[0].owner+"'";}
if(resultworld[0].control=="AI"){target="SELECT * FROM cwai WHERE owner='"+resultworld[0].owner+"'";}
database.query(target, async (errtarget, resulttarget)=> {  //start of target query
  var units=town(resulttarget[0].units)
  var totalUntis=Number(units[0])+Number(units[1])+Number(units[2])+Number(units[3])+Number(units[4])+Number(units[5])

let revealRecord={
prestige:resulttarget[0].prestige,
target:resultworld[0].owner,
troops:totalUntis,
owner:resultworld[0].owner,
date:new Date().getTime(),
x:result[0].x,
y:result[0].y,
control:resultworld[0].control,
type:"full"
}

var sqlupdate = "UPDATE reveal SET prestige='"+revealRecord.prestige+"',target='"+revealRecord.target+"',troops='"+revealRecord.troops+"',owner='"+resultplayer[0].owner+"',date='"+revealRecord.date+"',x='"+revealRecord.x+"',y='"+revealRecord.y+"',control='"+revealRecord.control+"' WHERE id ='"+result[0].id+"'";
database.query(sqlupdate, async (errupdate, resultupdate)=> {  //start of update query
  let finalGold=Number(resultplayer[0].gold)-Number(price)
  var playerupdate = "UPDATE cwplayers SET gold='"+finalGold+"' WHERE owner ='"+resultplayer[0].owner+"'";
database.query(playerupdate, async (errplayerupdate, resultplayerupdate)=> {  //start of update query
if(errupdate) throw errupdate;
  const boxData={
  info:1,
  owner:revealRecord.target,
  race:0,
  prestige:revealRecord.prestige,
  troops:totalUntis,
  provinces:resulttarget[0].provinces,
  price:price,
  x:revealRecord.x,
  y:revealRecord.y,
  control:revealRecord.control
  }
  resolve(boxData)
  })    //end of update player query
  })    //end of update query

})               //end of target query
})               //end of world query
}else{reject({error:"No Enough Gold,you need "+price})}   //end if no enough gold


})     //end of player query
})      //end of reveal query
}) //end of provinces number
    })  //end of promise
}  //end of function

//////////////////////////////////////////fortress///////////////////////
WorldActions.prototype.Fortress=function(){  //start of function
  return new Promise(async (resolve,reject)=>{   //start of promise
//get player data first
// get data from map
//if owner and price and no fort 
//build fort and update world
// update player gold
var player="SELECT * FROM cwplayers WHERE owner='"+this.data.username+"'";
database.query(player, async (errplayer, resultplayer)=> {  //start of player query
if(resultplayer[0].gold>=200000){     //if there is enough gold
var checkWorld="SELECT * FROM cwworld WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"'";
database.query(checkWorld, async (errworld, resultworld)=> {  //start of checkWorld query
if(resultworld[0].owner!=resultplayer[0].owner){reject({error:"You Can't Build Fort Here"})}
else if(resultworld[0].damage<0){reject({error:"You Already Have Fort"})}
else{
  let newDamage=Number(resultworld[0].damage)-100
  if(newDamage<-100){newDamage=-100}
  var worldupdate = "UPDATE cwworld SET damage='"+newDamage+"' WHERE owner ='"+resultplayer[0].owner+"'";
database.query(worldupdate, async (errworldupdate, resultworldupdate)=> {  //start of update world
  let newGold=Number(resultplayer[0].gold)-200000
  var playerupdate = "UPDATE cwplayers SET gold='"+newGold+"' WHERE owner ='"+resultplayer[0].owner+"'";
database.query(playerupdate, async (errplayerupdate, resultplayerupdate)=> {  //start of update player
resolve({error:"you constructed fortress",damage:newDamage})

})  //end of update player
})  //end of update world

}

})  //end of checkworld
}else{reject({error:"Not Have Enough Gold for Construct Fortress"})}   //if no enough gold

}) //end of player query



})   //end of promise
  }//end of function


//////////////////////////////////////////Rebuild///////////////////////
WorldActions.prototype.Rebuild=function(){  //start of function
  return new Promise(async (resolve,reject)=>{   //start of promise
//get player data first
// get data from map
//if owner and price and no fort 
//build fort and update world
// update player gold
var player="SELECT * FROM cwplayers WHERE owner='"+this.data.username+"'";
database.query(player, async (errplayer, resultplayer)=> {  //start of player query
if(resultplayer[0].gold>=10000){     //if there is enough gold
var checkWorld="SELECT * FROM cwworld WHERE x ='"+this.data.x+"' AND y ='"+this.data.y+"'";
database.query(checkWorld, async (errworld, resultworld)=> {  //start of checkWorld query
if(resultworld[0].owner!=resultplayer[0].owner){reject({error:"You Can't Rebuild that castle"})}
else if(resultworld[0].damage<=0){reject({error:"There is No Damage for Rebuild"})}
else{
  let newDamage=Number(resultworld[0].damage)-10
  if(newDamage<0){newDamage=0}
  var worldupdate = "UPDATE cwworld SET damage='"+newDamage+"' WHERE owner ='"+resultplayer[0].owner+"'";
database.query(worldupdate, async (errworldupdate, resultworldupdate)=> {  //start of update world
  let newGold=Number(resultplayer[0].gold)-10000
  var playerupdate = "UPDATE cwplayers SET gold='"+newGold+"' WHERE owner ='"+resultplayer[0].owner+"'";
database.query(playerupdate, async (errplayerupdate, resultplayerupdate)=> {  //start of update player
resolve({error:"you rebuild your castle",damage:newDamage})

})  //end of update player
})  //end of update world

}

})  //end of checkworld
}else{reject({error:"Not Have Enough Gold for Rebuild Your Castle"})}   //if no enough gold

}) //end of player query



})   //end of promise
  }//end of function



module.exports=WorldActions