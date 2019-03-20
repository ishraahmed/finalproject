import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-employee-profile',
  templateUrl: './create-employee-profile.component.html',
  styleUrls: ['./create-employee-profile.component.css']
})
export class CreateEmployeeProfileComponent implements OnInit {
  buttonclr : string = '#f1f1f1';
  c="active";
  c1="";
  constructor() { }

  ngOnInit() {
  }
  change(){
    this.c="active";
    this.c1="";
  }
  change1(){
    this.c1="active";
    this.c="";
  }
}
