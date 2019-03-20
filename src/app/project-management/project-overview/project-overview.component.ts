import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signup.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(public newService :SignupService,private router: Router) { }
project_id;
isMember;
team;
totalSP=0;
completedSP=0;
acceptedSP=0;
activeSP=0;
newSP=0;
  ngOnInit() {
    var url=this.router.url;
    var id=url.split('/');
    this.project_id=parseInt( id[id.length-2]);
    var username=id[2];
    this.newService.checkprojectCred(JSON.stringify({'project_id':this.project_id,'username':username})).then((data) =>{
      if(data['exists']==1){
        this.newService.getProject(JSON.stringify({'_id':this.project_id})).then((data)=>{
          this.team=data['result'][0]['team'];
        });
        this.newService.getUserStory(JSON.stringify({project_id: this.project_id})).then((data)=>{
          for(var i=0;i<data['result'].length;i++){
            this.totalSP=this.totalSP+parseInt(data['result'][i]['story_points']);
              if( data['result'][i]['state'] == "New" )
              this.newSP=this.newSP+parseInt(data['result'][i]['story_points']);
              if( data['result'][i]['state'] == "In Progress" )
              this.activeSP=this.activeSP+parseInt(data['result'][i]['story_points']);
              if( data['result'][i]['state'] == "Completed" )
              this.completedSP=this.completedSP+parseInt(data['result'][i]['story_points']);
              if( data['result'][i]['state'] == "Accepted" )
              this.acceptedSP=this.acceptedSP+parseInt(data['result'][i]['story_points']);
          }
          
        });
      }
    else{
      this.isMember=0;
    }
    });
  }

}
