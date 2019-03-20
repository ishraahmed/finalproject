import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SignupService} from '../signup.service';

import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email = "Email";
  model: any = {};
  response;
  users;
  abc="";
  ab=0;
  fuc(){
    this.abc="";
  }
  onSubmit() {
    this.ab=2;
    if(this.model.Username == "admin" && this.model.password=="1111111"){
this.auth.sendToken(this.model.password);
this._dataService.setOption('username',this.model.Username);
this._dataService.setOption('password',this.model.password);
// alert(this._dataService.getOption()["username"]);
this.router.navigate(['/OrgDashboard',this.model.Username]);

    }
    else{
      this.newService.Emplogin(JSON.stringify({'username':this.model.Username,'password':this.model.password})).then((data) =>{
if(data['exists']==1){
  this.auth.sendToken(this.model.Username);
  this._dataService.setOption('username',this.model.Username);
  this._dataService.setOption('password',this.model.password);
  this.router.navigate(['/OrgDashboard',this.model.Username]);
}
else{
  this.ab=1;
this.abc="invalid credentials";
}
      });

    }
  }
  constructor(public newService :SignupService,private router:Router,
    private auth: AuthService, public _dataService: DataService) { }

  ngOnInit() {
  }
 
}
