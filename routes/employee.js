var router = require('express').Router()
var MongoClient = require('mongodb').MongoClient;
const db = require('../db');
var nodemailer = require('nodemailer');
//var bodyParser = require('body-parser');  
// router.get('/getEmp', function(req, res, next) {
//     res.send("sa");
// })
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
port: 465,
secure: true,
  auth: {
    user: 'ishra.ahmed1997@gmail.com',
    pass: 'ishu222...'
  }
});

router.get("/getEmp",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        dbo.collection("Emp").find().toArray(function(error, result){
          if (err) throw err;
          console.log(result);
          res1.send({'result':result});
        });

      });
  });
  
  router.post("/getuser",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        console.log("h"+req.body['username']);
        dbo.collection("Emp").find({'username':req.body['username']}).toArray(function(error, result){
          if (err) throw err;
          console.log(result);
          res1.send({'result':result[0]});
        });

      });
  });

router.post("/searchEmp",function(req,res1){  
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        var search_by=req.body['searchBy'];
        var search_val="^"+req.body['search']+"$";
        if(search_by=="domain" || search_by=="skills"){
          var search_val=req.body['search'];
        }
        console.log(req.body['search']);
        var query = {};
        query[search_by] ={$regex: search_val, $options : 'i'};
        dbo.collection("Emp").find(query,{projection:{ _id: 0 }}).toArray(function(error, result){
          if (err) throw err;
          console.log(result);
          res1.send({'result':result});
        });

      });
  });
 
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


  router.post("/saveSingleEmployeeData",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        
        employeeData=JSON.parse(req.body[0]); 

        // var countt;
        let coll = dbo.collection('Emp');
coll.count().then((count) => {
  // countt=count;
    console.log(count);
    employeeData["_id"]=count+1;
    var fname=employeeData["Firstname"];
    var lname=employeeData["Lastname"];
    var username=fname[0]+"."+lname+(count+1).toString();
    var email=employeeData["email"];
    employeeData["username"]=username;
employeeData['password']=makeid();
    var msg='<h1>Welcome</h1> <p> username is </p> '+ username +'<p>password is</p>' + employeeData['password'];
    dbo.collection("Emp").insertOne(employeeData, function(err, res) {
      if (err) throw err;
      else{
        
        res1.send({inserted:1,username:username});
        var mailOptions = {
          from: 'ishra.ahmed1997@gmail.com',
          to: email,
          subject: 'Sending Email using Node.js',
          html: msg
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }    
      
    });
});
        console.log(employeeData);
        
       });
       
  }); 

  router.post("/saveMultipleEmployees",function(req,res1){ 
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        employeeData=req.body; 
        made=[];
        notMade=[];
        // var countt;
        let coll = dbo.collection('Emp');
coll.count().then((count) => {
  var id=count+1;
    console.log(count);
console.log(req.body);
for(var i=0; i<employeeData.length;i++){
  console.log("cout"+ id);
  emp=employeeData[i];
  emp['_id']=id;
  var fname=emp["Firstname"];
  var lname=emp["Lastname"];
  var username=fname[0]+"."+lname+(id).toString();
  var email=emp["email"];
  emp["username"]=username;
  pass=makeid();
  var msg='<h1>Welcome</h1> <p> username is </p> '+ username +'<p>password is</p>' + pass;
  emp['password']=pass;
  id=id+1;
  if(i == employeeData.length - 1){
    res1.send({'inserted':1});
  }
  dbo.collection("Emp").insertOne(emp, function(err, res) {
    if (err) throw err;
    else{       
      made.push(emp);
     
      var mailOptions = {
        from: 'ishra.ahmed1997@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        html: msg
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }    
    
  });
}
   
});
        
         
       });
      //  res1.send({inserted:1});
  }); 

  router.post("/saveEmployeeData",function(req,res){ 
    console.log(req.body[0].length);
    exists=[];
        made=[];
       var sendData={};
       sendData={"exists":this.exists , "made":this.made};
    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        org_name=req.body[1];
        employeeData=req.body[0]; //req.body[0][0] will be first json obj
        employeeData_count=req.body[0].length;

        

        dbo.collection("Employees").find({_id:org_name}).limit(1).toArray(function(error, result){
          if (err) throw error;
          else if(result[0]== null){
            console.log("not found");
          }
          else{
          console.log("found");
          dbemployeelength=result[0]['emp'].length;
          console.log(dbemployeelength);
          // console.log(result[0]['emp'][0]);
          // console.log(result[0]['emp'][0]['email']);
          var present=0;
          for(i=0;i<employeeData_count;i++){
            var p=false;
             for(j=0;j<dbemployeelength;j++){
              console.log(req.body[0][i]['email']+"  "+result[0]['emp'][j]['email']);
               if(req.body[0][i]['email']==result[0]['emp'][j]['email']){
                 present++;
                 exists.push(req.body[0][i]);
                 console.log( "ds"+exists.length);
                 p=true;
console.log("presnt");
break;
               }
              }
              if(p==false){
  dbo.collection("Employees").updateOne(
                  { _id: org_name },
                  { $push: { emp: req.body[0][i] } 
                });
                made.push(req.body[0][i]);
              }

          }
          console.log(present);
          }
          res.send(sendData);
        });
       
        
     
        
       });
       
      
  }); 
 
  router.post("/updateEmployeeProfile",function(req,res1){ 
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        employeeData=req.body;
        var username=employeeData['username'];
        delete employeeData['username']; 
        console.log(employeeData);
        var myquery = { username: username};
        var newval=employeeData;
       
        dbo.collection("Emp").updateOne(myquery,{$set:newval}, function(err, res) {
          if (err){
            res1.send({inserted:0});
            console.log(err);
          }
          else{
            res1.send({inserted:1});
          console.log("1 document updated");
          db.close();
        }
        });

        
       });
       
      
  });   
  router.post("/updateEmployeeData",function(req,res1){ 
    console.log("update");    
    MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("S_E_E");
        employeeData=JSON.parse(req.body[0]);
        var username=employeeData['username'];
        console.log(employeeData);
        var myquery = { username: username};
        dbo.collection("Emp").replaceOne(myquery,employeeData, function(err, res) {
          if (err){
            res1.send({inserted:0});
            console.log(err);
          }
          else{
            res1.send({inserted:1});
          console.log("1 document updated");
          db.close();
        }
        });

        
       });
       
      
  });   
module.exports = router;

// app.post("/getEmp",function(req,res1){  
//     MongoClient.connect("mongodb://localhost:27017/S_E_E",{ useNewUrlParser: true }, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("S_E_E");
//         dbo.collection("Emp").find().toArray(function(error, result){
//           if (err) throw err;
//           console.log(result);
//           res1.send({'result':result});
//         });

//       });
//   })