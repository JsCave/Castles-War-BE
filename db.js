const dotenv=require("dotenv");
dotenv.config();
const mysql=require("mysql");


var pool  = mysql.createPool({
  connectionLimit : 30,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : "cwv2"
});

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!
  const app=require("./app")
  app.listen(process.env.PORT,(req,res)=>{console.log('Connection success')})
  connection.release();
});


module.exports=pool