import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
  }
  workItemsClick(){
    document.getElementById('overview').className = ' ';
    document.getElementById('board').className = ' ';
    document.getElementById('backlog').className = ' ';
    document.getElementById('workItems').className = 'active';
  }
  overviewClick(){
    document.getElementById('overview').className = 'active';
    document.getElementById('board').className = ' ';
    document.getElementById('backlog').className = ' ';
    document.getElementById('workItems').className = ' ';
  }
  boardClick(){
    document.getElementById('overview').className = '';
    document.getElementById('board').className = 'active';
    document.getElementById('backlog').className = ' ';
    document.getElementById('workItems').className = ' ';
  }
  backlogClick(){
    document.getElementById('overview').className = ' ';
    document.getElementById('board').className = ' ';
    document.getElementById('backlog').className = 'active';
    document.getElementById('workItems').className = ' ';
  }
  dashboardClick(){
    var url=this.router.url;
    var id=url.split('/');
    url=id[0]+"/"+id[1]+"/"+id[2];
    this.router.navigateByUrl(url);
  }
}
