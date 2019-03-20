import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup.service';
import { DataService } from 'src/app/data.service';
// import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  model: any = {};
  iterationError=0;
  assignmentError=0;
  userStory=[];
  US_counter=0;
  newUserStory=[];
  InProgressUserStory=[];
  CompletedUserStory=[];
  AcceptedUserStory=[];
 emp=[];
 project_id;
 iterations=[];
 isMember;
 stateHistory=[];
  constructor(public newService :SignupService,public _dataService: DataService,private router: Router) { }
users;
  ngOnInit() {
    var url=this.router.url;
    var id=url.split('/');
    this.project_id=parseInt( id[id.length-2]);
    var username=id[2];
    this.newService.checkprojectCred(JSON.stringify({'project_id':this.project_id,'username':username})).then((data) =>{
if(data['exists']==1){
  this.newService.getUserStory(JSON.stringify({project_id: this.project_id})).then((data) =>{
    for(var i=0; i<data['result'].length;i++ ){
      if(data['result'][i]['state']=='New'){
        this.userStory.push(data['result'][i]);
      }
     else if(data['result'][i]['state']=='In Progress'){
        this.InProgressUserStory.push(data['result'][i]);
      }
      else if(data['result'][i]['state']=='Completed'){
        this.CompletedUserStory.push(data['result'][i]);
      }
      else if(data['result'][i]['state']=='Accepted'){
        this.AcceptedUserStory.push(data['result'][i]);
      }
    }
     this.US_counter=data['USCount'];
  });
}
else{
  this.isMember=0;
}
    });
    
    
    // this.newService.getEmployees().then((data) => {
      
    // });
  }
  // onSubmit(){
  //   alert(JSON.stringify(this.model));
    
  // }
  add(a){
    this.US_counter++;
    this.newUserStory.push(this.US_counter);   
    this.model.title="";
  }
  preSelect="";
  fo=[];
focus(a){
  this.preSelect=a.target.value;
  this.fo.push(this.preSelect);
//  alert(this.preSelect);
}
id="";
assign="";
title="";
state="New";
edit(a){
  this.iterationError=0;
  this.assignmentError=0;
  (<HTMLInputElement>document.getElementById("assigned")).value="";
  (<HTMLInputElement>document.getElementById("iteration")).value="";
  (<HTMLInputElement>document.getElementById("description")).value="";
  (<HTMLInputElement>document.getElementById("acceptance_criteria")).value="";
  (<HTMLInputElement>document.getElementById("story_points")).value="";
  this.id=(a.target.attributes.id.value).split('.')[1];
  // alert(this.id);
  this.newService.getSingleUserStory(JSON.stringify({project_id: this.project_id,us_id:this.id})).then((data) =>{
  this.title=data['result'][0]['title'];
  // alert(data['result'][0]['state']);
  if(data['result'][0]['assigned_to']!= undefined){
  this.assign=data['result'][0]['assigned_to'];
  (<HTMLInputElement>document.getElementById("assigned")).placeholder=this.assign;
  this.stateHistory=data['result'][0]['state_history'];
 }
 else{
  (<HTMLInputElement>document.getElementById("assigned")).placeholder="";
 }
  (<HTMLInputElement>document.getElementById("select")).value=data['result'][0]['state'];
 
  if(data['result'][0]['iteration']!= undefined){
    // this.assign=data['result'][0]['assigned_to'];
    (<HTMLInputElement>document.getElementById("iteration")).placeholder=data['result'][0]['iteration'];
   }
   else{
    (<HTMLInputElement>document.getElementById("iteration")).placeholder="";
   }
   if(data['result'][0]['description']!= undefined){
    // this.assign=data['result'][0]['assigned_to'];
    (<HTMLInputElement>document.getElementById("description")).value=data['result'][0]['description'];
   }
   else{
    (<HTMLInputElement>document.getElementById("description")).value="";
   }

   if(data['result'][0]['acceptance_criteria']!= undefined){
    // this.assign=data['result'][0]['assigned_to'];
    (<HTMLInputElement>document.getElementById("acceptance_criteria")).value=data['result'][0]['acceptance_criteria'];
   }
   else{
    (<HTMLInputElement>document.getElementById("acceptance_criteria")).value="";
   }

   if(data['result'][0]['priority']!= undefined){
    // this.assign=data['result'][0]['assigned_to'];
    (<HTMLInputElement>document.getElementById("priority")).value=data['result'][0]['priority'];
   }
   else{
    (<HTMLInputElement>document.getElementById("priority")).value="";
   }

   if(data['result'][0]['story_points']!= undefined){
    // this.assign=data['result'][0]['assigned_to'];
    (<HTMLInputElement>document.getElementById("story_points")).value=data['result'][0]['story_points'];
   }
   else{
    (<HTMLInputElement>document.getElementById("story_points")).value="";
   }

  });
  
  this.newService.getProjectEmployees(JSON.stringify({'project_id':this.project_id})).then((data) => {
    this.emp=data['result'];
    // alert(this.emp);
  });
  this.newService.getSprints(JSON.stringify({'project_id':this.project_id})).then((data) => {
    this.iterations=data['result'];
    // alert(data['result']);
  });
  

}
saveUS(a){
  var json={};
  json['us_id']=parseInt(a.target.attributes.id.value);
  json['project_id']=this.project_id;
  if((<HTMLInputElement>document.getElementById("Updatedtitle")).value==""){
    json['title']= (<HTMLInputElement>document.getElementById("Updatedtitle")).placeholder;
  }
  else{
  json['title']= (<HTMLInputElement>document.getElementById("Updatedtitle")).value;
  }
  if((<HTMLInputElement>document.getElementById("iteration")).value==""){
    json['iteration']= (<HTMLInputElement>document.getElementById("iteration")).placeholder;
  }
  else{
    var value=(<HTMLInputElement>document.getElementById("iteration")).value;
    var index=this.iterations.findIndex(x => x.title==value);
        if(index == -1){
          this.iterationError=1;
  
        //  alert("not");
        }
        else{
      // alert('asd');
          json['iteration']=value;
          
        }
    
  }
  if((<HTMLInputElement>document.getElementById("assigned")).value==""){
    json['assigned_to']=(<HTMLInputElement>document.getElementById("assigned")).placeholder;
  }
  else{
    var value=(<HTMLInputElement>document.getElementById("assigned")).value;

      if(/^([a-zA-Z]+\s\s\({1}[a-zA-Z]{1}\.[a-zA-Z0-9]+[0-9]+\){1})$/.test(value)==false){
      
  this.assignmentError=1;
      } 
     else{
        //var name= value.split('(')[0];
        var username=value.split('(')[1].split(")")[0];
        
        var index=this.emp.findIndex(x => x.username==username);
        if(index == -1){
          this.assignmentError=1;
       
        }
        else{
      
          json['assigned_to']=username;
          
        }
      }
   
  }
  
  json['state']=(<HTMLInputElement>document.getElementById("select")).value;
  
  json['description']=(<HTMLInputElement>document.getElementById("description")).value;
  json['acceptance_criteria']=(<HTMLInputElement>document.getElementById("acceptance_criteria")).value;
  json['story_points']=(<HTMLInputElement>document.getElementById("story_points")).value;
  json['priority']=(<HTMLInputElement>document.getElementById("priority")).value;
  if(  this.iterationError==0 && this.assignmentError ==0){
    this.newService.editUserStory(JSON.stringify(json)).then((data) => {
if(data['updated']==1){
  var prep=this.fo[this.fo.length-2];
    var val= json['state'];
    this.moveUserstory(val,prep,this.id);
    alert("user story updated");
}
    });
   
  }
  
  
}

moveUserstory(a,prep,target_id){
  if(a=="New"){
    // alert("fs");
    // alert(this.preSelect);
   if(prep=="In Progress"){
    // alert("df");
    var index=this.InProgressUserStory.findIndex(x => x.us_id==target_id);
    this.userStory.push(this.InProgressUserStory[index]);
    this.InProgressUserStory.splice(index, 1);
   }
   else if(prep=="Accepted"){
    // alert("df");
    var index=this.AcceptedUserStory.findIndex(x => x.us_id==target_id);
    this.userStory.push(this.AcceptedUserStory[index]);
    this.AcceptedUserStory.splice(index, 1);
   } 
   else if(prep=="Completed"){
    // alert("df");
    var index=this.CompletedUserStory.findIndex(x => x.us_id==target_id);
    this.userStory.push(this.CompletedUserStory[index]);
    this.CompletedUserStory.splice(index, 1);
   } 
  }
  else if(a=="In Progress"){
    if(prep=="New"){
      // alert("df");
      var index=this.userStory.findIndex(x => x.us_id==target_id);
      this.InProgressUserStory.push(this.userStory[index]);
      this.userStory.splice(index, 1);
     }
     else if(prep=="Accepted"){
      // alert("df");
      var index=this.AcceptedUserStory.findIndex(x => x.us_id==target_id);
      this.InProgressUserStory.push(this.AcceptedUserStory[index]);
      this.AcceptedUserStory.splice(index, 1);
     } 
     else if(prep=="Completed"){
      // alert("df");
      var index=this.CompletedUserStory.findIndex(x => x.us_id==target_id);
      this.InProgressUserStory.push(this.CompletedUserStory[index]);
      this.CompletedUserStory.splice(index, 1);
     } 
  }
  else if(a=="Completed"){
    if(prep=="New"){
      // alert("df");
      var index=this.userStory.findIndex(x => x.us_id==target_id);
      this.CompletedUserStory.push(this.userStory[index]);
      this.userStory.splice(index, 1);
     }
     else if(prep=="Accepted"){
      // alert("df");
      var index=this.AcceptedUserStory.findIndex(x => x.us_id==target_id);
      this.CompletedUserStory.push(this.AcceptedUserStory[index]);
      this.AcceptedUserStory.splice(index, 1);
     } 
     else if(prep=="In Progress"){
      // alert("df");
      var index=this.InProgressUserStory.findIndex(x => x.us_id==target_id);
      this.CompletedUserStory.push(this.InProgressUserStory[index]);
      this.InProgressUserStory.splice(index, 1);
     }
  }
  else if(a=="Accepted"){
    if(prep=="New"){
      // alert("df");
      var index=this.userStory.findIndex(x => x.us_id==target_id);
      this.AcceptedUserStory.push(this.userStory[index]);
      this.userStory.splice(index, 1);
     }
     else if(prep=="Completed"){
      // alert("df");
      var index=this.CompletedUserStory.findIndex(x => x.us_id==target_id);
      this.AcceptedUserStory.push(this.CompletedUserStory[index]);
      this.CompletedUserStory.splice(index, 1);
     } 
     else if(prep=="In Progress"){
      // alert("df");
      var index=this.InProgressUserStory.findIndex(x => x.us_id==target_id);
      this.AcceptedUserStory.push(this.InProgressUserStory[index]);
      this.InProgressUserStory.splice(index, 1);
     }
  }
}

  select(a){
    var target_id=a.target.attributes.id.value;
      var arr=target_id.split(".");
      target_id=arr[1];
//       alert(target_id);
// alert(a.target.value);
// alert(this.preSelect + "pere");
var prep=this.preSelect;
var jsonn={project_id:this.project_id,us_id:target_id,state:a.target.value};
var val=a.target.value;
// alert("dw");
this.newService.updateUserStoryStatus(JSON.stringify(jsonn)).then((data) =>{
  // alert("dw");
       if(data['updated']==1){
        this.moveUserstory(val,prep,target_id);
       }
});
  }
  arrowup(){
    (<HTMLInputElement>document.getElementById("arrowup")).style.display="none";
    (<HTMLInputElement>document.getElementById("arrowdown")).style.display="block";
  }
  arrowdown(){
    (<HTMLInputElement>document.getElementById("arrowup")).style.display="block";
    (<HTMLInputElement>document.getElementById("arrowdown")).style.display="none";
  }
  arrowup2(){
    (<HTMLInputElement>document.getElementById("arrowup2")).style.display="none";
    (<HTMLInputElement>document.getElementById("arrowdown2")).style.display="block";
  }
  arrowdown2(){
    (<HTMLInputElement>document.getElementById("arrowup2")).style.display="block";
    (<HTMLInputElement>document.getElementById("arrowdown2")).style.display="none";
  }
  arrowup3(){
    (<HTMLInputElement>document.getElementById("arrowup3")).style.display="none";
    (<HTMLInputElement>document.getElementById("arrowdown3")).style.display="inline-block";
  }
  arrowdown3(){
    (<HTMLInputElement>document.getElementById("arrowup3")).style.display="inline-block";
    (<HTMLInputElement>document.getElementById("arrowdown3")).style.display="none";
  }
  
  details(a){
    (<HTMLInputElement>document.getElementById("divdetails")).style.display="block";
    (<HTMLInputElement>document.getElementById("divhistory")).style.display="none";

  }
  history(a){
    (<HTMLInputElement>document.getElementById("divdetails")).style.display="none";
    (<HTMLInputElement>document.getElementById("divhistory")).style.display="block";
  }
  
    save(a){
      var target_id= a.target.attributes.id.value;
      var arr=target_id.split("b");
      target_id=arr[1];
      (<HTMLInputElement>document.getElementById("l"+target_id)).innerHTML=target_id +"  " + (<HTMLInputElement>document.getElementById("i"+target_id)).value;

 (<HTMLInputElement>document.getElementById("h"+target_id)).style.display="none";

      var json={};
      json["project_id"]=this.project_id;
      json['us_id']=this.US_counter;
      json["title"]= this.model.title;
      json["state"]="New";
     
      this.newService.saveUserStory(JSON.stringify({json})).then((data) =>{
        if(data['inserted']==1){
          this.userStory.push(json);
      }
      });
  
  
  
    }
    iterationClick(){
  this.iterationError=0;
    }
    assignedClick(){
      this.assignmentError=0;
    }
  }
