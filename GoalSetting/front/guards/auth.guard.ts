import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DetailService } from '../_services/detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public service: DetailService, private router: Router) {}
  canActivate(): boolean {
    if (this.service.loggedIn()) {
      return true;
    }

    alert("put right credentials")
    this.router.navigate(['/login']);
    return false;
  }
  
}
