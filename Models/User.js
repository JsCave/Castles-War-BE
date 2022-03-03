const bcrypt=require("bcryptjs");
const validator=require("validator");
const database=require("../db.js");

let User=function(data){
  this.data=data,
  this.errors=[]
}

// clean inputs from user and remove any white spaces
User.prototype.clean=function(){
   if(typeof(this.data.username) !="string"){this.data.username=""}
   if(typeof(this.data.password) !="string"){this.data.password=""}
   if(typeof(this.data.email) !="string"){this.data.email=""}

   //get rid of bogus
   this.data={
   username:this.data.username.charAt(0).toUpperCase() + this.data.username.slice(1),
   password:this.data.password,
   email:this.data.email.trim().toLowerCase(),
   gold:1000,
   morale:100,
   x:0,
   y:0,
   influence:0,
   units:{
    swordman:0,
    spearman:0,
    axeman:0,
    archers:0,
    knights:0,
    elephants:0
   },
   buildings:{
    barracks:0,
    archery:0,
    knightsA:0,
    elephantsA:0,
    mine:0
   },
   last_morale:new Date().getTime()
   }
}

//check user inputs and sure it's valid in terms of min&max characters and email valid
User.prototype.validate=function(){
    return new Promise(async(resolve,reject)=>{
 if(this.data.username==""){this.errors.push("You Need To Enter Username, ")}
   if(this.data.username!="" && !validator.isAlphanumeric(this.data.username)){this.errors.push("Username should contain Numbers& Alpha only, ")}
   if(this.data.password==""){this.errors.push("You Need To Set Password, ")}
    if(!validator.isEmail(this.data.email)){this.errors.push("Please insert Correct Email, ")}
    if(this.data.username.length<4 || this.data.username.length>12){this.errors.push("Username should be between 4 to 12 characters, ")}
    if(this.data.password.length<6 || this.data.password.length>30){this.errors.push("Password should be between 6 to 30 characters, ")} 
resolve()
    })
}

//function process and insert new registration in database
User.prototype.register=function(){
    return new Promise(async (resolve,reject)=>{
      this.clean();
      await this.validate();
      if(!this.errors.length){
      //query for check if username or email used before
        await database.collection("customers").findOne({$or:[{username:this.data.username},{email:this.data.email}]}, async (err, result)=> {
         if(result){
         if(result.username) this.errors.push("Username Already Taken")
         if(result.email) this.errors.push("Email Already Registered")
         reject(this.errors)
         }else{
//record into database - using bcrypt for hash password
  await database.collection("world").aggregate([{$match:{owner:{$eq:''}}},{$sample:{size:1}}]).toArray(async(err, res)=>{
    this.data.x=res[0].x
    this.data.y=res[0].y
        let salt=bcrypt.genSaltSync(10)
        this.data.password=bcrypt.hashSync(this.data.password,salt)
        retreivedata=this.data
        let myquery = {x:this.data.x,y:this.data.y};
        let newvalues = { $set: {owner:this.data.username,type:1} };
        await database.collection("world").updateOne(myquery, newvalues)
        await database.collection("customers").insertOne(this.data, function(err, res) {
    if (err) throw err;
    resolve(retreivedata);
  }) //end of insert query
        }) //end of select random x,y aggregate query
        } //end of else
       }) //end of findone
     }else{
     reject(this.errors)
     }

   })
}

//Login
User.prototype.login=function(){
  return new Promise(async (resolve,reject)=>{
    this.clean();
    await database.collection("customers").findOne({username:this.data.username}, (err, result)=> {
     if (err) throw err;
     if(result && bcrypt.compareSync(this.data.password,result.password)) {
     resolve(result);
     }
     else  {reject("Please sure you entered info Correct")}
    });
  })
}

//update Status
User.prototype.updatestatus=function(){
  return new Promise(async (resolve,reject)=>{
    this.clean();
    await database.collection("customers").findOne({username:this.data.username}, async(err, result)=> {
     if (err) throw err;
     if(result) {
      let currenttime=new Date().getTime()
      let timepassed=Math.floor((currenttime-result.last_morale)/600000)
      let newmorale=result.morale+timepassed
      let newprestige=result.units.swordman+result.units.spearman+result.units.axeman+result.units.archers+result.units.knights+result.units.elephants+result.buildings.barracks+result.buildings.archery+result.buildings.knightsA+result.buildings.elephantsA+result.buildings.mine
        let myquery = {username:this.data.username};
        let newvalues
        let maxmorale
        await database.collection("world").find({owner:this.data.username}).toArray(async (err, result2)=> { //check land player control  
        let occupyLands=result2.length
        maxmorale=occupyLands*100
if(timepassed>0 && result.morale<maxmorale){
newvalues = { $set: {morale:newmorale,last_morale:currenttime,influence:newprestige} };
        }else{
newvalues = { $set: {influence:newprestige} };
        }       
await database.collection("customers").updateOne(myquery, newvalues)
})
        
await database.collection("reports").find({sendTo:this.data.username,status:'unread'}).toArray(async (err, reports)=> {
result.reports=reports.length
await database.collection("mails").find({sendTo:this.data.username,status:'unread'}).toArray(async (err, mails)=> {
result.mails=mails.length
resolve(result);
})// end of check emails
})//end of check reports
        

     
     }
     else  {reject("wrong at status system")}
    });
  })
}

//get gold

User.prototype.getGold=function(){
  return new Promise(async (resolve,reject)=>{
await database.collection("customers").findOne({username:this.data.username}, async(err, result)=> {
     if (err) throw err;
     if(result) {
      if(result.morale>0){
        let goldcollected=(result.buildings.mine*50)+1000
        let newgold=result.gold+(result.buildings.mine*50)+1000
        let newmorale=result.morale-1
let myquery = {username:this.data.username};
        let newvalues= { $set: {gold:newgold,morale:newmorale} };
        await database.collection("customers").updateOne(myquery, newvalues)

        resolve("You Spent 1 Morale and your workers extracted gold out mines and your soldiers collected taxes, You Collected " +goldcollected+" Piece of Gold")
      }else{
reject("you don't have enough morale")
      }
     }
   })
  })
}


//get Units

User.prototype.getUnits=function(){
  return new Promise(async (resolve,reject)=>{
await database.collection("customers").findOne({username:this.data.username}, async(err, result)=> {
     if (err) throw err;
     if(result) {
      if(result.morale>0){
        let upunits={swordman:result.units.swordman+1+(1*result.buildings.barracks),spearman:result.units.spearman+(1*result.buildings.barracks),axeman:result.units.axeman+(1*result.buildings.barracks),archers:result.units.archers+(1*result.buildings.archery),knights:result.units.knights+(1*result.buildings.knightsA),elephants:result.units.elephants+(1*result.buildings.elephantsA)}
        let newmorale=result.morale-1
        let totalRecruited=(1+(3*result.buildings.barracks))+(1*result.buildings.archery)+(1*result.buildings.knightsA)+(1*result.buildings.elephantsA)
        let newprestige=result.influence+totalRecruited
let myquery = {username:this.data.username};
        let newvalues= { $set: {units:upunits,morale:newmorale,influence:newprestige} };
        await database.collection("customers").updateOne(myquery, newvalues)

        resolve("You Spent 1 Morale And You Recruited "+totalRecruited+" Soldier & Warrior At Your Empire")
      }else{
reject("you don't have enough morale")
      }
     }
   })
  })
}

//Players

User.prototype.players=function(){
  return new Promise(async (resolve,reject)=>{
await database.collection("customers").find({username:{$ne:this.data.username}}).toArray((err, result)=> {
     if (err) throw err;
     resolve(result)
   })
  })
}

User.prototype.playersearch=function(){
  return new Promise(async (resolve,reject)=>{
await database.collection("customers").findOne({username:this.data.target},(err, result)=> {
     if (err) throw err;
     resolve(result)
   })
  })
}


module.exports=User