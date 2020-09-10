import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})

//The auth guard is used to prevent unauthenticated users from accessing restricted routes.
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService) {}
 //Check if the user is authenticated and if not access to those roots will be forbidden
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}