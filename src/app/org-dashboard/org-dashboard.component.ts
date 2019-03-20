import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {SignupService } from 'src/app/signup.service';
import { DataService } from 'src/app/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnInit {
  id;
  isadmin;
  constructor(private router:Router,private auth: AuthService,private newService: SignupService) {
    
   }

  ngOnInit() {
    var url= this.router.url;
    var username;
    username= url.split('/')[2];
    this.newService.getuser(JSON.stringify({'username':username})).then((data)=>{
      if(data['result']['Designation']=='admin'){
this.isadmin=1;
      }
      else{
        this.isadmin=0;
      }
    });
 
  }
logout(){
  this.auth.logout();
}
employeeClick(){
  if(this.isadmin==1)
  document.getElementById('employee').className = 'collapsed active';
  if(this.isadmin==0)
  document.getElementById('profile').className = ' ';
  document.getElementById('dashboard').className = ' ';
  document.getElementById('projects').className = ' ';
}

dashboardClick(){
  if(this.isadmin==1)
  document.getElementById('employee').className = 'collapsed';
  if(this.isadmin==0)
  document.getElementById('profile').className = ' ';
  document.getElementById('dashboard').className = 'active';
  document.getElementById('projects').className = ' ';
}
projectClick(){
  if(this.isadmin==1)
  document.getElementById('employee').className = 'collapsed';
  if(this.isadmin==0)
  document.getElementById('profile').className = ' ';
  document.getElementById('dashboard').className = '';
  document.getElementById('projects').className = 'active';
}
profileClick(){
  if(this.isadmin==1)
  document.getElementById('employee').className = 'collapsed';
  if(this.isadmin==0)
  document.getElementById('profile').className = 'active';
  document.getElementById('dashboard').className = '';
  document.getElementById('projects').className = ' ';
}
}
