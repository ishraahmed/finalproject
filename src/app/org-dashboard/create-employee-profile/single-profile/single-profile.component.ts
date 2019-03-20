import { Component, OnInit } from '@angular/core';

import { SignupService } from 'src/app/signup.service';
import { DataService } from 'src/app/data.service';
import * as $ from 'jquery';
import { Router } from "@angular/router";

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.css']
})
export class SingleProfileComponent implements OnInit {
  model: any = {};
  Orgname;  
  ab=0;
  username="";
  
  // abr1: string = "model.Skill1";
  first=1;
  inserted=1;
  items=["Skill1"];
  count=1;
  abr: string = 'Skill1';

  constructor(public newService :SignupService,public _dataService: DataService,private router:Router) { }

  ngOnInit() {
    this.model.password="";
    this.model.age="";
    this.model.date_of_birth="";
    this.model.CNIC="";
    this.model.Phone_No="";
    this.model.address="";

    this.Orgname = this._dataService.getOption();  
    $('#someDiv').hide();
    $('#someDiv1').hide();
  }
  addInput(){
    this.count=this.count+1;
    this.items.push("Skill"+ this.count.toString());
  //  alert(this.abr);
  }
onSubmit(event:any){
var skills=[];
for (let i in this.items) {
  var a=this.items[i];
  skills.push((<HTMLInputElement>document.getElementById(a)).value);
  console.log((<HTMLInputElement>document.getElementById(a)).value); 
}
if((<HTMLInputElement>document.getElementById("Skill1")).value == ""){
  skills=[]
}
this.model["skills"]=skills;

 $('#someDiv1').show(function(){
  window.scrollTo(0, document.body.scrollHeight);
});

alert(JSON.stringify(this.model))
  this.newService.SingleEmpSave(JSON.stringify(this.model)).then((data) =>{
    if(data['inserted']==1){
this.username=data['username']
    this.first=0;
    $('#someDiv1').hide();
    $('#someDiv').show(function(){
      window.scrollTo(0, document.body.scrollHeight);
  });
    this.ab=2;}
    else if(data['inserted']==0){
      $('#someDiv1').hide();
this.inserted=0;
    }
   });
   
}
fun(){
  (<HTMLFormElement>document.getElementById('f')).reset(); 
  $('#someDiv').hide();
  $('#someDiv1').hide();
  window.scrollTo(0,0);
  this.first=1;
  // $('#f').reset();
  // (<HTMLInputElement>document.getElementById(a)).reset();
  // document.getElementById("client").reset();
}
}
