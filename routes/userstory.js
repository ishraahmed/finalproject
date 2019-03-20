var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;

  router.post("/updateUserStoryStatus",function(req,res1){ 
    console.log("update");    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        userStoryData=req.body;
        
        console.log(userStoryData);
        var myquery = { project_id: userStoryData['project_id'] , us_id : parseInt(userStoryData['us_id'])};
        var newvalues = { $set:{"state":userStoryData['state']}};
        dbo.collection("User_Stories").updateOne(myquery, { $set:{"state":userStoryData['state']}, $push: { state_history: userStoryData['state'] } },function(err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            // if(userStoryData['state']=='deleted'){
                              var myquery = { project_id: userStoryData['project_id'] , us_id : parseInt(userStoryData['us_id'])};
                              var newvalues = { $set:{"state":userStoryData['state']}};
                              dbo.collection("tasks").updateOne(myquery, { $set:{"state":userStoryData['state']}, $push: { state_history: userStoryData['state'] } },function(err, res) {
                                                  if (err) throw err;
                                                  console.log("1 document updated");
                                                  res1.send({updated:1});
                                                  db.close();
                                                });
                          //  }
                          });
              
          
       });
        
       });

       router.post("/editUserStory",function(req,res1){ 
        console.log("update");    
        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("S_E_E");
            userStoryData=req.body;            
            console.log(userStoryData);
            var myquery = { project_id: userStoryData['project_id'] , us_id : userStoryData['us_id']};
            var newvalues = { $set:{"state":userStoryData['state']}};
            dbo.collection("User_Stories").updateOne(myquery, { $set:userStoryData , $push: { state_history: userStoryData['state'] } },function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                res1.send({updated:1});
                                db.close();
                              });
                  
              
           });
            
           });

       router.post("/getSingleUserStory",function(req,res1){ 
        console.log("update");    
        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("S_E_E");
            userStoryData=req.body;
  
            console.log(req.body);
        dbo.collection("User_Stories").find({project_id:req.body['project_id'],us_id:parseInt(req.body['us_id'])}).toArray(function(error, result){
          if (error) throw err;
          console.log(result);
          res1.send({'result':result});
        });
           });
            
           });
      
  


router.post("/saveUserStory",function(req,res1){    
  MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("S_E_E");
      userStoryData=req.body['json']; 
      console.log(userStoryData);
      var history=[];
      history.push(userStoryData['state']);
      userStoryData['state_history']=history;
      let coll = dbo.collection('User_Stories');
      coll.find({'project_id':userStoryData['project_id']}).count().then((count) => {
        userStoryData['us_id']=count+1;
        dbo.collection("User_Stories").insertOne(userStoryData, function(err, res) {
          if (err) throw err;
          res1.send({inserted:1});
        });
      });
    
      
     
});
});
router.post("/getUserStory",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        console.log(req.body['project_id']);
        dbo.collection("User_Stories").find({project_id:req.body['project_id'],state: { $ne: "deleted" } }).toArray(function(error, result){
          if (error) throw err;
          dbo.collection("User_Stories").find({'project_id':req.body['project_id']}).count().then((count) => {
            
            res1.send({'result':result,'USCount':count});
          });
          
        });

      });
  });
  
  router.post("/getProjectEmployees",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        console.log("sfdsr"+req.body['project_id']);
        dbo.collection("projects").find({_id:req.body['project_id']},{"team":1}).toArray(function(error, result){
          if (error) throw err;
       
          if(result[0]!=undefined){
          console.log("serr"+JSON.stringify(result[0]['team']));
          res1.send({'result':result[0]['team']});
        }
        else{
          res1.send({'result':[]});
        }
        });

      });
  });


 router.post("/getProjectSprints",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        console.log("sfdsr"+req.body['project_id']);
        dbo.collection("sprints").find({project_id:req.body['project_id']}).toArray(function(error, result){
          if (error) throw err;
          console.log(result);
          res1.send({'result':result});
        });

      });
  });

  
  
  router.post("/checkprojectCred",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        project_id=req.body['project_id'];
        username=req.body['username'];
        dbo.collection('Emp').findOne({'username':req.body['username']}, function(err, result) {
          if (err) throw err;
          
          if(result['Designation']=="manager" || result['Designation'] == "employee"){
            dbo.collection("projects").find({_id:project_id , $or: [ { Manager : username }, { team : {$elemMatch: {username:username}} } ] } ).toArray(function(error, result){
              if (error) throw err;
              console.log(result);
              if(result.length>0){
                res1.send({'exists':1});
              }
              else{
                res1.send({'exists':0});
              }
             
            });
          }
          else if(result['Designation']=="admin"){
            dbo.collection("projects").find({_id:project_id  } ).toArray(function(error, result){
              if (error) throw err;
              console.log(result);
              if(result.length>0){
                res1.send({'exists':1});
              }
              else{
                res1.send({'exists':0});
              }
             
            });
          }
          });
        

      });
  });

  router.post("/updateUserStoryIteration",function(req,res1){ 
    console.log("update");    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        userStoryData=req.body;
        var us_id=parseInt(userStoryData['us_id']);
        var project_id=parseInt( userStoryData['project_id']);
        var iteration=userStoryData['iteration'];
        console.log(userStoryData);
        var myquery = { project_id: project_id , us_id : us_id};
        var newvalues = { $set:{"iteration":iteration}};
        dbo.collection("User_Stories").updateOne(myquery, newvalues,function(err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            res1.send({updated:1});
                            db.close();
                          });
              
          
       });
        
       });
  module.exports = router;