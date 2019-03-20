import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SignupService } from 'src/app/signup.service';
import * as $ from 'jquery'; 
import { Jsonp } from '@angular/http';
import { element } from 'protractor';

@Component({
  selector: 'app-view-all-emplloyee',
  templateUrl: './view-all-emplloyee.component.html',
  styleUrls: ['./view-all-emplloyee.component.css']
})
export class ViewAllEmplloyeeComponent implements OnInit {
  [x: string]: any;
  Orgname;
  model: any = {};
  total;
  updated=0;
  constructor(public newService :SignupService,public _dataService: DataService) { }

  ngOnInit() {
  
    this.Orgname = this._dataService.getOption();  
    this.newService.getEmployees().then((data) =>{
      this.json=data['result'];
      this.loaded=1;
      this.total=this.json.length;
     });

     
  }
  edit(a){
    var inputs=Array.from(document.getElementsByClassName(a.target.attributes.id.value));
    inputs.forEach(element => {
      console.log((<HTMLInputElement>element).value);
      (<HTMLInputElement>element).style.display="block";
    //   if(element.name != "username")
    //  element.removeAttribute("readonly");
    });

let nodes = document.getElementsByClassName("l"+a.target.attributes.id.value);
for (let i = 0; nodes[i]; i++) {
    (nodes[i] as HTMLElement).style.display="none";
}
document.getElementById("edit"+a.target.attributes.id.value).style.display="none";
document.getElementById("save"+a.target.attributes.id.value).style.display="block";

  }

cancel(a){
  this.EditPressed=0;
  var inputs=Array.from(document.getElementsByClassName(a.target.attributes.id.value));
  inputs.forEach(element => {
    console.log((<HTMLInputElement>element).value);
    (<HTMLInputElement>element).style.display="none";
  //   if(element.name != "username")
  //  element.removeAttribute("readonly");
  });
let nodes = document.getElementsByClassName("l"+a.target.attributes.id.value);
for (let i = 0; nodes[i]; i++) {
  (nodes[i] as HTMLElement).style.display="block";
}

document.getElementById("edit"+a.target.attributes.id.value).style.display="block";
document.getElementById("save"+a.target.attributes.id.value).style.display="none";
}

save(a){
  document.getElementById("loader"+a.target.attributes.id.value).style.display="block";
  document.getElementById("save"+a.target.attributes.id.value).style.display="none";
  this.savePressed=1;
  this.EditPressed=2;
  var keys=[];
  var values=[];
  var inputs2=Array.from(document.getElementsByName(a.target.attributes.id.value)); 
  alert(inputs2.length);
  inputs2.forEach(element => {
keys.push(element.getAttribute("placeholder"));
  });
  var inputs=Array.from(document.getElementsByClassName(a.target.attributes.id.value));
  inputs.forEach(element => {
    values.push((<HTMLInputElement>element).value.trim());
  });

var jsonn={};
var f;
for(f=0 ; f<keys.length;f++){
  // alert(keys[f]);
  // alert(values[f]);
  jsonn[keys[f]]=values[f];
}
var skills=[];
skills=jsonn["skills"].split(",");
jsonn["skills"]=skills;
alert(JSON.stringify(jsonn));

this.newService.updateEmployee(JSON.stringify(jsonn)).then((data) =>{
  if(data['inserted']==1){
    this.updated=1;
    document.getElementById("loader"+a.target.attributes.id.value).style.display="none";
    document.getElementById("edit"+a.target.attributes.id.value).style.display="block";
    this.cancel(a);
    alert("recored update")
  }

  });

}
}