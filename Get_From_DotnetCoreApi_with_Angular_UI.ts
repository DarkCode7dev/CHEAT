
https://www.youtube.com/watch?v=Xp1qRJyVKNA
Componenet.Html==================
<h1>List of Applicants</h1>
<table border="1" style="color:blue">
   <tr>
     <td>GMId </td>
     <td>CardOwnerName </td>
     <td>CardNumber </td>
     <td>expiryDate </td>
     <td>amount </td>
   </tr>
   <tr *ngFor="let item of userdata">
    <td>{{item.GMId}} </td>
    <td>{{item.CardOwnerName}} </td>
    <td>{{item.CardNumber}} </td>
    <td> {{item.ExpiryDate}}</td>
    <td>{{item.Amount}} </td>
  </tr>
</table>
Component.TS===================================
import { CommonService } from './../common.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

 userdata;

  constructor(private service: CommonService) {}

  ngOnInit() {
    this.service.getData().subscribe(data=>{
      console.warn(data);
      this.userdata = data;
    })
  }
}
===========================Common.Secrvice
import { User } from './user';
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
  putDetail(model: any) {
    return this.http.put(this.rootURL + '/Detail/'+ model.GMId, model);
  }
  deleteDetail(id) {
    return this.http.delete(this.rootURL + '/Detail/'+ id);
  }

  getData(){
    return this.http.get(this.rootURL + '/Detail/CustomerGetDetails');
  }
}
=================================Model Class
export class User {
  GMId: number;
  CardOwnerName: string;
  CardNumber: string;
  expiryDate: string;
  amount: string;

}







