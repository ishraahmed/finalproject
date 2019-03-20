import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class SettingsComponent implements OnInit {
 // @Input('childMessage') childMessage: string;
  
buttonclr : string = '#f1f1f1';
c="active";
c1="";
  constructor() {
    //alert(this.childMessage);
   }

  ngOnInit() {
    document.getElementById("main").style.display="none";
  }
fun(){
  alert("wew");
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
