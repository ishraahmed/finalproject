var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;

router.post("/addForm",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        formData=req.body; 
        dbo.collection("forms").insertOne(formData, function(err, res) {
          if (err) {
            console.log(err);
            res1.send({inserted:0});
          }
        else
          res1.send({inserted:1});
        });


     
        
       });
       
  }); 
  router.post("/getForm",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        dbo.collection("forms").find({},{projection:{ _id: 0 }}).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result });
          });   
       });
       
  }); 
  module.exports = router;