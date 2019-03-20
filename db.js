const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = "mongodb://localhost:27017/S_E_E";
let mongodb;

function connect(){
    let col;
mongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("S_E_E");
    this.col=dbo.collection('projects');
   
  });
  return col;
}
console.log(connect());
// function connect(){
   
//     mongoClient.connect(mongoDbUrl, function (err, database) {
        
//         var db=database.db("S_E_E");
//         console.log(db);
//         mongodb = db;
//         return mongodb;
//         // callback();
//   });
//     // mongoClient.connect(mongoDbUrl, (err, db) => {
//     //     mongodb = db;
        
//     // });
// }
// function get(){
//      connect();
//     // console.log(mongodb);
//     return mongodb;
// }

// function close(){
//     mongodb.close();
// }

// module.exports = {
//     connect,
//     get,
//     close
// };
