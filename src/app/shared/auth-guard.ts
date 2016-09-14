import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // Decides whether we can access a particular route
  canActivate() {
    if (tokenNotExpired())
      return true;

    this.router.navigate(['/login']);
    return false;
  }
}