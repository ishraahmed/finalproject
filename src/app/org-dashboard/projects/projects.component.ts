import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignupService } from 'src/app/signup.service';
import { DataService } from 'src/app/data.service';
import { url } from 'inspector';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
proj_id=0;
proj_count=0;
proj=[];
Managers=[];
Employees=[];
SuggestedEmp=[];
skills=[];
domains=[];
teamMembers=[];
members=0;
errorr=0;
Merrorr=0;
model: any = {};
username;
isadmin;
  constructor(private router:Router, private newService: SignupService,public _dataService: DataService) { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("projS")).value="Active";

    var url= this.router.url;
    this.username= url.split('/')[2];
    this.newService.getuser(JSON.stringify({'username':this.username})).then((data)=>{
      if(data['result']['Designation']=='admin'){
this.isadmin=1;
      }
      else{
        this.isadmin=0;
      }
    });
    

    this.newService.getProjects(JSON.stringify({status:'Active','username':this.username})).then((data) => {
this.proj=data['result'];
    });

    this.newService.getManagers().then((data) =>{
      this.Managers=data['result'];
    });

    this.newService.getEmployees().then((data) => {
this.Employees=data['result'];
this.SuggestedEmp=this.Employees;
    });

    this.newService.getSkills().then((data) => {
this.skills=data['result'];

    }); 

    this.newService.getDomain().then((data) => {
this.domains=data['result'];

    });   
  }

  
  removeMember(a){
var username=a.target.attributes.id.value;
var index=this.teamMembers.findIndex(x => x.username==username);
this.teamMembers.splice(index, 1);
this.members--;
  }

addMember(){
  
  var value=(<HTMLInputElement>document.getElementById("member")).value;
  var a= /^([a-zA-Z]+\s\s\({1}[a-zA-Z]{1}.[a-zA-Z0-9]+[0-9]+\){1})$/.test(value);
  if(a==false){
    this.errorr=1;
  } 
  if(a==true){
    var name= value.split('(')[0];
    var username=value.split('(')[1].split(")")[0];
    var member=(<HTMLInputElement>document.getElementById("member")).value;
    var index=this.SuggestedEmp.findIndex(x => x.username==username);
    if(index == -1){
      this.errorr=1;
    }
    else{
      this.members++;
     (<HTMLInputElement>document.getElementById("member")).value="";
      var json={};
  json['username']=username;
  json['name']=name;
      this.teamMembers.push(json);
  
    }
  }

}

changeS(a){
  if(a.target.value=="skills"){
(<HTMLElement>document.getElementById("skills")).style.display="block";
(<HTMLElement>document.getElementById("domains")).style.display="none";
this.skillValue=this.skills[0];
var skillJson={'skill': this.skillValue};
   this.newService.searchEmployeesOnSkill(JSON.stringify(skillJson)).then((data) =>{
     this.SuggestedEmp=data['result'];
   });
  }
  else if(a.target.value=="domain"){
    (<HTMLElement>document.getElementById("skills")).style.display="none";
    (<HTMLElement>document.getElementById("domains")).style.display="block";
    this.domainValue=this.domains[0];
    var domainJson={'domain': this.domainValue};
       this.newService.searchEmployeesOnDomain(JSON.stringify(domainJson)).then((data) =>{
         this.SuggestedEmp=data['result'];
       });
  }
  else if(a.target.value=="name"){
this.SuggestedEmp=this.Employees;
    (<HTMLElement>document.getElementById("skills")).style.display="none";
    (<HTMLElement>document.getElementById("domains")).style.display="none";
  }
}


  Terror=0;
  Merror=0;
  Tierror=0;
  skillValue="";
  domainValue="";

  addNew(){

    this.proj_id=0;
    this.Terror=0;
    this.Merror=0;
    this.Tierror=0;
    this.Merrorr=0;
    this.errorr=0;
    (<HTMLInputElement>document.getElementById("assigned")).value=""; 
    (<HTMLInputElement>document.getElementById("days")).value="";
    (<HTMLInputElement>document.getElementById("months")).value="";
    (<HTMLInputElement>document.getElementById("years")).value="";
    (<HTMLInputElement>document.getElementById("description")).value="";
    (<HTMLInputElement>document.getElementById("title")).value="";
    (<HTMLInputElement>document.getElementById("assigned")).placeholder=""; 
    (<HTMLInputElement>document.getElementById("days")).placeholder="Days";
    (<HTMLInputElement>document.getElementById("months")).placeholder="Months";
    (<HTMLInputElement>document.getElementById("years")).placeholder="Years";
    (<HTMLInputElement>document.getElementById("description")).placeholder="";
    (<HTMLInputElement>document.getElementById("title")).placeholder="";
    (<HTMLInputElement>document.getElementById("sel1")).value="name";
    this.members=0;
    this.teamMembers=[];
    (<HTMLElement>document.getElementById("skills")).style.display="none";
    (<HTMLElement>document.getElementById("domains")).style.display="none";
    
  }

  
  titleFocus(){
    this.Tierror=0;
  }
  ManagerFocus(){
    this.Merror=0;
    this.Merrorr=0;
  }
  TimeFocus(){
    this.Terror=0;
  }
  
  memberFocus(){
    this.errorr=0;
  }
  skillChange(a){
    this.skillValue=a.target.value;
    var skillJson={'skill': this.skillValue};
    this.newService.searchEmployeesOnSkill(JSON.stringify(skillJson)).then((data) =>{
      this.SuggestedEmp=data['result'];
    });
  }


  domainChange(a){
    this.domainValue=a.target.value;
    var domainJson={'domain': this.domainValue};
       this.newService.searchEmployeesOnDomain(JSON.stringify(domainJson)).then((data) =>{
         this.SuggestedEmp=data['result'];
       });
      }

      changeProjStatus(){
        status= (<HTMLInputElement>document.getElementById("projS")).value;
        this.proj=[];
        this.newService.getProjects(JSON.stringify({status:status,'username':this.username})).then((data) => {
          this.proj=data['result'];
              });
      }


  save(a){
    var json={};
    if((<HTMLInputElement>document.getElementById("title")).value==""){
      this.Tierror=1;
    }
    if((<HTMLInputElement>document.getElementById("days")).value == "" && (<HTMLInputElement>document.getElementById("months")).value== ""
    && (<HTMLInputElement>document.getElementById("years")).value==""){
this.Terror=1;
    }
    if((<HTMLInputElement>document.getElementById("assigned")).value==""){

      this.Merror=1;
    }
    else{
      var value=(<HTMLInputElement>document.getElementById("assigned")).value;

      if(/^([a-zA-Z]+\s\s\({1}[a-zA-Z]{1}.[a-zA-Z0-9]+[0-9]+\){1})$/.test(value)==false){
        this.Merrorr=1;
      } 
     else{
        //var name= value.split('(')[0];
        var username=value.split('(')[1].split(")")[0];
        var index=this.Managers.findIndex(x => x.username==username);
        if(index == -1){
          this.Merrorr=1;
         
        }
        else{
      
          json['Manager']=username;
          
        }
      } 
    
    }
    if(this.Terror!=1&&this.Merror!=1&&this.Tierror!=1&&this.Merrorr!=1){
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth(); 
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var Currentdate=date+"/"+month+"/"+year;
    var Time=h+":"+m+":"+s;
    
    // this.proj_count=this.proj_count+1;
    // var id=this.proj_count;
    // json['_id']=id;
    json['title']=(<HTMLInputElement>document.getElementById("title")).value;
    json['status']="New";
    var est_time={};
    est_time['days']=(<HTMLInputElement>document.getElementById("days")).value;
    est_time['months']=(<HTMLInputElement>document.getElementById("months")).value;
    est_time['years']=(<HTMLInputElement>document.getElementById("years")).value;
    json['estimated_time']=est_time;
    json['description']=(<HTMLInputElement>document.getElementById("description")).value;
    json['time']=Time;
    json['date']=Currentdate;
    var team=this.teamMembers;
    json['team']=team;
    this.newService.addProject(JSON.stringify(json)).then((data) =>{
this.proj.push(json);
alert("project added");
    });
}
  }
  projClick(a){
    
    this._dataService.setOption('project_id',a.target.attributes.id.value);
    var urll=this.router.url;
   var url ="/OrgDashboard/"+urll.split('/')[2];

    this.router.navigate([url+'/projectManagement',a.target.attributes.id.value]);
  }
status="";
  change(a){
    status=a.target.value;
    var idd=a.target.attributes.id.value.split('t')[1];
    (<HTMLInputElement>document.getElementById("project"+idd)).style.border="1px solid red";
    (<HTMLInputElement>document.getElementById("Sconfirm"+idd)).style.display="block"; 
  }

delete(a){
    status="Deleted";
    var idd=a.target.attributes.id.value.split('.')[1];
    (<HTMLInputElement>document.getElementById("project"+idd)).style.border="1px solid red";
    (<HTMLInputElement>document.getElementById("Dconfirm"+idd)).style.display="block";
  }

 edit(a){
  var id=a.target.attributes.id.value.split('.')[1];
  this.proj_id=id;
  (<HTMLInputElement>document.getElementById("assigned")).value=""; 
  (<HTMLInputElement>document.getElementById("days")).value="";
  (<HTMLInputElement>document.getElementById("months")).value="";
  (<HTMLInputElement>document.getElementById("years")).value="";
  (<HTMLInputElement>document.getElementById("description")).value="";
  (<HTMLInputElement>document.getElementById("title")).value="";

  this.newService.getProject(JSON.stringify({'_id':id})).then((data) =>{   
 (<HTMLInputElement>document.getElementById('title') ).placeholder=data['result'][0]['title'];
 (<HTMLInputElement>document.getElementById('assigned') ).placeholder=data['result'][0]['Manager'];
 (<HTMLInputElement>document.getElementById('days') ).placeholder=data['result'][0]['estimated_time']['days'];
 (<HTMLInputElement>document.getElementById('months') ).placeholder=data['result'][0]['estimated_time']['months'];
 (<HTMLInputElement>document.getElementById('years') ).placeholder=data['result'][0]['estimated_time']['years'];
 (<HTMLInputElement>document.getElementById('description') ).value=data['result'][0]['description'];
 this.teamMembers=data['result'][0]['team'];
 this.members=this.teamMembers.length;
  });
 } 

 isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

 editSave(a){
   
var json={};
json['_id']=this.proj_id;
json['title']= (<HTMLInputElement>document.getElementById('title') ).value;
var value=(<HTMLInputElement>document.getElementById("assigned")).value;
if(value!=""){
      if(/^([a-zA-Z]+\s\s\({1}[a-zA-Z]{1}.[a-zA-Z0-9]+[0-9]+\){1})$/.test(value)==false){
        this.Merrorr=1;
      } 
     else{
        var username=value.split('(')[1].split(")")[0];
        var index=this.Managers.findIndex(x => x.username==username);
        if(index == -1){
          this.Merrorr=1;
         
        }
        else{
      
          json['Manager']=username;
          
        }
      }
    }

var j={};
j['days']=(<HTMLInputElement>document.getElementById('days') ).value;
if(j['days']=="")
j['days']=(<HTMLInputElement>document.getElementById('days') ).placeholder;

j['months']=(<HTMLInputElement>document.getElementById('months') ).value;
if(j['months']=="")
j['months']=(<HTMLInputElement>document.getElementById('months') ).placeholder;

j['years']=(<HTMLInputElement>document.getElementById('years') ).value;
if(j['years']=="")
j['years']=(<HTMLInputElement>document.getElementById('months') ).placeholder;

Object.keys(j).forEach((key) => (j[key] == "") && delete j[key]);
if(!this.isEmpty(j)){
  json['estimated_time']=j;
}

json['description']=(<HTMLInputElement>document.getElementById('description') ).value;

Object.keys(json).forEach((key) => (json[key] == "") && delete json[key]);
json['team']=this.teamMembers;
this.newService.updateProject(JSON.stringify(json)).then((data)=>{
  alert("project edited successfully");
this.proj_id=0;
})
 }
  preSelect;
  fo=[];
  focus(a){
    this.preSelect=a.target.value;
    this.fo.push(this.preSelect);
  }

  Sno(a){
    var idd=a.target.attributes.id.value.split('o')[1];
    (<HTMLInputElement>document.getElementById("project"+idd)).style.border="";
    (<HTMLInputElement>document.getElementById("Sconfirm"+idd)).style.display="none";
  }

  Dno(a){
    var idd=a.target.attributes.id.value.split('o')[1];
    (<HTMLInputElement>document.getElementById("project"+idd)).style.border="";
    (<HTMLInputElement>document.getElementById("Dconfirm"+idd)).style.display="none";
  }

yes(a){
var idd=a.target.attributes.id.value.split('s')[1];
var json={};
json['_id']=parseInt(idd);
json['status']=status;
this.newService.projectStatusChange(JSON.stringify(json)).then((data) => {

  if(status=="Deleted"){
var index=this.proj.findIndex(x => x._id==idd);
    this.proj.splice(index, 1);}
    else{
      (<HTMLInputElement>document.getElementById("project"+idd)).style.border="";
      (<HTMLInputElement>document.getElementById("Sconfirm"+idd)).style.display="none";
    }
});
  }

project(){
  this.router.navigateByUrl('OrgDashboard/:id/projectManagement');
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

}
