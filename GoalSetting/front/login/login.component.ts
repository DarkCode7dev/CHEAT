import { Component, OnInit } from '@angular/core';
import { DetailService } from '../_services/detail.service';
import { Employee } from '../_services/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  data:Employee;
  constructor(public service: DetailService,private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.service.login(this.model).subscribe(
      next => {
        console.log('Logged in successfully');
      },
      error => {
        console.log('Failed to login');
      },
      () => {
        this.router.navigate(['/list']);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
   
    if (token) {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
