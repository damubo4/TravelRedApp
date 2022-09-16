import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaMenorService {

  url = 'https://travelred.herokuapp.com/cajamenor/';

  constructor(private http:HttpClient) { }

  addCajaMenor(cajaMenor): Observable<any> {    
    return this.http.post(this.url + 'add_cajamenor', cajaMenor)
  }

  getRegistrosCajaMenor(): Observable<any> {    
    return this.http.get(this.url + 'listar_cajamenor')
  }

  getRegistroCajaMenor(id): Observable<any> {
    return this.http.get<any>(this.url + "listar_cajamenor/" + id);
  }

  deleteRegistroCajaMenor(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_cajamenor/" + id)
  }

  editRegistroCajaMenor(id: any, registro): Observable<any> {
    return this.http.post(this.url + "editar_cajamenor/" + id, registro);
  }
}

