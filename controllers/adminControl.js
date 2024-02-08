const Admin=require('../Models/Admin')
const jwt=require('jsonwebtoken')

function town(town){
let towndata=town.split("-");
return towndata;
}

function addComma(value){
let valuedata=value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return valuedata;
}



exports.login=function(req,res){
let user=new Admin(req.body)
user.login()
.then((result)=>{
        console.log(result)
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
let user=new Admin(req.body)
user.grabData()
.then((result)=>{

res.json({       

        totalmails:result.mails,
        totalreports:result.reports,
        mails:result.mNo,
        reports:result.rNo,
        lands:result.lands,
        players:result.players

      })
    })
.catch((error)=>{
res.json(error)
})
}

exports.apiMustBeLoggedIn=function(req,res){
let user=new Admin(req.body)
user.verify()
.then((result)=>{
res.json({tokenE:result.status,username:result.username})
})
}






