import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

userStory=[];
US_counter=0;

  constructor() { }

  ngOnInit() {
  }
add(a){
  this.US_counter++;
  this.userStory.push("us_"+this.US_counter); 
}

  save(a){
    var target_id=a.target.attributes.id.value;
    var arr=target_id.split("b");
    target_id=arr[1];
    alert(target_id);
    (<HTMLInputElement>document.getElementById("l"+target_id)).innerHTML=(<HTMLInputElement>document.getElementById("i"+target_id)).value;
    (<HTMLInputElement>document.getElementById("l"+target_id)).style.display="block";
    (<HTMLInputElement>document.getElementById("i"+target_id)).style.display="none";
    (<HTMLInputElement>document.getElementById("b"+target_id)).style.display="none";
    (<HTMLInputElement>document.getElementById("s"+target_id)).style.display="flex";




  }
}
