import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  constructor(public newService :SignupService,private router: Router) { }
  c="active";
  c1="";
  c2="";
  form={};
  ngOnInit() {
    this.newService.getForm(JSON.stringify({'designation':'manager'})).then((data) =>{
this.form=data['result'][0];
alert(JSON.stringify( this.form));
    });
    var arr=this.router.url.split("/")
//alert(arr[arr.length-1])
if(arr[4] == "managerEvaluation"){
  this.c="active";
  this.c1="";
  this.c2="";
}
else if(arr[4] == "teamLeadEvaluation"){
 
  this.c1="active";
  this.c="";
  this.c2="";
}
else if(arr[4] == "teamMembersEvaluation"){
  this.c="";
  this.c1="";
  this.c2="active";
}
  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
}
  change(){
    this.c="active";
    this.c1="";
    this.c2="";
  }
  change1(){
    this.c1="active";
    this.c="";
    this.c2="";
  }
  change2(){
    this.c1="";
    this.c="";
    this.c2="active";
  }

}
