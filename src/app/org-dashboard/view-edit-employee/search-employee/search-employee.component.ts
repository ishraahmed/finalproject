import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SignupService } from 'src/app/signup.service';
 

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
arr1;
Orgname;
json;
data=[];
ObjectKeys=Object.keys;
loaded=2;
total;

  js={};
  constructor(public newService :SignupService,public _dataService: DataService) {
   
   }

  ngOnInit() {
    
    // this.Orgname = this._dataService.getOption();  
    // alert(JSON.stringify(this.Orgname));
    this.arr1=["Firstname","Lastname","username","skills","CNIC","Designation","domain"];

  }

search(){

  this.data=[];
  var searchBy=(<HTMLInputElement>document.getElementById("sel1")).value;
  if(searchBy=="Search by")
  alert("please choose option to search record by!");
  else{
    this.loaded=0;
    var searchVal=(<HTMLInputElement>document.getElementById("search")).value;
    // alert(searchBy+" "+searchVal);
   
    this.newService.searchEmployees(JSON.stringify({searchBy:searchBy,search:searchVal})).then((data) =>{
      this.loaded=1;
      this.data=data['result'];
      this.total=data['result'].length;
    });
    
  }
}

edit(a){

 //enable input fields on click on edit
    var inputs=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('input'));
    inputs.forEach(element => {
      console.log(element);
      if(element.name != "username")
     element.removeAttribute("readonly");
    });

 //enable update button
    var g="Update"+a.target.attributes.id.value;
    var updateButton=Array.from(document.getElementsByName(g));
    updateButton.forEach(element => {
     element.removeAttribute("disabled");
    });

  //enable cancel button
    var g="Cancel"+a.target.attributes.id.value;
    var cancelButton=Array.from(document.getElementsByName(g));
    cancelButton.forEach(element => {
     element.removeAttribute("disabled");
    });

    //remove info box 
    document.getElementById("info"+a.target.attributes.id.value).style.display="none";   
  }
 
 
  k;
  update(a){

  //disable update button
    
    this.k="Update"+a.target.attributes.id.value;
    var updateButton=Array.from(document.getElementsByName(this.k));
    updateButton.forEach(element => {
        element.setAttribute("disabled","true");
    });

  //disable cancel button
    var g="Cancel"+a.target.attributes.id.value;
    var cancelButton=Array.from(document.getElementsByName(g));
    cancelButton.forEach(element => {
     element.setAttribute("disabled","true");
    });

    
    var progress=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('span'));
    progress.forEach(element => {
      console.log(element);
     element.style.display="";
    });
  
    
   

    //get valus of input feilds
       var inputs=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('input'));
      inputs.forEach(element => {
        this.js[element.name]=element.value;
      });

//alert(JSON.stringify( this.js));

  //make array of skills seperated by comma in input feild
     var arr=this.js['skills'].split(',');
     arr.forEach(element => {
      console.log(element);
    });
    this.js['skills']=arr;
    //alert(JSON.stringify( this.js));

      this.newService.updateEmployee(JSON.stringify(this.js)).then((data) =>{
       if(data['inserted']==1){
         inputs.forEach(element => {
            element.placeholder=this.js[element.name];
            element.setAttribute("readonly","true");
        });

    //remove update progress loader    
    var inputs2=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('span'));
    inputs2.forEach(element => {
      console.log(element);
     element.style.display="none";
    });

    //display info box
    var inputs3=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('div'));
    inputs3.forEach(element => {
      console.log(element);

      
     element.style.display="";
    });
       }
     
       });
      
    }


cancel(a){
      // alert("sd");
       var inputs=Array.from(document.getElementById(a.target.attributes.id.value).getElementsByTagName('input'));
       inputs.forEach(element => {
         element.setAttribute("readonly","true");
     });
     this.k="Update"+a.target.attributes.id.value;
     var inputs1=Array.from(document.getElementsByName(this.k));
       inputs1.forEach(element => {
         element.setAttribute("disabled","true");
     });
     var g="Cancel"+a.target.attributes.id.value;
    var inputs2=Array.from(document.getElementsByName(g));
    inputs2.forEach(element => {
     element.setAttribute("disabled","true");
    });
     
     }
}
