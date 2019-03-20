var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;

router.post("/Emplogin", function(req,res1){
MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true },function(err,db){
    if (err) throw err;
    var dbo = db.db("S_E_E");
    data=req.body;
    dbo.collection("Emp").find({'username':req.body['username'],'password':req.body['password']}).toArray(function(error, result){
        if (err) throw err;
        console.log(result);
        if(result.length==0){
            res1.send({'exists':0});
        }
        else{ 
        res1.send({'exists':1});
        }
       
      });
   
});
});

module.exports = router;