const database=require("../db");
const ObjectID = require('mongodb').ObjectID

let Units=function(data){
this.data=data
}

//update units
Units.prototype.updateUnits=function(){
return new Promise((resolve,reject)=>{
database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
if(!Number(this.data.uamount)){reject("please use number only")}else{
	let newunit
    let totalPrice
    let uamount=Number(this.data.uamount)
 if(this.data.type=="sword"){upunits={swordman:result.units.swordman+uamount,spearman:result.units.spearman,axeman:result.units.axeman,archers:result.units.archers,knights:result.units.knights,elephants:result.units.elephants}; totalPrice=500*this.data.uamount}
 if(this.data.type=="spear"){upunits={swordman:result.units.swordman,spearman:result.units.spearman+uamount,axeman:result.units.axeman,archers:result.units.archers,knights:result.units.knights,elephants:result.units.elephants}; totalPrice=1000*this.data.uamount}
 if(this.data.type=="axe"){upunits={swordman:result.units.swordman,spearman:result.units.spearman,axeman:result.units.axeman+uamount,archers:result.units.archers,knights:result.units.knights,elephants:result.units.elephants}; totalPrice=1500*this.data.uamount}
 if(this.data.type=="archer"){upunits={swordman:result.units.swordman,spearman:result.units.spearman,axeman:result.units.axeman,archers:result.units.archers+uamount,knights:result.units.knights,elephants:result.units.elephants}; totalPrice=2000*this.data.uamount}
 if(this.data.type=="knight"){upunits={swordman:result.units.swordman,spearman:result.units.spearman,axeman:result.units.axeman,archers:result.units.archers,knights:result.units.knights+uamount,elephants:result.units.elephants}; totalPrice=3000*this.data.uamount}
 if(this.data.type=="elephant"){upunits={swordman:result.units.swordman,spearman:result.units.spearman,axeman:result.units.axeman,archers:result.units.archers,knights:result.units.knights,elephants:result.units.elephants+uamount}; totalPrice=4000*this.data.uamount}


if(result.gold<totalPrice){reject("you don't have enough gold")}else{
let remainGold=result.gold-totalPrice
let myquery = {username:this.data.username};
let newvalues = { $set: {gold:remainGold,units:upunits} };
database.collection("customers").updateOne(myquery, newvalues)
resolve("you spent "+totalPrice+" and Recruited "+uamount+" "+this.data.type+" man")
}
}}
else{
reject("404 error , please visit us later")
}
		})
})
}

//////////////////////////////////////Aid//////////////////////////
Units.prototype.aid=function(){
return new Promise((resolve,reject)=>{
database.collection("customers").findOne({username:this.data.username}, async (err, result)=> {
if(err) throw err;
if(result.username){
if(typeof(this.data.units.swordman)!="number"||typeof(this.data.units.spearman)!="number"||typeof(this.data.units.axeman)!="number"||typeof(this.data.units.archers)!="number"||typeof(this.data.units.knights)!="number"||typeof(this.data.units.elephants)!="number"){reject("Use Numbers Only")}

else if(this.data.units.swordman<0||this.data.units.swordman>Math.floor(result.units.swordman*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else if(this.data.units.spearman<0||this.data.units.spearman>Math.floor(result.units.spearman*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else if(this.data.units.axeman<0||this.data.units.axeman>Math.floor(result.units.axeman*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else if(this.data.units.archers<0||this.data.units.archers>Math.floor(result.units.archers*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else if(this.data.units.knights<0||this.data.units.knights>Math.floor(result.units.knights*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else if(this.data.units.elephants<0||this.data.units.elephants>Math.floor(result.units.elephants*0.25)){reject("insert Valid Amount,you can only send Number that display at bottom of each units")}
else{
// update Sender Units
let upunitS={
swordman:result.units.swordman-this.data.units.swordman,
spearman:result.units.spearman-this.data.units.spearman,
axeman:result.units.axeman-this.data.units.axeman,
archers:result.units.archers-this.data.units.archers,
knights:result.units.knights-this.data.units.knights,
elephants:result.units.elephants-this.data.units.elephants
}  //end of update Sender Units

await database.collection("customers").findOne({username:this.data.emperor}, async (err2, result2)=> {
if(err2) throw err2;
if(result.username){
// update Reciever Units
let upunitR={
swordman:result2.units.swordman+this.data.units.swordman,
spearman:result2.units.spearman+this.data.units.spearman,
axeman:result2.units.axeman+this.data.units.axeman,
archers:result2.units.archers+this.data.units.archers,
knights:result2.units.knights+this.data.units.knights,
elephants:result2.units.elephants+this.data.units.elephants
}  //end of update Reciever Units

let totalAID=this.data.units.swordman+this.data.units.spearman+this.data.units.axeman+this.data.units.archers+this.data.units.knights+this.data.units.elephants;
let newPrestigeS=result.influence-totalAID
let newPrestigeR=result2.influence+totalAID

let myquery1 = {username:this.data.username};
let newvalues1 = { $set: {units:upunitS,influence:newPrestigeS} };
await database.collection("customers").updateOne(myquery1, newvalues1)

let myquery2 = {username:this.data.emperor};
let newvalues2 = { $set: {units:upunitR,influence:newPrestigeR} };
await database.collection("customers").updateOne(myquery2, newvalues2)

let currentTime= new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit',minute:'2-digit', second:'2-digit'}); // 08/19/2020 (month and day with two digits)

let subjectS="You Send Support To "+this.data.emperor
let subjectR=this.data.username+" Send Support to You"
let ReportS = { sendFrom: this.data.username, sendTo: this.data.username ,subject:subjectS,title:"You Send Reinforcement",type:"support",status:"unread",date:currentTime,target:this.data.emperor,units:this.data.units};
await database.collection("reports").insertOne(ReportS, function(err, res) {})
let ReportR = { sendFrom: this.data.username, sendTo: this.data.emperor ,subject:subjectR,title:"Reinforcement Arrived!",type:"support",status:"unread",date:currentTime,target:this.data.username,units:this.data.units};
await database.collection("reports").insertOne(ReportR, function(err, res) {})
resolve("Your Support Reach to Your Allies")
}else{reject("Please Try Again Later after login again")}})


} //end of else after check all
}
else{
reject("404 error , please visit us later")
}
                })
})
}



/////////////////////////////////////////war ///////////////////////
Units.prototype.war=function(){
return new Promise(async(resolve,reject)=>{
await database.collection("customers").findOne({username:this.data.username}, async (err, attacker)=> {
if(err) throw err;
if(attacker.username){
await database.collection("customers").findOne({username:this.data.target}, async (err, defender)=> {
if(err) throw err;
if(defender.username){
let attackerArmy={swordman:attacker.units.swordman,spearman:attacker.units.spearman,axeman:attacker.units.axeman,archers:attacker.units.archers,knights:attacker.units.knights,elephants:attacker.units.elephants}
let enemyArmy={swordman:defender.units.swordman,spearman:defender.units.spearman,axeman:defender.units.axeman,archers:defender.units.archers,knights:defender.units.knights,elephants:defender.units.elephants}

let attackerPower={swordman:attackerArmy.swordman*0.01,spearman:attackerArmy.spearman*0.02,axeman:attackerArmy.axeman*0.03,archers:attackerArmy.archers*0.04,knights:attackerArmy.knights*0.05,elephants:attackerArmy.elephants*0.06}
let enemyPower={swordman:enemyArmy.swordman*0.011,spearman:enemyArmy.spearman*0.016,axeman:enemyArmy.axeman*0.027,archers:enemyArmy.archers*0.038,knights:enemyArmy.knights*0.055,elephants:enemyArmy.elephants*0.058}

let attackerLossL1={
swordman:(attackerArmy.swordman-(attackerArmy.swordman-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
spearman:(attackerArmy.spearman-(attackerArmy.spearman-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers))),
axeman:(attackerArmy.axeman-(attackerArmy.axeman-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
archers:(attackerArmy.archers-(attackerArmy.archers-(enemyPower.swordman+enemyPower.spearman+enemyPower.axeman+enemyPower.archers+enemyPower.knights))),
knights:(attackerArmy.knights-(attackerArmy.knights-(enemyPower.spearman+enemyPower.archers+enemyPower.knights+enemyPower.elephants))),
elephants:(attackerArmy.elephants-(attackerArmy.elephants-(enemyPower.spearman+enemyPower.elephants)))
}

let enemyLossL1={
swordman:(enemyArmy.swordman-(enemyArmy.swordman-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
spearman:(enemyArmy.spearman-(enemyArmy.spearman-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers))),
axeman:(enemyArmy.axeman-(enemyArmy.axeman-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
archers:(enemyArmy.archers-(enemyArmy.archers-(attackerPower.swordman+attackerPower.spearman+attackerPower.axeman+attackerPower.archers+attackerPower.knights))),
knights:(enemyArmy.knights-(enemyArmy.knights-(attackerPower.spearman+attackerPower.archers+attackerPower.knights+attackerPower.elephants))),
elephants:(enemyArmy.elephants-(enemyArmy.elephants-(attackerPower.spearman+attackerPower.elephants)))
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

if(attackerLossL3.swordman>attackerArmy.swordman){attackerLossL3.swordman=attackerArmy.swordman}
if(attackerLossL3.swordman<0){attackerLossL3.swordman=0}
if(attackerLossL3.spearman>attackerArmy.spearman){attackerLossL3.spearman=attackerArmy.spearman}
if(attackerLossL3.spearman<0){attackerLossL3.spearman=0}
if(attackerLossL3.axeman>attackerArmy.axeman){attackerLossL3.axeman=attackerArmy.axeman}
if(attackerLossL3.axeman<0){attackerLossL3.axeman=0}
if(attackerLossL3.archers>attackerArmy.archers){attackerLossL3.archers=attackerArmy.archers}
if(attackerLossL3.archers<0){attackerLossL3.archers=0}
if(attackerLossL3.knights>attackerArmy.knights){attackerLossL3.knights=attackerArmy.knights}
if(attackerLossL3.knights<0){attackerLossL3.knights=0}
if(attackerLossL3.elephants>attackerArmy.elephants){attackerLossL3.elephants=attackerArmy.elephants}
if(attackerLossL3.elephants<0){attackerLossL3.elephants=0}


if(enemyLossL3.swordman>enemyArmy.swordman){enemyLossL3.swordman=enemyArmy.swordman}
if(enemyLossL3.swordman<0){enemyLossL3.swordman=0}
if(enemyLossL3.spearman>enemyArmy.spearman){enemyLossL3.spearman=enemyArmy.spearman}
if(enemyLossL3.spearman<0){enemyLossL3.spearman=0}
if(enemyLossL3.axeman>enemyArmy.axeman){enemyLossL3.axeman=enemyArmy.axeman}
if(enemyLossL3.axeman<0){enemyLossL3.axeman=0}
if(enemyLossL3.archers>enemyArmy.archers){enemyLossL3.archers=enemyArmy.archers}
if(enemyLossL3.archers<0){enemyLossL3.archers=0}
if(enemyLossL3.knights>enemyArmy.knights){enemyLossL3.knights=enemyArmy.knights}
if(enemyLossL3.knights<0){enemyLossL3.knights=0}
if(enemyLossL3.elephants>enemyArmy.elephants){enemyLossL3.elephants=enemyArmy.elephants}
if(enemyLossL3.elephants<0){enemyLossL3.elephants=0}

let attackerLeft={
swordman:attackerArmy.swordman-attackerLossL3.swordman,
spearman:attackerArmy.spearman-attackerLossL3.spearman,
axeman:attackerArmy.axeman-attackerLossL3.axeman,
archers:attackerArmy.archers-attackerLossL3.archers,
knights:attackerArmy.knights-attackerLossL3.knights,
elephants:attackerArmy.elephants-attackerLossL3.elephants
}

let enemyLeft={
swordman:enemyArmy.swordman-enemyLossL3.swordman,
spearman:enemyArmy.spearman-enemyLossL3.spearman,
axeman:enemyArmy.axeman-enemyLossL3.axeman,
archers:enemyArmy.archers-enemyLossL3.archers,
knights:enemyArmy.knights-enemyLossL3.knights,
elephants:enemyArmy.elephants-enemyLossL3.elephants
}

let totalAttackerL=attackerLossL3.swordman+attackerLossL3.spearman+attackerLossL3.axeman+attackerLossL3.archers+attackerLossL3.knights+attackerLossL3.elephants
let totalEnemyL=enemyLossL3.swordman+enemyLossL3.spearman+enemyLossL3.axeman+enemyLossL3.archers+enemyLossL3.knights+enemyLossL3.elephants
let newPrestigeA=Number(attacker.influence-totalAttackerL)
let newPrestigeD=Number(defender.influence-totalEnemyL)
let subjectE=this.data.username+" Attacked You"
let subjectA="You Attacked "+this.data.target

let titleE
let titleA
let eventA
let eventE
let chooseEvent=Math.floor(Math.random() * 4);
let goldLooted

let randomEventW=["Your Cavalries Surrounded Enemy Infantry And Slaughtered Them",
"Traitor Helped You Against Enemy,they Surprised with your attack",
"Enemy forces surrender front your great Army,you bombarded them heavy with your catapults",
"Enemy Lost Front Your Advanced Troops and Weapons"]

let randomEventL=["Enemy Knights Surrounded Your Infantry And Slaughtered Them",
"There is Traitor Helped Enemy Troops to surprise your troops and cause heavy losses to you",
"Your Weak Forces Couldn't Stand Against Enemy Seige And Catapults",
"Enemy Have More Advanced Troops and Weapons that you defeated front of it"]

if(totalAttackerL>=totalEnemyL){eventA=randomEventL[chooseEvent]; titleA="You Lost The Battle"; titleE="You Are Victorious"; eventE=randomEventW[chooseEvent]; goldLooted=0.05}

if(totalAttackerL<totalEnemyL){eventA=randomEventW[chooseEvent];titleA="You Are Victorious"; titleE="You Lost The Battle"; eventE=randomEventL[chooseEvent]; goldLooted=0.05}
let goldfinallooted=Math.floor(defender.gold*0.05)
let newgoldE=Math.floor(defender.gold-(defender.gold*goldLooted))
let newgoldA=Math.floor(attacker.gold+newgoldE)

let currentTime= new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit',minute:'2-digit', second:'2-digit'}); // 08/19/2020 (month and day with two digits)
let ReportA = { sendFrom: this.data.username, sendTo: this.data.username ,subject:subjectA,title:titleA,event:eventA,pic:chooseEvent,type:"war",status:"unread",date:currentTime,target:this.data.target,uunits:attackerLossL3,eunits:enemyLossL3,golde:goldfinallooted,golda:0,totalLossA:totalAttackerL,totalLossE:totalEnemyL};
await database.collection("reports").insertOne(ReportA, function(err, res) {})

let ReportB = { sendFrom: this.data.username, sendTo: this.data.target ,subject:subjectE,title:titleE,event:eventE,pic:chooseEvent,type:"war",status:"unread",date:currentTime,target:this.data.username,uunits:enemyLossL3,eunits:attackerLossL3,golde:0,golda:goldfinallooted,totalLossA:totalEnemyL,totalLossE:totalAttackerL};
await database.collection("reports").insertOne(ReportB, function(err, res) {})

let myquery1 = {username:this.data.username};
let newvalues1 = { $set: {units:attackerLeft,influence:newPrestigeA,gold:newgoldA} };
await database.collection("customers").updateOne(myquery1, newvalues1)

let myquery2 = {username:this.data.target};
let newvalues2 = { $set: {units:enemyLeft,influence:newPrestigeD,gold:newgoldE} };
await database.collection("customers").updateOne(myquery2, newvalues2)

resolve("Your Army Killed "+totalEnemyL+" And You Lost "+totalAttackerL)
}})

}
else{
reject("404 error , please visit us later")
}  //end of else result.username
        }) //end of mongo result query
}) //end of promise
} //end of war function

module.exports=Units