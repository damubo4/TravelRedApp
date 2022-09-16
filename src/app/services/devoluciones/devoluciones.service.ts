import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  url = 'https://travelred.herokuapp.com/devoluciones/';

  constructor(private http: HttpClient) { }

  getDevoluciones(): Observable<any> {
    return this.http.get<any>(this.url + "listar_devolucion");
  }
  
  getDevolucion(id): Observable<any> {
    return this.http.get<any>(this.url+ "listar_devolucion/" + id);
  }
  
  addDevolucion(devolucion): Observable<any> {
    return this.http.post(this.url + "add_devolucion", devolucion)
  }
  
  editDevolucion(id: any, devolucion): Observable<any> {
    return this.http.post(this.url + "editar_devolucion/" + id, devolucion);
  }
  
  deleteDevolucion(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_devolucion/" + id);
  }
}


