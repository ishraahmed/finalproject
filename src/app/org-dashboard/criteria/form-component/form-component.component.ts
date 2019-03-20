import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignupService } from 'src/app/signup.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  constructor(private router: Router,private newService: SignupService) { }
  dropdownValue="Section";
  selected=1;
 radioNo;
 checkboxesNo;
 questionNo;
 ratingsNo;
 labelNo;
 count=0;
countt=[];
cid;
  ngOnInit() {
  }

  getSelectedDropdown(link) {
    if(link==1){
      this.dropdownValue="Section"
    }
    else if(link==2){
      this.dropdownValue="Radio Buttons"
    }
    else if(link==3){
      this.dropdownValue="Checkboxes"
    }
    else if(link==4){
      this.dropdownValue="Questions"
    }
    else if(link==6){
      this.dropdownValue="label"
    }
    this.selected=link;
    // alert(link);    
}


addElement(){
  if( this.selected==1){
 this.creatSection(this.count);
  this.countt.push(1);
}
 else if(this.selected==2){
   alert('ad');
  var radd = document.getElementById('rad');
  $('#rad').attr('data-target','#myModal'); 
  this.countt.push(2);
  this.cid=this.count;
}

 else if(this.selected==6){
  this.countt.push(6);
  this.createLabel(this.count);
 }
 else if(this.selected==3){
  this.countt.push(3);
  this.cid=this.count;
  // this.createCheckboxes(this.count);
 }
 else if(this.selected==4){
  this.countt.push(4);
  this.createQuestion(this.count);
 }
  
 this.count++;
}

createQuestion(id){
  this.createLabel("que"+id);
  var link = document.createElement("textarea");
  link.setAttribute('id',"ans"+id);
  link.style.width="98%";
  document.getElementById("formDiv").appendChild(link);
}
abc(){
  document.getElementById('dg').style.display="none";
}

createCheckboxes(id,num){
  this.createLabel("check"+id);
  for(var i=0;i<num;i++){
    var link = document.createElement("label");
    link.innerHTML="Option"+i;
    link.className="checkbox-inline";
    link.setAttribute('contenteditable','true');
    link.setAttribute('id',"op"+i+id);
  
    var inp = document.createElement("input");
    inp.type="checkbox";
    inp.name='op'+id;
    inp.style.marginLeft="5px";
    link.appendChild(inp);
    document.getElementById("formDiv").appendChild(link);
  }
  var linebreak1 = document.createElement("br");
  document.getElementById("formDiv").appendChild(linebreak1);
}

createRadiobuttons(id,num){
  this.createLabel("rad"+id);
  for(var i=0;i<num;i++){
    var link = document.createElement("label");
    link.innerHTML="Option"+i;
    link.className="radio-inline";
    link.setAttribute('contenteditable','true');
    link.setAttribute('id',"op"+i+id);
  
    var inp = document.createElement("input");
    inp.type="radio";
    inp.name='op'+id;
    inp.style.marginLeft="5px";
    link.appendChild(inp);
    document.getElementById("formDiv").appendChild(link);
  }
  // var link = document.createElement("label");
  // link.innerHTML="Option1";
  // link.className="radio-inline";
  // link.setAttribute('contenteditable','true');
  // link.setAttribute('id',"op1"+id);

  // var inp = document.createElement("input");
  // inp.type="radio";
  // inp.name='op'+id;
  // inp.style.marginLeft="5px";
  // inp.setAttribute('checked','true');
  // link.appendChild(inp);

  // var link1 = document.createElement("label");
  // link1.innerHTML="Option2";
  // link1.className="radio-inline";
  // link1.setAttribute('contenteditable','true');
  // link1.setAttribute('id','op2'+id);

  // var inp1 = document.createElement("input");
  // inp1.type="radio";
  // inp1.name='op'+id;
  // inp1.style.marginLeft="5px";

  
  // link1.appendChild(inp1);

  // var link2 = document.createElement("label");
  // link2.innerHTML="Option2";
  // link2.className="radio-inline";
  // link2.setAttribute('contenteditable','true');
  // link2.setAttribute('id','op3'+id);

  // var inp2 = document.createElement("input");
  // inp2.type="radio";
  // inp2.name='op'+id;
  // inp2.style.marginLeft="5px";

  
  // link2.appendChild(inp2);

  // document.getElementById("formDiv").appendChild(link);
  // document.getElementById("formDiv").appendChild(link1);
  // document.getElementById("formDiv").appendChild(link2);
  var linebreak = document.createElement("br");
  var linebreak1 = document.createElement("br");
  document.getElementById("formDiv").appendChild(linebreak);
  document.getElementById("formDiv").appendChild(linebreak1);
}

creatSection(id){
  var link = document.createElement("div");
  var labelid="section"+id;
  link.setAttribute("id", labelid);
  link.style.height="30px";
  link.innerHTML="enter section name";
  link.style.backgroundColor="purple";
  link.style.padding="5px";
  link.style.color='white';
  link.style.marginTop="20px";
  link.style.marginRight="20px";
  link.setAttribute('contenteditable','true'); 
  document.getElementById("formDiv").appendChild(link);
  var linebreak = document.createElement("br");
  document.getElementById("formDiv").appendChild(linebreak);
}
getcheckboxNum(){
alert((<HTMLInputElement> document.getElementById("checkboxNum")).value);
var num=parseInt((<HTMLInputElement> document.getElementById("checkboxNum")).value);
this.countt.push(3);
this.cid=this.count;
this.count++;
this.createCheckboxes(this.cid,num);
}
getradioboxNum(){
  var num=parseInt((<HTMLInputElement> document.getElementById("radioboxNum")).value);
this.countt.push(2);
this.cid=this.count;
this.count++;
this.createRadiobuttons(this.cid,num);
}
save(){
  var json={};
  for(var i=0;i< this.countt.length ; i++){
    if(this.countt[i]==1){
      // alert(document.getElementById('section'+i).innerHTML);
      json[i]={'section':document.getElementById('section'+i).innerHTML};
    }
    else if(this.countt[i]==2){
      var op=[];
      var rad=document.getElementById('rad'+i).innerHTML;
      op.push(rad);
      var j=0;   
      while(j!=-1){
        var st='op'+j.toString()+i.toString();
        // alert(st);
         if(document.getElementById(st)!=null){
          // alert(document.getElementById(st).innerHTML.split('<')[0]);
          op.push(document.getElementById(st).innerHTML.split('<')[0]);
         }
         else{
           break; 
         }
           
        j++;
        
      }
      if(op.length!=0){
        json[i]={'radio':op};
      }
      
      // var op1=document.getElementById('op1'+i).innerHTML.split('<')[0];
      // var op2=document.getElementById('op2'+i).innerHTML.split('<')[0];
      // var op3=document.getElementById('op3'+i).innerHTML.split('<')[0]
      // json[i]={'radio':[rad,op1,op2,op3]}
      // alert(document.getElementById('rad'+i).innerHTML);
      // alert(document.getElementById('op1'+i).innerHTML.split('<')[0]);
      // alert(document.getElementById('op2'+i).innerHTML.split('<')[0]);
      // alert(document.getElementById('op3'+i).innerHTML.split('<')[0]);
      //alert('radio');
    }
    else if(this.countt[i]==6){
      json[i]={'label':document.getElementById(i.toString()).innerHTML};
    }
    else if(this.countt[i]==4){
      json[i]={'question':document.getElementById('que'+i).innerHTML};
      // alert(document.getElementById('que'+i).innerHTML);
    }
    else if(this.countt[i]==3){
      // alert(document.getElementById('check'+i).innerHTML);
      var op=[];
      var check=document.getElementById('check'+i).innerHTML;
      op.push(check);
      var j=0;   
      while(j!=-1){
        var st='op'+j.toString()+i.toString();
        // alert(st);
         if(document.getElementById(st)!=null){
          // alert(document.getElementById(st).innerHTML.split('<')[0]);
          op.push(document.getElementById(st).innerHTML.split('<')[0]);
         }
         else{
           break; 
         }
           
        j++;
        
      }
      if(op.length!=0){
        json[i]={'checkbox':op};
      }
    }
    

    
  }
  alert(JSON.stringify(json));
  this.newService.addForm(JSON.stringify(json)).then((data) =>{
    
  })
  // alert((<HTMLDivElement>document.getElementById('1')).innerHTML);
}
createLabel(id){
  var link = document.createElement("label");
  var labelid=id;
  link.setAttribute("id", labelid);
  link.innerHTML="enter the label content";
  link.setAttribute('contenteditable','true');
  var yes= document.createElement("Button");
  var yesid="yes"+id;
  yes.setAttribute("id", yesid);
  yes.innerHTML="yes";
  yes.style.marginLeft="10px";
  document.getElementById("formDiv").appendChild(link);
  // document.getElementById("formDiv").appendChild(yes);

  var linebreak = document.createElement("br");
  document.getElementById("formDiv").appendChild(linebreak);
}


  
}
