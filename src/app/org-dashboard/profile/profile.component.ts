import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SignupService } from 'src/app/signup.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: any = {};
  passwordError=0;
  emailError=0;
  updated=0;
  username;
  constructor(private router: Router,private newService: SignupService) { }

  ngOnInit() {
   
var url= this.router.url;
this.username= url.split('/')[2];

this.newService.getuser(JSON.stringify({'username':this.username})).then((data)=>{
  (<HTMLInputElement>document.getElementById('username')).value=data['result']['username'];
  (<HTMLInputElement>document.getElementById('Firstname')).value=data['result']['Firstname'];
  (<HTMLInputElement>document.getElementById('Lastname')).value=data['result']['Lastname'];
  (<HTMLInputElement>document.getElementById('Designation')).value=data['result']['Designation'];
  (<HTMLInputElement>document.getElementById('domain')).value=data['result']['domain'];
  (<HTMLInputElement>document.getElementById('Skill')).value=data['result']['skills'];
  (<HTMLInputElement>document.getElementById('PhoneNo')).placeholder=data['result']['Phone_No'];
  (<HTMLInputElement>document.getElementById('email')).placeholder=data['result']['email'];
  (<HTMLInputElement>document.getElementById('password')).placeholder=data['result']['password'];
});
  }
  onSubmit(){
    // alert((<HTMLInputElement>document.getElementById('PhoneNo')).value);
    var json={};    
json['username']=this.username;
if((<HTMLInputElement>document.getElementById('PhoneNo')).value!=""){
  json['Phone_No']=(<HTMLInputElement>document.getElementById('PhoneNo')).value;
}


if((<HTMLInputElement>document.getElementById('password')).value!=""){
  if(/^(.{6,})$/.test((<HTMLInputElement>document.getElementById('password')).value)==true)
  json['password']=(<HTMLInputElement>document.getElementById('password')).value;
  else
  this.passwordError=1;
}

if((<HTMLInputElement>document.getElementById('email')).value!=""){
  if(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test((<HTMLInputElement>document.getElementById('email')).value)==true)
  json['email']=(<HTMLInputElement>document.getElementById('email')).value;
  else
  this.emailError=1;
}
// alert(JSON.stringify(json));
// if (Object.keys(json).length > 1){
//   alert('update');
// }
if(this.emailError!=1 && this.passwordError!=1 && Object.keys(json).length > 1)
this.newService.updateEmployeeProfile(JSON.stringify(json)).then((data)=>{
  if(data['inserted']==1){
this.updated=1;
  }

})


    
  }
  removeemailError(){
    this.emailError=0;
  }
  removepasswordError(){
    this.passwordError=0;
  }
}
