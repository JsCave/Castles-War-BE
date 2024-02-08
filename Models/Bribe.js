const database=require("../db");
let crypto = require('crypto');
let Bribe=function(data){
this.data=data
}

function town(town){
let towndata=town.split("-");
return towndata;
}

function generateKashierOrderHash(order) {
  const mid = 'MID-19892-709'; //your merchant id
  const amount = order.amount; //eg: 22.00
  const currency = order.currency; //eg: "EGP"
  const orderId = order.merchantOrderId; //eg: 99
  const secret ="5257e5f9-05a3-44f1-aa36-5d601a02ae97";
  const path = `/?payment=${mid}.${orderId}.${amount}.${currency}`;
console.log(path)
  const hash = crypto.createHmac('sha256', secret).update(path).digest('hex');
  return hash;
}


Bribe.prototype.createHash=function(){
  return new Promise((resolve,reject)=>{
let order={
amount:20.00,
currency:"EGP",
merchantOrderId:99
}
const hash=generateKashierOrderHash(order)
console.log(hash)
resolve(hash)
})
}

//The Result Hash for /?payment=mid-0-1.99.20.EGP with secret 11111 should result 606a8a1307d64caf4e2e9bb724738f115a8972c27eccb2a8acd9194c357e4bec

module.exports=Bribe


