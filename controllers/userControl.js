const User=require('../Models/User')
const jwt=require('jsonwebtoken')

exports.connection=function(req,res){

res.send("connection Succedd")


}

exports.register=function(req,res){
  let user=new User(req.body)
  user.register()
.then((result)=>{
      res.json({
        token: jwt.sign({username:result.username},process.env.JWTSECRET,{expiresIn:'1d'}),
        username: result.username,
                gold: result.gold,
        morale: result.morale,
        x: result.x,
        y: result.y,
        influence: result.influence,
        units:JSON.stringify(result.units),
        buildings:JSON.stringify(result.buildings),
        last_morale:result.last_morale
      })
})
.catch((error)=>{
res.json(error)
})
}


exports.apiMustBeLoggedIn=function(req,res,next){
try{
req.apiUser=jwt.verify(req.body.token,process.env.JWTSECRET)
res.json({tokenE:"true"})
}catch{
res.json({tokenE:"false"})
}
}

exports.login=function(req,res){
let user=new User(req.body)
user.login()
.then((result)=>{
res.json({       
        token: jwt.sign({username:user.data.username},process.env.JWTSECRET,{expiresIn:'1d'}),
        username: result.username,
        gold: result.gold,
        morale: result.morale,
        x: result.x,
        y: result.y,
        influence: result.influence,
        units:JSON.stringify(result.units),
        buildings:JSON.stringify(result.buildings),
        last_morale:result.last_morale
       
      })
    })
.catch((error)=>{
res.json(error)
})
}


exports.update=function(req,res){
let user=new User(req.body)
user.updatestatus()
.then((result)=>{
res.json({       
        gold: result.gold,
        morale: result.morale,
        influence: result.influence,
        units:JSON.stringify(result.units),
        buildings:JSON.stringify(result.buildings),
        last_morale:result.last_morale,
        reports:result.reports,
        mails:result.mails
       
      })
    })
.catch((error)=>{
res.json(error)
})
}

exports.getGold=function(req,res){
let user=new User(req.body)
user.getGold()
.then((result)=>{
res.json(result)
    })
.catch((error)=>{
res.json(error)
})
}

exports.getUnits=function(req,res){
let user=new User(req.body)
user.getUnits()
.then((result)=>{
res.json(result)
    })
.catch((error)=>{
res.json(error)
})
}


exports.players=function(req,res){
let user=new User(req.body)
user.players()
.then((result)=>{
res.json(result)
    })
.catch((error)=>{
res.json(error)
})
}

exports.playersearch=function(req,res){
let user=new User(req.body)
user.playersearch()
.then((result)=>{
res.json(result)
    })
.catch((error)=>{
res.json(error)
})
}

