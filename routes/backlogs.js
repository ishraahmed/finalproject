var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;

router.post("/saveSprint",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];

        var countt=0;
        let coll = dbo.collection('sprints');
coll.find({'project_id':project_id}).count().then((count) => {
  countt=count;
    console.log("jj"+ count);
    console.log(countt);
  sprintData['sprint_id']= countt+1;
        dbo.collection("sprints").insertOne(sprintData, function(err, res) {
          if (err) {
            console.log(err);
            res1.send({inserted:0});
          }
        else
          res1.send({inserted:1});
        });
});

     
        
       });
       
  }); 


  router.post("/getSprints",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
console.log("d");
        dbo.collection("sprints").find({'project_id':project_id}).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result });
          });   
       });
       
  }); 

  router.post("/getTask",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        us_id=sprintData['us_id'];
        task_id=sprintData['task_id'];
        console.log(sprintData);
        dbo.collection("tasks").find({'project_id':project_id,'us_id':us_id,'task_id':task_id}).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result });
          });   
       });
       
  }); 

  router.post("/getBug",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        us_id=sprintData['us_id'];
        task_id=sprintData['task_id'];
        console.log(sprintData);
        dbo.collection("Bugs").find(sprintData).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result });
          });   
       });
       
  }); 

  router.post("/getTasks",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        us_id=sprintData['us_id'];
        task_id=sprintData['task_id'];
        console.log(sprintData);
        dbo.collection("tasks").find({'project_id':project_id,state: { $ne: "deleted" }}).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result });
          });   
       });
       
  }); 


  
router.post("/getUserstoryTasks",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        project_id=req.body['project_id'];
        dbo.collection('User_Stories').aggregate([
          { $lookup:
             {
               from: 'tasks',
               localField: 'us_id',
               foreignField: 'us_id',
               as: 'tasks'
             }
           },
           {
            $match:{
                "project_id": project_id,
                "state": { $ne: "deleted" }
            }
          }
          ]).toArray(function(err, res) {
          if (err) throw err;
          res1.send({'result':res});
          console.log(JSON.stringify(res));
          db.close();
        });
      });

});

  
router.post("/getSprintUserstoryTasks",function(req,res1){  
  MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("S_E_E");
      project_id=req.body['project_id'];
      sprint=req.body['sprint'];
      dbo.collection('User_Stories').aggregate([
        { $lookup:
           {
             from: 'tasks',
             localField: 'us_id',
             foreignField: 'us_id',
             as: 'tasks'
           }
         },
         {
          $match:{
              "project_id": project_id,
              "iteration": sprint,
              "state": {$ne:'deleted'}
              // "tasks": { $elemMatch: { "Tstate" :{$ne:'deleted'}} } 
              
           
          }
       }
        ]).toArray(function(err, res) {
        if (err) throw err;
        res1.send({'result':res});
        console.log(JSON.stringify(res));
        db.close();
      });
    });

});


  router.post("/saveTask",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        us_id= sprintData['us_id'];
        
        var countt=0;
        let coll = dbo.collection('tasks');
coll.find({'project_id':project_id}).count().then((count) => {
  countt=count;
    console.log("jj"+ count);
    console.log(countt);
  sprintData['task_id']= countt+1;
  var t={'task_id':sprintData['task_id'],'task_title':sprintData['Ttitle']};
        dbo.collection("tasks").insertOne(sprintData, function(err, res) {
          if (err) {
            console.log(err);
            res1.send({inserted:0});
          }
        else{
          res1.send({inserted:1});
        }
  
        });
});

     
        
       });
       
  }); 

  router.post("/saveBug",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        let coll = dbo.collection('Bugs');
coll.find({'project_id':project_id}).count().then((count) => {
  sprintData['bug_id']= count+1;
        dbo.collection("Bugs").insertOne(sprintData, function(err, res) {
          if (err) {
            console.log(err);
            res1.send({inserted:0});
          }
        else{
          res1.send({inserted:1});
        }
  
        });
});

     
        
       });
       
  }); 


  router.post("/getBugs",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        sprintData=req.body; 
        project_id=sprintData['project_id'];
        dbo.collection("Bugs").find({'project_id':project_id,state: { $ne: "deleted" }}).toArray(function(error, result){
          if (err) throw err;
          console.log(result);
          res1.send({'result':result });
        }); 
      
       });      
  }); 

  router.post("/updateTaskIteration",function(req,res1){ 
    console.log("update");    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        userStoryData=req.body;
        var us_id=parseInt(userStoryData['us_id']);
        var project_id=parseInt( userStoryData['project_id']);
        var task_id=parseInt( userStoryData['task_id']);
        var iteration=userStoryData['iteration'];
        console.log(userStoryData);
        var myquery = { project_id: project_id , us_id : us_id, task_id:task_id};
        var newvalues = { $set:{"iteration":iteration}};
        dbo.collection("tasks").updateOne(myquery, newvalues,function(err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            res1.send({updated:1});
                            db.close();
                          });
              
          
       });
        
       });


       router.post("/updateTask",function(req,res1){ 
        console.log("update");    
        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("S_E_E");
            userStoryData=req.body;
            var us_id=parseInt(userStoryData['us_id']);
            var project_id=parseInt( userStoryData['project_id']);
            var task_id=parseInt( userStoryData['task_id']);
            console.log(userStoryData);
            var myquery = { project_id: project_id , us_id : us_id, task_id:task_id};
            var newvalues = { $set:userStoryData};
            dbo.collection("tasks").updateOne(myquery, newvalues,function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                res1.send({updated:1});
                                db.close();
                              });
                  
              
           });
            
           });

           router.post("/editBug",function(req,res1){ 
            console.log("update");    
            MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
                if (err) throw err;
                var dbo = db.db("S_E_E");
                userStoryData=req.body;
                // var us_id=parseInt(userStoryData['us_id']);
                var project_id=parseInt( userStoryData['project_id']);
                var bug_id=parseInt( userStoryData['bug_id']);
                console.log(userStoryData);
                var myquery = { project_id: project_id , bug_id : bug_id};
                var newvalues = { $set:userStoryData};
                dbo.collection("Bugs").updateOne(myquery, newvalues,function(err, res) {
                                    if (err) throw err;
                                    console.log("1 document updated");
                                    res1.send({updated:1});
                                    db.close();
                                  });
                      
                  
               });
                
               });
       
       router.post("/deleteTask",function(req,res1){ 
        console.log("update");    
        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("S_E_E");
            userStoryData=req.body;
            var us_id=parseInt(userStoryData['us_id']);
            var project_id=parseInt( userStoryData['project_id']);
            var task_id=parseInt( userStoryData['task_id']);
            console.log(userStoryData);
            var myquery = { project_id: project_id , us_id : us_id, task_id:task_id};
            var newvalues = { $set:{"state":'deleted'}};
            dbo.collection("tasks").updateOne(myquery, newvalues,function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                res1.send({updated:1});
                                db.close();
                              });
                  
              
           });
            
           });

  module.exports = router;