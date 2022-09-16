import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { LoginService } from './services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLogOutGuard implements CanActivate {

  constructor(private _loginService: LoginService,
    private router: Router) {}

canActivate(): boolean{
if (!this._loginService.loggedIn()) {
return true;
}
this.router.navigate(['/dashboard']);
return false;
}
    
  
}
