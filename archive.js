//Grab Data
/*
User.prototype.grabData=function(){
  return new Promise(async (resolve,reject)=>{
         var sql2="SELECT * FROM cwplayers WHERE owner ='"+this.data.username+"'";
    database.query(sql2, (err2, result2)=> {
      //update Morale
      let currentTime=new Date().getTime()
      let timePassed=Math.floor((((currentTime-result2[0].last_morale)/1000)/60)/12)
      if(timePassed>0){
       let newmoraleamount=timePassed+result2[0].morale
      if(newmoraleamount>100){newmoraleamount=100}
     var updateMorale = "UPDATE cwplayers SET morale = '"+newmoraleamount+"' , last_morale='"+currentTime+"' WHERE owner ='"+this.data.username+"'";
     database.query(updateMorale, (errupdateMorale, resultupdateMorale)=> {
       result2[0].morale=newmoraleamount
     })

     } //end of update Morale

      if(result2[0].event==0){
     var mailnumbers="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND Status='unread'";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> {    
     var reportnumbers="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"' AND Status='unread'";
     database.query(reportnumbers, (errR, resultR)=> {
      var Lands="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
     database.query(Lands, (errLands, resultLands)=> {
     result2[0].mNo=resultM.length
     result2[0].rNo=resultR.length
     result2[0].lands=resultLands.length

      result2[0].title="Welcome My Liege"
      result2[0].pic="pics/city.jpg"
      result2[0].subject="Your Empire Is Waiting For Your Orders"

      resolve(result2[0])
      }) //end of check player lands
     }) //end of get reports numbers
     }) //end of get mails numbers

      }else{
        var type=result2[0].event.includes('E')
        var matches = result2[0].event.match(/(\d+)/);
        if(type){var sql3="SELECT * FROM cweconomy WHERE id ='"+matches[0]+"'";}else{
         var sql3="SELECT * FROM cwmilitary WHERE id ='"+matches[0]+"'";
        }
    database.query(sql3, (err3, result3)=> {
     var mailnumbers="SELECT * FROM cwmails WHERE sendTo ='"+this.data.username+"' AND Status='unread'";   //start of get emails numbers
     database.query(mailnumbers, (errM, resultM)=> {    
     var reportnumbers="SELECT * FROM cwreports WHERE sendTo ='"+this.data.username+"' AND Status='unread'";
     database.query(reportnumbers, (errR, resultR)=> {
     var Lands="SELECT * FROM cwworld WHERE owner ='"+this.data.username+"'";
     database.query(Lands, (errLands, resultLands)=> {
     result2[0].mNo=resultM.length
     result2[0].rNo=resultR.length
     result2[0].lands=resultLands.length
      result2[0].title=result3[0].Subject
      result2[0].pic=result3[0].pic
      result2[0].subject=result3[0].Event
      resolve(result2[0])
     }) //end of check player lands
     }) //end of get reports numbers
     }) //end of get mails numbers
      
    })
}



})   //end of sql2
     
    
    
  })  //end of promise
}