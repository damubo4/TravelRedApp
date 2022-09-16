import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaMayorService {

  url = 'https://travelred.herokuapp.com/cajamayor/';

  constructor(private http:HttpClient) { }

  addCajaMayor(cajaMayor): Observable<any> {    
    return this.http.post(this.url + 'add_cajamayor', cajaMayor)
  }

  getRegistrosCajaMayor(): Observable<any> {    
    return this.http.get(this.url + 'listar_cajamayor')
  }

  getRegistroCajaMayor(id): Observable<any> {
    return this.http.get<any>(this.url + "listar_cajamayor/" + id);
  }

  deleteRegistroCajaMayor(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_cajamayor/" + id)
  }

  editRegistroCajaMayor(id: any, registro): Observable<any> {
    return this.http.post(this.url + "editar_cajamayor/" + id, registro);
  }
}
