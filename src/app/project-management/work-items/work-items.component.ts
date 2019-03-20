import { Component, OnInit } from '@angular/core';
import {SignupService } from 'src/app/signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-work-items',
  templateUrl: './work-items.component.html',
  styleUrls: ['./work-items.component.css']
})
export class WorkItemsComponent implements OnInit {
userStory=[];
model : any = {};
iterations=[];
sprints=[];
isMember;
emp=[];
iterationError=0;
assignmentError=0;
UsError=0;
taskEdit=0;
usEdit=0;
us_id;
task_id;
bug_id;
taskModalHeader="Add Task";
bugModalHeader="Add Bug";
USModalHeader="Add User Story";
bugEdit=0;
tasks=[];
bugs=[];
bugLink=1;
project_id;
  constructor(private router: Router,private newService: SignupService) { }

  ngOnInit() {
    this.model.state="New";
    var url=this.router.url;
    var id=url.split('/');
    var project_id=parseInt( id[id.length-2]);
    this.project_id=project_id;
    var username=id[2];
    this.newService.checkprojectCred(JSON.stringify({'project_id':project_id,'username':username})).then((data) =>{
      if(data['exists']==1){
        var json={'project_id':project_id};
        this.newService.getUserStory(JSON.stringify(json)).then((data)=>{
         this.userStory=data['result'];
        });
        this.newService.getTasks(JSON.stringify(json)).then((data)=>{
          this.tasks=data['result'];
         });
         this.newService.getBugs(JSON.stringify(json)).then((data)=>{
          this.bugs=data['result'];
         });
      
     this.newService.getSprints(JSON.stringify(json)).then((data) => {
       this.sprints=data['result'];
       this.iterations=data['result'];
     });
     this.newService.getProjectEmployees(JSON.stringify({'project_id':project_id})).then((data) => {
       this.emp=data['result'];
      
     });
     
      }
      else{
this.isMember=0;
      }
    
    });
  }

  UsEdit(a){
    this.USModalHeader="Edit User Story";
this.usEdit=1;
this.us_id=parseInt(a.target.attributes.id.value);
this.newService.getSingleUserStory(JSON.stringify({'project_id':this.project_id,'us_id':this.us_id})).then((data)=>{
(<HTMLInputElement>document.getElementById('UStitle')).placeholder=data['result'][0]['title'];
(<HTMLInputElement>document.getElementById('USassigned')).placeholder=data['result'][0]['assigned_to'];
(<HTMLInputElement>document.getElementById('USstate')).value=data['result'][0]['state'];
(<HTMLInputElement>document.getElementById('USiteration')).placeholder=data['result'][0]['iteration'];
(<HTMLInputElement>document.getElementById('USdescription')).value=data['result'][0]['description'];
(<HTMLInputElement>document.getElementById('USacceptance_criteria')).placeholder=data['result'][0]['acceptance_criteria'];
(<HTMLInputElement>document.getElementById('USstory_points')).placeholder=data['result'][0]['story_points'];
(<HTMLInputElement>document.getElementById('USpriority')).placeholder=data['result'][0]['priority'];


});
  }
  TaskEdit(a){
    this.taskModalHeader="Edit Task";
    this.taskEdit=1;
    var id=a.target.attributes.id.value
    this.us_id=parseInt(id.split('.')[0]);
    this.task_id=parseInt(id.split('.')[1]);
    this.newService.getTask(JSON.stringify({'project_id':this.project_id,'us_id':this.us_id,'task_id':this.task_id})).then((data)=>{
      (<HTMLInputElement>document.getElementById('Tasktitle')).placeholder=data['result'][0]['title'];
       (<HTMLInputElement>document.getElementById('Taskassigned')).placeholder=data['result'][0]['assigned_to'];
       (<HTMLInputElement>document.getElementById('Taskuserstory')).placeholder=data['result'][0]['us_id'];
      (<HTMLInputElement>document.getElementById('Taskstate')).value=data['result'][0]['state'];
      (<HTMLInputElement>document.getElementById('Taskiteration')).placeholder=data['result'][0]['iteration'];
      (<HTMLInputElement>document.getElementById('Taskdescription')).value=data['result'][0]['description'];
      (<HTMLInputElement>document.getElementById('Taskpriority')).placeholder=data['result'][0]['priority'];
      (<HTMLInputElement>document.getElementById('Task_original_estimate')).placeholder=data['result'][0]['OriginalEstimate'];
      (<HTMLInputElement>document.getElementById('Task_remaining')).placeholder=data['result'][0]['RemainingTime'];
      (<HTMLInputElement>document.getElementById('Task_completed')).placeholder=data['result'][0]['CompletedTime'];
      
    });
  }

  BugEdit(a){
    this.bugModalHeader="Edit Bug";
    this.bugEdit=1;
    var id=a.target.attributes.id.value;
    var json={'project_id':this.project_id};
    this.us_id=parseInt(id.split('.')[0]);
    this.task_id=parseInt(id.split('.')[1]);
    if(id.split('.')[0]!=''){
      json['us_id']=this.us_id;
      (<HTMLInputElement>document.getElementById('radioUs')).checked=true;
      this.radioUS();
    }
    else if(id.split('.')[1]!=''){
      json['task_id']=this.task_id;
      (<HTMLInputElement>document.getElementById('radioTask')).checked=true;
      this.radioTask();
    }
    this.bug_id=parseInt(id.split('.')[2]);
    json['bug_id']=this.bug_id;
    this.newService.getBug(JSON.stringify(json)).then((data)=>{
      (<HTMLInputElement>document.getElementById('bugtitle')).placeholder=data['result'][0]['title'];
       (<HTMLInputElement>document.getElementById('bugassigned')).placeholder=data['result'][0]['assigned_to'];
       if(id.split('.')[0]!='')
       (<HTMLInputElement>document.getElementById('buglink')).placeholder=data['result'][0]['us_id'];
       else if(id.split('.')[1]!='')
       (<HTMLInputElement>document.getElementById('buglink')).placeholder=data['result'][0]['task_id'];

      (<HTMLInputElement>document.getElementById('bugstate')).value=data['result'][0]['state'];
      (<HTMLInputElement>document.getElementById('bugiteration')).placeholder=data['result'][0]['iteration'];
      (<HTMLInputElement>document.getElementById('bugReproSteps')).value=data['result'][0]['repro_steps'];
      (<HTMLInputElement>document.getElementById('bugsysteminfo')).value=data['result'][0]['system_info'];
      (<HTMLInputElement>document.getElementById('bugpriority')).value=data['result'][0]['priority'];
      (<HTMLInputElement>document.getElementById('bugseverity')).value=data['result'][0]['severity'];
      (<HTMLInputElement>document.getElementById('bugoriginal_estimate')).placeholder=data['result'][0]['OriginalEstimate'];
      (<HTMLInputElement>document.getElementById('bugremaining')).placeholder=data['result'][0]['RemainingTime'];
      (<HTMLInputElement>document.getElementById('bugcompleted')).placeholder=data['result'][0]['CompletedTime'];    
    });
  }
 
  addUs(){
    this.USModalHeader="Add User Story";
    this.usEdit=0;
    (<HTMLInputElement>document.getElementById('UStitle')).placeholder=' ';
(<HTMLInputElement>document.getElementById('USassigned')).placeholder=' ';
(<HTMLInputElement>document.getElementById('USstate')).value='New';
(<HTMLInputElement>document.getElementById('USiteration')).placeholder=' ';
(<HTMLInputElement>document.getElementById('USdescription')).value=' ';
(<HTMLInputElement>document.getElementById('USacceptance_criteria')).placeholder=' ';
(<HTMLInputElement>document.getElementById('USstory_points')).placeholder=' ';
(<HTMLInputElement>document.getElementById('USpriority')).placeholder=' ';

  }

  closeUsForm(){
    this.model={};
    (<HTMLFormElement>document.getElementById('myForm')).reset();
    this.model.state="New";
  } 

  addTask(){
    this.taskModalHeader="Add Task";
    this.taskEdit=0;
    (<HTMLInputElement>document.getElementById('Tasktitle')).placeholder=' ';
    (<HTMLInputElement>document.getElementById('Taskassigned')).placeholder=' ';
    (<HTMLInputElement>document.getElementById('Taskuserstory')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('Taskstate')).value='New';
   (<HTMLInputElement>document.getElementById('Taskiteration')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('Taskdescription')).value=' ';
   (<HTMLInputElement>document.getElementById('Taskpriority')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('Task_original_estimate')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('Task_remaining')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('Task_completed')).placeholder=' ';
   
  }
  addBug(){
    this.bugModalHeader="Add Bug";
    this.bugEdit=0;
    (<HTMLInputElement>document.getElementById('bugtitle')).placeholder=' ';
    (<HTMLInputElement>document.getElementById('bugassigned')).placeholder=' ';
    (<HTMLInputElement>document.getElementById('buglink')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('bugstate')).value='New';
   (<HTMLInputElement>document.getElementById('bugiteration')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('bugReproSteps')).value=' ';
   (<HTMLInputElement>document.getElementById('bugsysteminfo')).value=' ';
   (<HTMLInputElement>document.getElementById('bugpriority')).value=' ';
   (<HTMLInputElement>document.getElementById('bugseverity')).value=' ';
   (<HTMLInputElement>document.getElementById('bugoriginal_estimate')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('bugremaining')).placeholder=' ';
   (<HTMLInputElement>document.getElementById('bugcompleted')).placeholder=' ';    

   
  }
  closeTaskForm(){
    this.model={};
   (<HTMLFormElement>document.getElementById('taskForm')).reset();
         this.model.state="New";
         
  }
  closeBugForm(){
    this.model={};
    (<HTMLFormElement>document.getElementById('bugform')).reset();
    this.model.state="New";
  }
  
  
  saveBug(){
    alert(JSON.stringify(this.model));
    Object.keys(this.model).forEach((key) => (this.model[key] == null) && delete this.model[key]);
    var value=this.model['iteration'];
    if(value!=undefined){
    var index=this.iterations.findIndex(x => x.title==value);
        if(index == -1){
          this.iterationError=1;
        }
      }
      var newObj = JSON.parse(JSON.stringify(this.model));
      if(this.model['assigned_to']!=undefined){
        var username=this.model['assigned_to'].split('(')[1].split(")")[0];     
        var index=this.emp.findIndex(x => x.username==username);
        if(index == -1){
          this.assignmentError=1;  
        }
        else{
         newObj['assigned_to']=username;   
        }
      }
      if(this.model['link']!=undefined){
        delete newObj['link'];
        var link=parseInt( this.model['link']);
        if(this.bugLink==1){
          var index=this.userStory.findIndex(x => x.us_id==link);
          if(index == -1){
            this.UsError=1;  
          }
          else
          newObj['us_id']=link;
          
        
        }
          else if(this.bugLink==0){
            var index=this.tasks.findIndex(x => x.task_id==link);
            if(index == -1){
              this.UsError=1;  
            }
            else
              newObj['task_id']=link;
        }
      }
      newObj['project_id']=this.project_id;
      
      
      if(this.assignmentError!=1 && this.iterationError!=1 && this.UsError!=1){
        if(this.bugEdit==0){
        this.newService.saveBug(JSON.stringify(newObj)).then((data)=>{
          if(data['inserted']==1){
            this.model={};
       this.model.state="New";
            (<HTMLFormElement>document.getElementById('bugform')).reset();
              alert("bug added");
          }
        });
      }
      else{
        newObj['bug_id']=this.bug_id;
        this.newService.editBug(JSON.stringify(newObj)).then((data) =>{
if(data['updated']==1)
alert("bug updated");
        });
      }
    }
  }
  saveTask(){
    Object.keys(this.model).forEach((key) => (this.model[key] == null) && delete this.model[key]);
    var newObj = JSON.parse(JSON.stringify(this.model));
    var value=this.model['iteration'];
    if(value!=undefined){
    var index=this.iterations.findIndex(x => x.title==value);
        if(index == -1){
          this.iterationError=1;
        }
      }
      if(this.model['assigned']!=undefined){
        var username=this.model['assigned'].split('(')[1].split(")")[0];     
        var index=this.emp.findIndex(x => x.username==username);
        if(index == -1){
          this.assignmentError=1;  
        }
        else{
          delete newObj['assigned'];
          newObj['assigned_to']=username;
          
        }
      }
      if(this.model['userstory']!=undefined){
        var us_id=parseInt( this.model['userstory']);    
        var index=this.userStory.findIndex(x => x.us_id==us_id);
        if(index == -1){
          this.UsError=1;  
        }
        else{
          newObj['us_id']=us_id;
      delete newObj['userstory'];
          
        }
      }
      newObj['project_id']=this.project_id;
      if(this.assignmentError!=1 && this.iterationError!=1 && this.UsError!=1){
        if(this.taskEdit==0){
        this.newService.saveTask(JSON.stringify(newObj)).then((data)=>{
          if(data['inserted']==1){
            this.model={};
       this.model.state="New";
            (<HTMLFormElement>document.getElementById('taskForm')).reset();
              alert("Task added");
          }
        });
      }
      else{
        newObj['task_id']=this.task_id;
        newObj['us_id']=this.us_id;
        alert(JSON.stringify(newObj));
this.newService.updateTask(JSON.stringify(newObj)).then((data)=>{
if(data['updated']==1){
  alert('task updated');
}
});
      }
      }

  }

  
  saveUserStory(){
    Object.keys(this.model).forEach((key) => (this.model[key] == null) && delete this.model[key]);
    var newObj = JSON.parse(JSON.stringify(this.model));
    var value=this.model['iteration'];
    newObj['project_id']=this.project_id;
    if(value!=undefined){
    var index=this.iterations.findIndex(x => x.title==value);
        if(index == -1){
          this.iterationError=1;
        }
      }
      if(this.model['assigned_to']!=undefined){
        var username=this.model['assigned_to'].split('(')[1].split(")")[0];     
        var index=this.emp.findIndex(x => x.username==username);
        if(index == -1){
          this.assignmentError=1;  
        }
        else{
          newObj['assigned_to']=username;        
        }
      }
   if(this.iterationError!=1 && this.assignmentError!=1){
     if(this.usEdit==0){
    this.newService.saveUserStory(JSON.stringify({json:newObj})).then((data) => {
      if(data['inserted']==1){
        this.model={};
   this.model.state="New";
        (<HTMLFormElement>document.getElementById('myForm')).reset();
          alert("user story added");
      }
          });
        }
        else{
          newObj['us_id']=this.us_id;
          alert(JSON.stringify(newObj));
this.newService.editUserStory(JSON.stringify( newObj)).then((data)=>{
if(data['updated']==1){
  this.usEdit==0;
  alert('user story updated');
}
});
}
        
   }
   this.model={};
   this.model.state="New";
        (<HTMLFormElement>document.getElementById('myForm')).reset();
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
  assignedClick(){
    this.assignmentError=0;
  }
  iterationClick(){
    this.iterationError=0;
  }
  UsClick(){
this.UsError=0;
  }
  radioUS(){
    this.bugLink=1;
  }
  radioTask(){
    this.bugLink=0;
  }
}
