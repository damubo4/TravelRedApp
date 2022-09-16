import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  // url = 'http://localhost:3000/cuentas/';
  url = 'https://travelred.herokuapp.com/cuentas/';  

  constructor(private http:HttpClient) { }

  getCuentas(): Observable<any> {
    return this.http.get<any>(this.url + "listar_cuentas/");
  }

  getCuenta(id: any): Observable<any> {
    return this.http.get(this.url + "listar_cuentas/" + id);
  }

  editCuenta(id: any, cuenta): Observable<any> {
    return this.http.post(this.url + "editar_cuenta/" + id, cuenta);
  }

  deleteCuenta(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_cuenta/" + id);
  }

  addCuenta(cuenta): Observable<any> {
    console.log(cuenta);
    return this.http.post(this.url + "add_cuenta", cuenta);
  }
}
