const User=require('../Models/User')
const jwt=require('jsonwebtoken')

function town(town){
let towndata=town.split("-");
return towndata;
}

function addComma(value){
let valuedata=value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return valuedata;
}

exports.register=function(req,res){
  let user=new User(req.body)
  user.register()
.then((result)=>{
  console.log(result)
      res.json({
        token: result.token,
        username: result.username
      })
})
.catch((error)=>{
  console.log(error)
res.json(error)
})
}

exports.login=function(req,res){
let user=new User(req.body)
user.login()
.then((result)=>{
  /*var units=town(result.units)
  var buildings=town(result.buildings)*/
res.json({       
        token: result.token,
        username: result.owner,

      })
    })
.catch((error)=>{
res.json(error)
})
}

exports.grabData=function(req,res){
let user=new User(req.body)
user.grabData()
.then((result)=>{
  var units=town(result.units)
  var buildings=town(result.buildings)
  var votes=town(result.votes)
  var tech=town(result.tech)
  var gold=result.gold
res.json({       
        gold:gold,
        prestige:result.prestige,
        morale:result.morale,
        mails:result.mNo,
        reports:result.rNo,
        lands:result.lands,
        title:result.title,
        pic:result.pic,
        subject:result.subject,
        swordman:units[0],
        spearman:units[1],
        axeman:units[2],
        archer:units[3],
        knights:units[4],
        elephants:units[5],
        mines:buildings[0],
        barracks:buildings[1],
        archery:buildings[2],
        knightsAcademy:buildings[3],
        elephantsAc:buildings[4],
        provider:result.provider,
        votes:votes,
        swordmantech:tech[0],
        spearmantech:tech[1],
        axemantech:tech[2],
        archertech:tech[3],
        knightstech:tech[4],
        elephantstech:tech[5]        
      })
    })
.catch((error)=>{
res.json(error)
})
}

exports.apiMustBeLoggedIn=function(req,res){
let user=new User(req.body)
user.verify()
.then((result)=>{
res.json({tokenE:result.status,username:result.username})
})
}

exports.forget=function(req,res){
let user=new User(req.body)
user.Forget()
.then((result)=>{
res.json(result)
}).catch((error)=>{
res.json(error)
})
}

exports.reset=function(req,res){
let user=new User(req.body)
user.Reset()
.then((result)=>{
res.json(result)
}).catch((error)=>{
res.json(error)
})
}

exports.visitor=function(req,res){
let user=new User(req.body)
user.Visitor()
.then((result)=>{
res.json(result)
}).catch((error)=>{
res.json(error)
})
}


exports.getGold=function(req,res){
let user=new User(req.body)
user.getGold()
.then((result)=>{
  console.log(result)
  var gold=addComma(result.newgold)
res.json({       
        title:result.title,
        pic:result.pic,
        subject:result.subject,
        newgold:gold,
        newmorale:result.newmorale,
        error:result.error,
        acceptBtn:result.acceptBtn,
        rejectBtn:result.rejectBtn,
        prestige:result.prestige
      })
    })
.catch((error)=>{
res.json({error:error})
})
}

exports.getUnits=function(req,res){
let user=new User(req.body)
user.getUnits()
.then((result)=>{
  var units=town(result.newunits)
  //console.log(result)
res.json({       
        title:result.title,
        pic:result.pic,
        subject:result.Event,
        newmorale:result.newmorale,
        error:result.error,
        mails:result.mails,
        swordman:units[0],
        spearman:units[1],
        axeman:units[2],
        archer:units[3],
        knights:units[4],
        elephants:units[5],
        prestige:result.prestige
      })
    })
.catch((error)=>{
res.json({error:error})
})
}

