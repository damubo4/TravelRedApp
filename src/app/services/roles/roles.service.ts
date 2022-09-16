import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url = 'https://travelred.herokuapp.com/rol/';
  // urlRegister = "https://travelred.herokuapp.com/register";

  constructor(private http:HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get<any>(this.url + "lista_rol");
  }

  getRol(id): Observable<any> {
    return this.http.get<any>(this.url + "lista_rol/" + id);
  }

  addRol(rol): Observable<any> {
    return this.http.post(this.url + "add", rol)
  }

  editRol(id: any, rol): Observable<any> {
    return this.http.post(this.url + "editar_rol/" + id, rol);
  }

  deleteRol(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_rol/" + id);
  }

  cambiarPass(pass): Observable<any> {
    return this.http.post("https://travelred.herokuapp.com/cambiapass/new_pass", pass)
  }
}
