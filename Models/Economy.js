
const bcrypt=require("bcryptjs");
const validator=require("validator");
const database=require("../db.js");

function town(town){
let towndata=town.split("-");
return towndata;
}

let User=function(data){
  this.data=data,
  this.errors=[]
}




//get gold

User.prototype.getGold=function(){
  return new Promise(async (resolve,reject)=>{
    var sql="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql, (err, result)=> {
     if (err) throw err;
     if(result.length>0) {   //check if player record exist
      if(result[0].morale>0){   //if player have enough morale
        if(result[0].event>0){   //if player already have exist event
          //****
          var type=result[0].event.includes('E')
          var matches = result[0].event.match(/(\d+)/);
          if(type){var sql2="SELECT * FROM cweconomy WHERE id ='"+matches[0]+"'";}else{
          var sql2="SELECT * FROM cwmilitary WHERE id ='"+matches[0]+"'";
          }
      database.query(sql2, (err2, result2)=> {
        result2[0].title=result3[0].Subject
        result2[0].pic=result3[0].pic
        result2[0].subject=result3[0].Event
        result2[0].error="You Already Need To Decide that Matter First"
      resolve(result2[0])
    })
          //*****
        }else{
          //****
           var sql2="SELECT * FROM cweconomy ORDER BY RAND() LIMIT 1";
          database.query(sql2, (err2, result2)=> {
            //****
            if(result2[0].Linkto){
              newID=result2[0].id+"E"
              var sqlupdate = "UPDATE cwplayers SET event = '"+newID+"' WHERE owner ='"+this.data.username+"'";
              database.query(sqlupdate, (err3, result3)=> { //start of update
                      result2[0].title=result3[0].Subject
                       result2[0].pic=result3[0].pic
                       result2[0].subject=result3[0].Event
                   resolve(result2[0])
              }) //end of update  
          }else{

        let rand=Math.floor(Math.random()*350);
        if(rand>result[0].gold){rand=result[0].gold}
        let buildings=town(result[0].buildings)
        let newmorale=result[0].morale-1
        if(result2[0].Effect>0){eventEffect=rand*1}else{eventEffect=rand*-1}
        let goldcollected=(buildings[0]*50)+rand
        let newgold=result[0].gold+(buildings[0]*50)+rand
var sqlupdate = "UPDATE cwplayers SET gold = '"+newgold+"',morale='"+newmorale+"' WHERE owner ='"+this.data.username+"'";

database.query(sqlupdate, (err3, result3)=> { //start of update
if (err3) throw err3;
      result2[0].title=result2[0].Subject
      result2[0].subject=result2[0].Event+goldcollected
      result2[0].newgold=newgold
resolve(result2[0])
      }) //end of update
          }
          //****
    }) //end of select random event from economy

      }  //end if player morale>0
   //end check if there is already event or not
      }  //end if enough morale
else{    //if not enough morale
reject("you don't have enough morale")
     } //end if not enough morale
     }  //end of check if player exist
   })   //end of query for get player info
  })   //end of promise
}   //end of function