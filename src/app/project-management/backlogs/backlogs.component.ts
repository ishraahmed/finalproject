import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/signup.service';

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.css']
})
export class BacklogsComponent implements OnInit {
  model: any = {};
  userStory=[];
  sprints=[];
  usId;
  taskId;
  emp=[];
  project_id;
  iterations=[];
  tasks=[];
  taskEdit=0;
  isMember;
  taskModalHeader="Add Task";
  constructor(private router: Router,public newService :SignupService) { }

  ngOnInit() {
    var url=this.router.url;
    var id=url.split('/');
    this.project_id=parseInt( id[id.length-2]);
    var username=id[2];
    this.model.state="New";

    this.newService.checkprojectCred(JSON.stringify({'project_id':this.project_id,'username':username})).then((data) =>{
      if(data['exists']==1){
        var json={'project_id':this.project_id};
        this.newService.getUserstoryTasks(JSON.stringify(json)).then((data)=>{
         this.userStory=data['result'];
        });
      
     this.newService.getSprints(JSON.stringify(json)).then((data) => {
       this.sprints=data['result'];
       this.iterations=data['result'];
     });
     this.newService.getProjectEmployees(JSON.stringify({'project_id':this.project_id})).then((data) => {
       this.emp=data['result'];
      
     });
     
      }
      else{
this.isMember=0;
      }
    
    });
 
 
  }
  // editUS(){
  //   alert("eds");
  // }
  UsIteration(a){
    var json={'project_id':this.project_id,'us_id':a.target.attributes.id.value,'iteration':a.target.innerHTML};
    this.newService.updateUserStoryIteration(JSON.stringify(json)).then((data) => {
alert("User story iteration changed.")
    });
  }

  TaskIteration(a){
    var arr=a.target.attributes.id.value.split('.');
    var us_id=parseInt(arr[0]);
    var task_id=parseInt(arr[1]);
    var json={'project_id':this.project_id,'us_id':us_id,'task_id':task_id,'iteration':a.target.innerHTML};
    this.newService.updateTaskIteration(JSON.stringify(json)).then((data) => {
      alert("Task iteration changed.")
    });
  }

  UsDelete(a){
    var json={'project_id':this.project_id,'us_id':parseInt( a.target.attributes.id.value),'state':'deleted'};
this.newService.updateUserStoryStatus(JSON.stringify(json)).then((data ) =>{
  alert("User story status changed to deleted.")
});
    
  }

  TaskDelete(a){
    var arr=a.target.attributes.id.value.split('.');
    var us_id=parseInt(arr[0]);
    var task_id=parseInt(arr[1]);
     var json={'project_id':this.project_id,'us_id':us_id,'task_id':task_id};
this.newService.deleteTask(JSON.stringify(json)).then((data ) =>{
  alert("Task status changed to deleted.")
});
    
  }

TaskEdit(a){
  this.taskModalHeader="Edit Task";
  this.taskEdit=1;
  var arr=a.target.attributes.id.value.split('.');
  this.usId=parseInt(arr[0]);
  var us_id=parseInt(arr[0]);
    var task_id=parseInt(arr[1]);
    this.taskId=parseInt(arr[1]);
  var json={'project_id':this.project_id,'us_id':us_id,'task_id':task_id};
 alert(JSON.stringify(json));
  this.newService.getTask(JSON.stringify(json)).then((data) =>{
    var res=data['result'][0];
    (<HTMLInputElement>document.getElementById("Etitle")).placeholder=res['title'];
    (<HTMLInputElement>document.getElementById("assigned")).placeholder=res['assigned_to'];
    (<HTMLInputElement>document.getElementById("state")).value=res['state'];
    (<HTMLInputElement>document.getElementById("iteration")).placeholder=res['iteration'];
    (<HTMLInputElement>document.getElementById("description")).placeholder=res['description'];
    (<HTMLInputElement>document.getElementById("priority")).value=res['priority'];
    (<HTMLInputElement>document.getElementById("original_estimate")).placeholder=res['OriginalEstimate'];
    (<HTMLInputElement>document.getElementById("remaining")).placeholder=res['RemainingTime'];
    (<HTMLInputElement>document.getElementById("completed")).placeholder=res['CompletedTime'];
  })
}

  backlog(){
    this.userStory=[];
    var json={'project_id':this.project_id};
    this.newService.getUserstoryTasks(JSON.stringify(json)).then((data)=>{
     this.userStory=data['result'];
    });
  }
  sprintClick(a){
    this.userStory=[];
    var json={'project_id':this.project_id,'sprint':a.target.attributes.id.value};
   this.newService.getSprintUserstoryTasks(JSON.stringify(json)).then((data)=>{
    this.userStory=data['result'];
   });

  }

  getUsid(a){
    this.usId=a.target.attributes.id.value;
    this.taskEdit=0;
    this.taskModalHeader="Add Task";
    (<HTMLFormElement>document.getElementById("myForm")).reset();
    (<HTMLInputElement>document.getElementById("Etitle")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("assigned")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("state")).value="New";
    (<HTMLInputElement>document.getElementById("iteration")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("description")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("priority")).value=" ";
    (<HTMLInputElement>document.getElementById("original_estimate")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("remaining")).placeholder=" ";
    (<HTMLInputElement>document.getElementById("completed")).placeholder=" ";
  }

  saveTask(a){
    this.model['project_id']=this.project_id;
    this.model['us_id']=parseInt(this.usId);
    Object.keys(this.model).forEach((key) => (this.model[key] == null) && delete this.model[key]);
    var jsonobj=JSON.parse(JSON.stringify(this.model));
    if(this.model['assigned']!=undefined){      
      var user=jsonobj['assigned'].split('(')[1].split(')')[0];  
      delete jsonobj['assigned'];
      jsonobj['assigned_to']=user;    
    }
    if(this.taskEdit==1){
      jsonobj['task_id']=parseInt(this.taskId);          
      this.newService.updateTask(JSON.stringify(jsonobj)).then((data)=>{
        alert("Task has been edited succesfully.")
      });
      
    }

   else{
    if(this.model.state==null){
      this.model.state="New";
    }
    this.newService.saveTask(JSON.stringify(jsonobj)).then((data) =>{
      alert("Task saved succesfully.")
      this.model= {};
      this.model.state="New";
    });
    this.model.state="New";
    (<HTMLFormElement>document.getElementById("myForm")).reset();
  }
  }
  onSubmit(){
this.model['project_id']=this.project_id;
var date1 = new Date(this.model['startDate']);
var date2 = new Date(this.model['endDate']);
// var days = (Date_fin.datepicker('getDate') - Date_debut.datepicker('getDate')) / 1000 / 60 / 60 / 24;
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
this.model['days']=diffDays;
this.newService.saveSprint(JSON.stringify( this.model)).then((data) =>{
if(data['inserted']==1){
  this.sprints.push(this.model);
  alert("Sprint inserted successfully.")
  this.model.state="New";
}
});
  }

}
