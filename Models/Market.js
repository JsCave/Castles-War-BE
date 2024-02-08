const database=require("../db");
let Market=function(data){
this.data=data
}

function town(town){
let towndata=town.split("-");
return towndata;
}

Market.prototype.start=function(){
return new Promise((resolve,reject)=>{
    var sql="SELECT * FROM market WHERE id =1";
    database.query(sql, (err, result)=> {
        let avail=town(result[0].available)
        let prices=town(result[0].prices)
if(err) throw err;
resolve({swordAvail:avail[0],spearAvail:avail[1],axeAvail:avail[2],archerAvail:avail[3],knightAvail:avail[4],elephantAvail:avail[5],
swordPrice:prices[0],spearPrice:prices[1],axePrice:prices[2],archerPrice:prices[3],knightPrice:prices[4],elephantPrice:prices[5]
})
		})
})
}

Market.prototype.buy=function(){   //start of function
return new Promise((resolve,reject)=>{   //start of promise
    var provinces="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(provinces, (errprovinces, resultprovinces)=> {    //start of provinces
        if(resultprovinces.length>0){
    //get data from market
    //get data from player
    var sql="SELECT * FROM market WHERE id =1";
    database.query(sql, (err, result)=> {   //start of market query
if(err) throw err;
    var sqlPlayer="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sqlPlayer, (errplayer, resultplayer)=> {   //start of playerQuery
    let avail=town(result[0].available)
    let prices=town(result[0].prices)
    let units=town(resultplayer[0].units)
    let newAvail
    let newGold
    let newUnits
    let newPrestige
    let perm
if(this.data.type=="sword"){
if(resultplayer[0].gold<(Number(prices[0])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[0])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[0])*1000)
newAvail=(Number(avail[0])-1000)+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=(Number(units[0])+1000)+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.01)
perm=1
}
}
if(this.data.type=="spear"){
if(resultplayer[0].gold<(Number(prices[1])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[1])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[1])*1000)
newAvail=avail[0]+"-"+(Number(avail[1])-1000)+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+(Number(units[1])+1000)+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.01)
perm=1
}
}
if(this.data.type=="axe"){
if(resultplayer[0].gold<(Number(prices[2])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[2])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[2])*1000)
newAvail=avail[0]+"-"+avail[1]+"-"+(Number(avail[2])-1000)+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+(Number(units[2])+1000)+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.01)
perm=1
}
}
if(this.data.type=="archer"){
if(resultplayer[0].gold<(Number(prices[3])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[3])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[3])*1000)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+(Number(avail[3])-1000)+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+(Number(units[3])+1000)+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.02)
perm=1
}
}
if(this.data.type=="knight"){
if(resultplayer[0].gold<(Number(prices[4])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[4])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[4])*1000)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+(Number(avail[4])-1000)+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+(Number(units[4])+1000)+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.03)
perm=1
}
}
if(this.data.type=="elephant"){
if(resultplayer[0].gold<(Number(prices[5])*1000)){reject({error:"You Dont Have Enough Gold"})}
else if(Number(avail[5])<1000){reject({error:"There is No Enough Slaves To Buy"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(prices[5])*1000)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+(Number(avail[5])-1000)
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+(Number(units[5])+1000)
newPrestige=Number(resultplayer[0].prestige)+Math.ceil(1000*0.04)
perm=1
}
}

if(perm==1){ //start of perm
let availTown=town(newAvail)
let unitsTown=town(newUnits)

var updateMarket = "UPDATE market SET available='"+newAvail+"' WHERE id =1";
database.query(updateMarket, (errupdateMarket, resultupdateMarket)=> { //start of update market
var updatePlayer= "UPDATE cwplayers SET units='"+newUnits+"',prestige='"+newPrestige+"',gold='"+newGold+"' WHERE owner ='"+this.data.username+"'";
database.query(updatePlayer, (errupdatePlayer, resultupdatePlayer)=> { //start of update player
resolve({error:"You Added Slaves To Your Forces",balance:newGold,swordAvail:availTown[0],spearAvail:availTown[1],axeAvail:availTown[2],archerAvail:availTown[3],knightAvail:availTown[4],elephantAvail:availTown[5],
swordman:unitsTown[0],spearman:unitsTown[1],axeman:unitsTown[2],archer:unitsTown[3],knights:unitsTown[4],elephants:unitsTown[5]
})
}) //end of update player
}) //end of update market
} //end of perm
})   //end of player query
}) //end of market query
}else{reject({error:"You Lost War, Can't Take Action"})}
}) //end of provinces
        })  //end of promise
}   //end of function




Market.prototype.sell=function(){   //start of function
return new Promise((resolve,reject)=>{   //start of promise
        var provinces="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(provinces, (errprovinces, resultprovinces)=> {    //start of provinces
         if(resultprovinces.length>0){
    //get data from market
    //get data from player
    var sql="SELECT * FROM market WHERE id =1";
    database.query(sql, (err, result)=> {   //start of market query
if(err) throw err;
    var sqlPlayer="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sqlPlayer, (errplayer, resultplayer)=> {   //start of playerQuery
    let avail=town(result[0].available)
    let prices=town(result[0].prices)
    let units=town(resultplayer[0].units)
    let newAvail
    let newGold
    let newUnits
    let perm
    let newPrestige
if(this.data.type=="sword"){
if(Number(units[0]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[0])*250)
newAvail=(Number(avail[0])+250)+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=(Number(units[0])-250)+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.01)
perm=1
}
}
if(this.data.type=="spear"){
if(Number(units[1]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[1])*250)
newAvail=avail[0]+"-"+(Number(avail[1])+250)+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+(Number(units[1])-250)+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.01)
perm=1
}
}
if(this.data.type=="axe"){
if(Number(units[2]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[2])*250)
newAvail=avail[0]+"-"+avail[1]+"-"+(Number(avail[2])+250)+"-"+avail[3]+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+(Number(units[2])-250)+"-"+units[3]+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.01)
perm=1
}
}
if(this.data.type=="archer"){
if(Number(units[3]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[3])*250)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+(Number(avail[3])+250)+"-"+avail[4]+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+(Number(units[3])-250)+"-"+units[4]+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.02)
perm=1
}
}
if(this.data.type=="knight"){
if(Number(units[4]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[4])*250)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+(Number(avail[4])+250)+"-"+avail[5]
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+(Number(units[4])-250)+"-"+units[5]
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.03)
perm=1
}
}
if(this.data.type=="elephant"){
if(Number(units[5]<250)){reject({error:"Minimum To Sell Is 250 Units"})}
else{
newGold=Number(resultplayer[0].gold)+(Number(prices[5])*250)
newAvail=avail[0]+"-"+avail[1]+"-"+avail[2]+"-"+avail[3]+"-"+avail[4]+"-"+(Number(avail[5])+250)
newUnits=units[0]+"-"+units[1]+"-"+units[2]+"-"+units[3]+"-"+units[4]+"-"+(Number(units[5])-250)
newPrestige=Number(resultplayer[0].prestige)-Math.ceil(250*0.04)
perm=1
}
}

if(perm==1){ //start of perm
let availTown=town(newAvail)
let unitsTown=town(newUnits)
if(newPrestige<10){newPrestige=10}
var updateMarket = "UPDATE market SET available='"+newAvail+"' WHERE id =1";
database.query(updateMarket, (errupdateMarket, resultupdateMarket)=> { //start of update market
var updatePlayer= "UPDATE cwplayers SET units='"+newUnits+"',prestige='"+newPrestige+"',gold='"+newGold+"' WHERE owner ='"+this.data.username+"'";
database.query(updatePlayer, (errupdatePlayer, resultupdatePlayer)=> { //start of update player
resolve({error:"You Sold Your Men At Slave Market",balance:newGold,swordAvail:availTown[0],spearAvail:availTown[1],axeAvail:availTown[2],archerAvail:availTown[3],knightAvail:availTown[4],elephantAvail:availTown[5],
swordman:unitsTown[0],spearman:unitsTown[1],axeman:unitsTown[2],archer:unitsTown[3],knights:unitsTown[4],elephants:unitsTown[5]
})
}) //end of update player
}) //end of update market
} //end of perm
})   //end of player query
}) //end of market query
}else{reject({error:"You Lost War, Can't Take Action"})}
})  //end of provinces
        })  //end of promise
}   //end of function

/////////////////////////////////////////////////////////////////////////////////
Market.prototype.upgrade=function(){   //start of function
return new Promise((resolve,reject)=>{   //start of promise
    var provinces="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
    database.query(provinces, (errprovinces, resultprovinces)=> {    //start of provinces
        if(resultprovinces.length>0){
    //get data from market
    //get data from player
    var sql="SELECT * FROM market WHERE id =1";

    var sqlPlayer="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sqlPlayer, (errplayer, resultplayer)=> {   //start of playerQuery
    let tech=town(resultplayer[0].tech)
    let newGold
    let newTech
    let perm
if(this.data.type=="sword"){
if(resultplayer[0].gold<(Number(tech[0])*50000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[0])*50000)
newTech=(Number(tech[0])+1)+"-"+tech[1]+"-"+tech[2]+"-"+tech[3]+"-"+tech[4]+"-"+tech[5]
perm=1
}
}
if(this.data.type=="spear"){
if(resultplayer[0].gold<(Number(tech[1])*50000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[1])*50000)
newTech=tech[0]+"-"+(Number(tech[1])+1)+"-"+tech[2]+"-"+tech[3]+"-"+tech[4]+"-"+tech[5]
perm=1
}
}
if(this.data.type=="axe"){
if(resultplayer[0].gold<(Number(tech[2])*50000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[2])*50000)
newTech=tech[0]+"-"+tech[1]+"-"+(Number(tech[2])+1)+"-"+tech[3]+"-"+tech[4]+"-"+tech[5]
perm=1
}
}
if(this.data.type=="archer"){
if(resultplayer[0].gold<(Number(tech[3])*100000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[3])*100000)
newTech=tech[0]+"-"+tech[1]+"-"+tech[2]+"-"+(Number(tech[3])+1)+"-"+tech[4]+"-"+tech[5]
perm=1
}
}
if(this.data.type=="knight"){
if(resultplayer[0].gold<(Number(tech[4])*150000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[4])*150000)
newTech=tech[0]+"-"+tech[1]+"-"+tech[2]+"-"+tech[3]+"-"+(Number(tech[4])+1)+"-"+tech[5]
perm=1
}
}
if(this.data.type=="elephant"){
if(resultplayer[0].gold<(Number(tech[5])*200000)){reject({error:"You Dont Have Enough Gold"})}
else{
newGold=Number(resultplayer[0].gold)-(Number(tech[5])*1000)
newTech=tech[0]+"-"+tech[1]+"-"+tech[2]+"-"+tech[3]+"-"+tech[4]+"-"+(Number(tech[5])+1)
perm=1
}
}

if(perm==1){ //start of perm
let techTown=town(newTech)


var updatePlayer= "UPDATE cwplayers SET tech='"+newTech+"',gold='"+newGold+"' WHERE owner ='"+this.data.username+"'";
database.query(updatePlayer, (errupdatePlayer, resultupdatePlayer)=> { //start of update player
resolve({error:"Unit upgraded Succesfully",balance:newGold,
swordmantech:techTown[0],spearmantech:techTown[1],axemantech:techTown[2],archertech:techTown[3],knightstech:techTown[4],elephantstech:techTown[5]
})
}) //end of update player

} //end of perm
})   //end of player query

}else{reject({error:"You Lost War, Can't Take Action"})}
}) //end of provinces
        })  //end of promise
}   //end of function
///////////////////////////////////////////////////////////////////////////////////////
module.exports=Market