import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  
  idLogin$ = new EventEmitter<any>();
  

  urlIn = "https://travelred.herokuapp.com/login";
  urlOut = "https://travelred.herokuapp.com/logout";
  urlRolUser = "https://travelred.herokuapp.com/rol/lista_rol/"

  constructor(private http: HttpClient,
              private cookies: CookieService) { }

  login(LOGIN): Observable<any> {    
    return this.http.post(this.urlIn, LOGIN);
  }

  logout(): Observable<any> {      
    return this.http.get(this.urlOut);    
  }

  getRolData(id): Observable<any> {
    return this.http.get(this.urlRolUser + id);

  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  setToken(token) {
    this.cookies.set("token", token);
  }  

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("idRol");
  }
}
