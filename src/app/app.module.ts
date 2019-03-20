import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';  

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {SignupService} from './signup.service'
import {DataService} from './data.service'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from './org-dashboard/dashboard/dashboard.component';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { SettingsComponent } from './org-dashboard/create-profile/create-profile.component';
import { CriteriaComponent } from './org-dashboard/criteria/criteria.component';
import { SingleProfileComponent } from './org-dashboard/create-employee-profile/single-profile/single-profile.component';
import { MultipleProfileComponent } from './org-dashboard/create-employee-profile/multiple-profile/multiple-profile.component';
import { ViewEditEmployeeComponent } from './org-dashboard/view-edit-employee/view-edit-employee.component';
import { SearchEmployeeComponent } from './org-dashboard/view-edit-employee/search-employee/search-employee.component';
import { ViewAllEmplloyeeComponent } from './org-dashboard/view-edit-employee/view-all-emplloyee/view-all-emplloyee.component';
import { SubjectiveEvaluationComponent } from './org-dashboard/criteria/subjective-evaluation/subjective-evaluation.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponentComponent } from './org-dashboard/criteria/form-component/form-component.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { BoardsComponent } from './project-management/boards/boards.component';
import { ProjectsComponent } from './org-dashboard/projects/projects.component';
import { BacklogsComponent } from './project-management/backlogs/backlogs.component';
import { ProfileComponent } from './org-dashboard/profile/profile.component';
import { ProjectOverviewComponent } from './project-management/project-overview/project-overview.component';
import { WorkItemsComponent } from './project-management/work-items/work-items.component';
import { CreateEmployeeProfileComponent } from './org-dashboard/create-employee-profile/create-employee-profile.component';


// const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent
//   }
// ];
// export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    DashboardComponent,
    OrgDashboardComponent,
    SettingsComponent,
    CriteriaComponent,
    SingleProfileComponent,
    MultipleProfileComponent,
    ViewEditEmployeeComponent,
    SearchEmployeeComponent,
    ViewAllEmplloyeeComponent,
    SubjectiveEvaluationComponent,
    FormComponentComponent,
    ProjectManagementComponent,
    BoardsComponent,
    ProjectsComponent,
    BacklogsComponent,
    ProfileComponent,
    ProjectOverviewComponent,
    WorkItemsComponent,
    CreateEmployeeProfileComponent
    
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component: LoginComponent},
      {path:'OrgDashboard/:username/projectManagement/:id', component: ProjectManagementComponent,canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path:'overview' ,component:ProjectOverviewComponent},
        {path: 'boards',  component : BoardsComponent  },
        {path:'backlogs', component: BacklogsComponent},
        {path:'workitems', component: WorkItemsComponent}
      ]
    },
      {path:'OrgDashboard/:username', component: OrgDashboardComponent,canActivate: [AuthGuard],
      children: [
        {path: 'Dashboard',  component : DashboardComponent  },
        {path: 'projects',  component : ProjectsComponent  },
        {path: 'profile',  component : ProfileComponent  },
       { path: 'employee', component: CreateEmployeeProfileComponent,
      children:[
        { path: '', redirectTo: 'single', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'single', component: SingleProfileComponent },
        { path: 'multiple', component: MultipleProfileComponent }
      ]
      },
       { path: 'criteria', component: CriteriaComponent,
       children:[
        { path: '', redirectTo: 'form', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'form', component: FormComponentComponent },
        
      ]},
     
      
      
       { path: 'viewEditEmployee', component: ViewEditEmployeeComponent,
      children:[
        { path: '', redirectTo: 'searchEmployee', pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'searchEmployee', component: SearchEmployeeComponent },
        { path: 'ViewAllEmployee', component: ViewAllEmplloyeeComponent }
      ]
      }
      ]
    
    },
      {path:'EmpDashboard', component: DashboardComponent}
    ])
  ],
  providers: [SignupService,HttpModule,AuthGuard,AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
