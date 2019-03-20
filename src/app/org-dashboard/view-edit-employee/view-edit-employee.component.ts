import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-edit-employee',
  templateUrl: './view-edit-employee.component.html',
  styleUrls: ['./view-edit-employee.component.css']
})
export class ViewEditEmployeeComponent implements OnInit {
b="abc";
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
