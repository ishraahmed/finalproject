import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjective-evaluation',
  templateUrl: './subjective-evaluation.component.html',
  styleUrls: ['./subjective-evaluation.component.css']
})
export class SubjectiveEvaluationComponent implements OnInit {
  public selected: any;
  model: any = {};
  abc="Manager";
  constructor() { }

  ngOnInit() {
  }
  onProfitSelectionChange(entry): void {
    this.model.ForeignCompany= entry;
    this.abc=this.model.ForeignCompany ;
}
   formButton(){
//alert(this.abc);
  }
}
