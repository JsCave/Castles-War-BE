const dotenv = require("dotenv")
dotenv.config()



var MongoClient = require('mongodb').MongoClient;
var url = process.env.CONNECTIONSTRING;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ReactCourse");
  module.exports = dbo
const app = require("./app")
 app.listen(process.env.PORT)

  });
