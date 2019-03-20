var express = require('express');
var app = express();
var bodyParser = require('body-parser');  
var MongoClient = require('mongodb').MongoClient;
var users = require('./routes/employee.js');
var userStory=require('./routes/userstory.js');
var project=require('./routes/project.js');
var backlogs=require('./routes/backlogs.js');
var login=require('./routes/login.js');
var form=require('./routes/form.js');


app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
}); 

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended:false}));  

app.use('/api/employee', users);
app.use('/api/userStory', userStory);
app.use('/api/project', project);
app.use('/api/backlog', backlogs);
app.use('/api/login', login);
app.use('/api/form', form);

module.exports=app;

MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("connected");
});


app.route('/').get(function(req, res1)
    {
     
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
              $and:[
                {"project_id": 1},
                {iteration:"sprint1"}
              ]
                
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


  var server = app.listen(8080, function() {});