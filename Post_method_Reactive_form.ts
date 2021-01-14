================CommonService.ts===========================================================
import { User } from './user';
import { CreateComponent } from './Reactive/create/create.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  readonly rootURL = 'https://localhost:44370/api';
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
  postDetail(user: User) {
     var x=this.http.post(this.rootURL + '/Detail/SaveDetail',user,this.headers);
     return x;
  }
  
}
=============================User classs================================
export class User {
  GMId: number;
  CardOwnerName: string;
  CardNumber: string;
  expiryDate: string;
  amount: string;

}
================================ Component.ts wali file hai
import { User } from './../../user';
import { CommonService } from './../../common.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  reactiveForm: FormGroup;
  user: User ;
  constructor( private fb: FormBuilder,private http: HttpClient,private CommonService: CommonService) { }

  ngOnInit() {
    this.createreactiveForm();
  }


  createreactiveForm() {
    this.reactiveForm = this.fb.group(
      {
        GMId:[0],
         cardOwnerName : ['', Validators.required],
         cardNumber: ['', Validators.required],
         expiryDate  : ['', Validators.required],
         amount: ['', Validators.required],
      });

  }



  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log("Form Submitted!");
      this.user = Object.assign({},this.reactiveForm.value);
      this.CommonService.postDetail(this.user).subscribe(()=>{
        console.log("registration successsufull");
        }, error=>{
          console.error(error);
        }
        )
        console.table(this.reactiveForm.value);
      //this.reactiveForm.reset();
    }
  }
}

