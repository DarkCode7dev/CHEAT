import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from './employee.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  formData: Employee= {
    Technology: null,
    EmployeeName: null,
    EmployeeId: null,
    Password: null

  };
  
  readonly rootURL = 'https://localhost:44385/api';
  list : Employee[];

  constructor(private http: HttpClient) { }

  postDetail(user:Employee ) {
    return this.http.post(this.rootURL + '/Employee', user);
  }
  putDetail(user:Employee ) {
    return this.http.put(this.rootURL + '/Employee/'+ this.formData.EmployeeId, user);
  }
  deleteDetail(id) {
    return this.http.delete(this.rootURL + '/Employee/'+ id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/Employee')
    .toPromise()
      .then(res => this.list = res as Employee[]);
  }


  login(model: any) {
    return this.http.post('https://localhost:44385/api/auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        console.log(user);
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }



  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
