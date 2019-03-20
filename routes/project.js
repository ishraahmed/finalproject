var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;


router.post("/getProjects",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        if(req.body['username']=="admin"){
          dbo.collection("projects").find({ "status": req.body['status'] }).toArray(function(error, result){
            if (err) throw err;
            console.log(result);
            res1.send({'result':result});
          });
        }
        else{
        dbo.collection('Emp').findOne({'username':req.body['username']}, function(err, result) {
          if (err) throw err;
          
          if(result['Designation']=="manager" || result['Designation'] == "employee"){
            dbo.collection("projects").find({ "status": req.body['status'] , $or: [ { Manager : req.body['username'] }, { team : {$elemMatch: {username:req.body['username']}} } ]}).toArray(function(error, result){
              if (err) throw err;
              console.log(result);
              res1.send({'result':result});
            });
          }
          else{
            console.log("sdfsdfdss");
            dbo.collection("projects").find({ "status": req.body['status'] }).toArray(function(error, result){
              if (err) throw err;
              console.log(result);
              res1.send({'result':result});
            });
          }
        });
      }
        

      });
  });

 

       
       router.post("/projectStatusChange",function(req,res1){ 
        console.log("update");    
        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("S_E_E");
            userStoryData=req.body;
            
            console.log(userStoryData);
            var myquery = { _id: userStoryData['_id'] };
            var newvalues = { $set:{"status":userStoryData['status']}};
            dbo.collection("projects").updateOne(myquery, newvalues ,function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                res1.send({updated:1});
                              
                              });
                  
              
           });
            
          });

router.post("/addProject",function(req,res1){ 
    
  MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("S_E_E");
      projectData=req.body; 
      console.log(projectData);
      
      let coll = dbo.collection('projects');
      coll.count().then((count) => {
        projectData['_id']=count+1;
        dbo.collection("projects").insertOne(projectData, function(err, res) {
          if (err) throw err;
          
          res1.send({inserted:1});
        });
      });

      
   
      
     });
     
}); 

router.post("/getManagers",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        dbo.collection("Emp").find({ "Designation": "manager" }).toArray(function(error, result){
          if (err) throw err;
          console.log(result);
          res1.send({'result':result});
        });

      });
  });

  router.get("/getSkills", function(req,res1){

   MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        // console.log (dbo.collection("Emp").distinct("skills"));
        // res1.send (dbo.collection("Emp").distinct("skills"));
        dbo.collection("Emp").distinct('skills', function(err, docs) {
          if (err) throw err;
          console.log(docs);
          res1.send({'result':docs});
        });
        // dbo.collection("Emp").find().distinct("skills").toArray(function(error, result){
        //   if (err) throw err;
        //   console.log(result);
        //   res1.send({'result':result});
        // });

      });
    });

    router.get("/getDomain", function(req,res1){

      MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
           if (err) throw err;
           var dbo = db.db("S_E_E");
           // console.log (dbo.collection("Emp").distinct("skills"));
           // res1.send (dbo.collection("Emp").distinct("skills"));
           dbo.collection("Emp").distinct('domain', function(err, docs) {
             if (err) throw err;
             console.log(docs);
             res1.send({'result':docs});
           });
           // dbo.collection("Emp").find().distinct("skills").toArray(function(error, result){
           //   if (err) throw err;
           //   console.log(result);
           //   res1.send({'result':result});
           // });
   
         });
       });


       router.post("/searchEmployeesOnSkill", function(req,res1){

        MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
             if (err) throw err;
             var dbo = db.db("S_E_E");
             skill=req.body['skill'];
             console.log(req.body);
             console.log(skill);
             dbo.collection("Emp").find({ "skills": skill }).toArray(function(error, result){
              if (err) throw error;
              console.log(result);
              res1.send({'result':result});
            });
                 
           });
         });
        
      
         router.post("/searchEmployeesOnDomain", function(req,res1){

          MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
               if (err) throw err;
               var dbo = db.db("S_E_E");
               domain=req.body['domain'];
               console.log(req.body);
               console.log(domain);
               dbo.collection("Emp").find({ "domain": domain}).toArray(function(error, result){
                if (err) throw error;
                console.log(result);
                res1.send({'result':result});
              });
                   
             });
           });

           router.post("/getProject", function(req,res1){

            MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
                 if (err) throw err;
                 var dbo = db.db("S_E_E");
                project_id=parseInt( req.body['_id']);
                 
                 dbo.collection("projects").find({ "_id": project_id}).toArray(function(error, result){
                  if (err) throw error;
                  console.log(result);
                  res1.send({'result':result});
                });
                     
               });
             });

             router.post("/updateProject",function(req,res1){ 
              console.log("update");    
              MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("S_E_E");
                  userStoryData=req.body;
                  var project_id=parseInt( userStoryData['_id']);
                  console.log(userStoryData);
                  delete userStoryData['_id']
                  var myquery = { _id: project_id};
                  var newvalues = { $set:userStoryData};
                  dbo.collection("projects").updateOne(myquery, newvalues,function(err, res) {
                                      if (err) throw err;
                                      console.log("1 document updated");
                                      res1.send({updated:1});
                                      db.close();
                                    });
                        
                    
                 });
                  
                 });


module.exports = router;