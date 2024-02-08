const Provider=require('../Models/Providers')
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
let user=new Provider(req.body)
user.login()
.then((result)=>{

res.json({       
        token: result.token,
        username: result.owner,

      })
    })
.catch((error)=>{
res.json(error)
})
}










