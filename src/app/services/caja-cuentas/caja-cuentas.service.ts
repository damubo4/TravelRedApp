import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CajaCuentasService {

  url = 'https://travelred.herokuapp.com/cajacuentas/';

  constructor(private http:HttpClient) { }

  addCajaCuentas(cajaCuentas): Observable<any> {    
    return this.http.post(this.url + 'add_cajacuentas', cajaCuentas)
  }

  getRegistrosCajaCuentas(): Observable<any> {    
    return this.http.get(this.url + 'listar_cajacuentas')
  }

  getRegistroCajaCuentas(id): Observable<any> {
    return this.http.get<any>(this.url + "listar_cajacuentas/" + id);
  }

  deleteRegistroCajaCuentas(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_cajacuentas/" + id)
  }

  editRegistroCajaCuentas(id: any, registro): Observable<any> {
    return this.http.post(this.url + "editar_cajacuentas/" + id, registro);
  }
}

