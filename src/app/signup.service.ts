import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions, ResponseContentType } from '@angular/http'; 
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : Http) { 
    
  }


   SingleEmpSave(data){
     // console.log(data[0]['3']);
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      var arr=[data];
       return this.http.post('http://localhost:8080/api/employee/saveSingleEmployeeData',arr,options).toPromise().then(res => res.json());
      
    }
 
    updateEmployee(data){
     // console.log(data[0]['3']);
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      var arr=[data];
       return this.http.post('http://localhost:8080/api/employee/updateEmployeeData',arr,options).toPromise().then(res => res.json());
      
    }
    saveMultipleEmployees(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
       return this.http.post('http://localhost:8080/api/employee/saveMultipleEmployees',data,options).toPromise().then(res => res.json());
      
    }


  searchEmployees(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/api/employee/searchEmp',data,options).toPromise().then(res => res.json()); 
  }

  getEmployees(){  
    return this.http.get('http://localhost:8080/api/employee/getEmp').toPromise().then(res => res.json());
  }

  getuser(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/api/employee/getuser',data,options).toPromise().then(res => res.json()); 
  
  }
  updateEmployeeProfile(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/api/employee/updateEmployeeProfile',data,options).toPromise().then(res => res.json()); 
  
  }
  Emplogin(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/api/login/Emplogin',data,options).toPromise().then(res => res.json());
    
  }

 
  checkprojectCred(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
     return this.http.post('http://localhost:8080/api/userStory/checkprojectCred',data,options).toPromise().then(res => res.json());
    
  }
   updateUserStoryStatus(data){
    // console.log(data[0]['3']);
     let options=new RequestOptions();
     options.headers=new Headers();
     options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/userStory/updateUserStoryStatus',data,options).toPromise().then(res => res.json());
     
   }

   getSingleUserStory(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
     return this.http.post('http://localhost:8080/api/userStory/getSingleUserStory',data,options).toPromise().then(res => res.json());
    
   }

   editUserStory(data){
    let options=new RequestOptions();
    options.headers=new Headers();
    options.headers.append('Content-Type','application/json');
     return this.http.post('http://localhost:8080/api/userStory/editUserStory',data,options).toPromise().then(res => res.json());
    
   }

   getUserStory(data){
    let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/userStory/getUserStory',data,options).toPromise().then(res => res.json());
  }

   saveUserStory(data){
      let options=new RequestOptions();
        options.headers=new Headers();
        options.headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:8080/api/userStory/saveUserStory',data,options).toPromise().then(res => res.json());
    }

    addProject(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/addProject',data,options).toPromise().then(res => res.json());
    
    }

    getProjects(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/getProjects',data,options).toPromise().then(res => res.json());
    
    }

    projectStatusChange(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/projectStatusChange',data,options).toPromise().then(res => res.json());
    }

    getManagers(){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/getManagers',options).toPromise().then(res => res.json());
      
    }
    getProjectEmployees(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/userStory/getProjectEmployees',data,options).toPromise().then(res => res.json());
      
    }

    getProjectSprints(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/userStory/getProjectSprints',data,options).toPromise().then(res => res.json());
      
    }
    getSkills(){
      return this.http.get('http://localhost:8080/api/project/getSkills').toPromise().then(res => res.json());    
    }

    getDomain(){
      return this.http.get('http://localhost:8080/api/project/getDomain').toPromise().then(res => res.json());
    }

    getProject(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/getProject',data,options).toPromise().then(res => res.json());
      
    }
    updateProject(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/updateProject',data,options).toPromise().then(res => res.json());
      
    }

    searchEmployeesOnSkill(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/searchEmployeesOnSkill',data,options).toPromise().then(res => res.json());
      
    }

    searchEmployeesOnDomain(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/project/searchEmployeesOnDomain',data,options).toPromise().then(res => res.json());     
    }

    saveSprint(data){
      console.log("as");
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/saveSprint',data,options).toPromise().then(res => res.json());     
   
    }

    getSprints(data){
      console.log("as");
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getSprints',data,options).toPromise().then(res => res.json());     
   
    }

    saveTask(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/saveTask',data,options).toPromise().then(res => res.json());     
   
    }
    saveBug(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/saveBug',data,options).toPromise().then(res => res.json());     
   
    }
    getBugs(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getBugs',data,options).toPromise().then(res => res.json());     
   
    }
    getBug(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getBug',data,options).toPromise().then(res => res.json());     
   
    }
    editBug(data){
      console.log("hgf");
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/editBug',data,options).toPromise().then(res => res.json());     
   
    }

    getTask(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getTask',data,options).toPromise().then(res => res.json());     
   
    }

    getTasks(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getTasks',data,options).toPromise().then(res => res.json());     
   
    }

    updateTask(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/updateTask',data,options).toPromise().then(res => res.json());     
   
    }
    getUserstoryTasks(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getUserstoryTasks',data,options).toPromise().then(res => res.json());     
   
    }
    getSprintUserstoryTasks(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/getSprintUserstoryTasks',data,options).toPromise().then(res => res.json());     
   
    }

    updateUserStoryIteration(data){
      
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/userStory/updateUserStoryIteration',data,options).toPromise().then(res => res.json());     
   
    }

    updateTaskIteration(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/updateTaskIteration',data,options).toPromise().then(res => res.json());     
   
    }

    deleteTask(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/backlog/deleteTask',data,options).toPromise().then(res => res.json());     
   
    }

    addForm(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/form/addForm',data,options).toPromise().then(res => res.json());     
   
    }

    getForm(data){
      let options=new RequestOptions();
      options.headers=new Headers();
      options.headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:8080/api/form/getForm',data,options).toPromise().then(res => res.json());     
   
    }
  // login(data) {
  //   let options=new RequestOptions();
  //   options.headers=new Headers();
  //   options.headers.append('Content-Type','application/json');
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = 'http://localhost:8080/api/login';
  //     this.http.post(apiURL,data,options).toPromise()
  //       .then(
  //         res => { // Success
  //           //res.json().results;
  //           res.json();
  //           resolve();
  //           console.log(res.json());
            
  //         }
  //       );
  //   });
  //   console.log(promise);
  //   return promise;
  // }

  // login(data){
  //   let options=new RequestOptions();
  //   options.headers=new Headers();
  //   options.headers.append('Content-Type','application/json');
  //   return this.http.post('http://localhost:8080/api/login',data,options).pipe(map(res => res.json()))
  // }
}
