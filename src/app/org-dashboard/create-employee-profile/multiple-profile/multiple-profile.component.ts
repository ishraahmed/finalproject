import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { SignupService } from 'src/app/signup.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-multiple-profile',
  templateUrl: './multiple-profile.component.html',
  styleUrls: ['./multiple-profile.component.css']
})
export class MultipleProfileComponent implements OnInit {
  notMade;
  expanded;
  // mad;
  // retr;
  // no;
  load=1;
  nullError=0;
  FirstnameError=0;
  LastnameError=0;
  emailError=0;
  CnicError=0;
  designationError=0;
  keyError=0;
ObjectKeys=Object.keys;
  constructor(public newService :SignupService,public _dataService: DataService) { }
Orgname;
  ngOnInit() {
    this.Orgname = this._dataService.getOption();  
    //alert(this.Orgname['Orgname']);
  }

  arrayBuffer:any;
  file:File;
  incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }
  dataq;
  keys=[];
   Upload() {
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) 
              arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var abc=[];
              var keys=[];
              var nullError=0;
  var FirstnameError=0;
  var LastnameError=0;
  var emailError=0;
  var CnicError=0;
  var designationError=0;
var keyError;
              workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                keys = Object.keys(XL_row_object[0]);
                console.log( keys );
                if(keys[0]=='Firstname' && keys[1]=='Lastname' && keys[2]=='email' &&  keys[3]=='Designation' && keys[4]=='domain' &&
                 keys[5]=="skills" && keys[6]=='CNIC'&& keys[7]=='Phone_No'  ){
                  keyError=0;
                
                for (var i = 0; i < XL_row_object.length; i++)
                {
                    var arr =XL_row_object[i]['skills'].split(',');
                    XL_row_object[i]['skills']=arr;
        
                    if(XL_row_object[i]['Firstname']=='null' || XL_row_object[i]['Lastname']=='null' || XL_row_object[i]['email']=='null' ||
                    XL_row_object[i]['Designation']=='null'|| XL_row_object[i]['domain']=='null'){
                      nullError=1; 
                    }
                    else{
                      if(XL_row_object[i]['Designation']!="manager" && XL_row_object[i]['Designation']!="admin" && XL_row_object[i]['Designation']!="employee"){
                      designationError=1; }
                      if(/^([a-zA-Z]+)$/.test(XL_row_object[i]['Firstname'])==false){
                        FirstnameError=1;}
                      if(/^([a-zA-Z]+)$/.test(XL_row_object[i]['Lastname'])==false){
                        LastnameError=1; }
                      if(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(XL_row_object[i]['email'])==false){
                    emailError=1;}
                      if(/^(\d{7}\-\d{5}\-\d{1})$/.test(XL_row_object[i]['CNIC'])==false){
                       CnicError=1;}
                    }
                    abc.push(XL_row_object[i]);
                    if(nullError==1 || FirstnameError==1 || LastnameError==1 || designationError==1 ||
                      emailError==1){
                            break;
                      }
                    
                }
              }
              else{
                keyError=1;
              }
                console.log(abc);
                
                // alert(excelData);
            });
           
this.dataq=abc;
this.keys=keys;
this.keyError=keyError;
this.designationError=designationError;
this.nullError=nullError;
this.FirstnameError=FirstnameError;
this.LastnameError=LastnameError;
this.CnicError=CnicError;
this.emailError=emailError;
if(nullError==0 &&FirstnameError==0 && LastnameError==0 && designationError==0 &&
  emailError==0){
    this.expanded=true;
// alert("all right");
  }
          }
          fileReader.readAsArrayBuffer(this.file);
         
  }

  save(){
 this.load=0;
 this.newService.saveMultipleEmployees(JSON.stringify(this.dataq)).then((data) =>{
  //  alert(JSON.stringify( data));
if(data['inserted']==1){
  this.load=1;
  alert('profiles made successfully');
}
 });

    // this.newService.EmpSave(this.dataq,this.Orgname['Orgname']).then((data) =>{
    //  this.load=1;
    //   // alert(data['exists'].length);
    //   if(data['exists'].length>0){
    //     this.retr=1;
    //   this.notMade=data['exists'];
    // }
    // if(data['made'].length>0){
    //   this.mad=1;
    // }
    // this.no=data['made'].length;
    // // alert(this.Orgname['Orgname']+"  "+data['exists'][0]['email']);
    //  }
    //  );


  
}
}