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

===========================Component.Html========================
  <h1>{{item}}</h1>
<div class="form-group col-md-7">
<form [formGroup]="reactiveForm"  style="color:green"(ngSubmit)="onSubmit()">
  <div class="form-group">
    <!-- <label  class="control-label" style="margin-right:10px">ID: </label> -->
  </div>
  <div class="form-group">
    <input type="hidden"
      [ngClass]="{
        'is-invalid':
        reactiveForm.get('GMId').errors &&
        reactiveForm.get('GMId').touched
      }"
      class="form-control"
      placeholder="Known as"
      formControlName="GMId"
    />
    <div
      class="invalid-feedback"
      *ngIf="
      reactiveForm.get('cardOwnerName').touched &&
      reactiveForm.get('cardOwnerName').hasError('required')">
    Card Owner Name as is required
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" style="margin-right:10px">Card Owner Name: </label>
  </div>
  <div class="form-group">
    <input
      [ngClass]="{
        'is-invalid':
        reactiveForm.get('cardOwnerName').errors &&
        reactiveForm.get('cardOwnerName').touched
      }"
      class="form-control"
      placeholder="Known as"
      formControlName="cardOwnerName"
    />
    <div
      class="invalid-feedback"
      *ngIf="
      reactiveForm.get('cardOwnerName').touched &&
      reactiveForm.get('cardOwnerName').hasError('required')
      "
    >
    Card Owner Name as is required
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" style="margin-right:10px">Card Number: </label>

  </div>
  <div class="form-group">
    <input
      [ngClass]="{
        'is-invalid':
        reactiveForm.get('cardNumber').errors &&
        reactiveForm.get('cardNumber').touched
      }"
      class="form-control"
      placeholder="Known as"
      formControlName="cardNumber"
    />
    <div
      class="invalid-feedback"
      *ngIf="
      reactiveForm.get('cardNumber').touched &&
      reactiveForm.get('cardNumber').hasError('required')
      "
    >
    Card Number Name as is required
    </div>
  </div>

  <div class="form-group">
    <label class="control-label" style="margin-right:10px">Expiration Date: </label>

  </div>
  <div class="form-group">
    <input
      [ngClass]="{
        'is-invalid':
        reactiveForm.get('expiryDate').errors &&
        reactiveForm.get('expiryDate').touched
      }"
      class="form-control"
      placeholder="expirationDate"
      formControlName="expiryDate"
    />
    <div
      class="invalid-feedback"
      *ngIf="
      reactiveForm.get('expiryDate').touched &&
      reactiveForm.get('expiryDate').hasError('required')
      "
    >
    Card Owner Name as is required
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" style="margin-right:10px">Money: </label>

  </div>
  <div class="form-group">
    <input
    [ngClass]="{
      'is-invalid':
      reactiveForm.get('amount').errors &&
      reactiveForm.get('amount').touched
    }"
      class="form-control"
      placeholder="money"
      formControlName="amount"
    />
    <div
      class="invalid-feedback"
      *ngIf="reactiveForm.get('money').touched && reactiveForm.get('money').hasError('required')"
    >
    Money is required
    </div>
  </div>
  <button type="submit" class="btn btn-primary"  (click)="callGreet()">Save</button>

</form>
</div>
