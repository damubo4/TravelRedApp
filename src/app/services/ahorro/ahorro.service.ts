import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {

  url = 'https://travelred.herokuapp.com/ahorro/';

  constructor(private http: HttpClient) { }

  getAhorros(): Observable<any> {
    return this.http.get<any>(this.url + "lista_ahorros", );
  }

  getAhorro(id): Observable<any> {
    return this.http.get<any>(this.url + "lista_ahorros/" + id);
  }

  addAhorro(ahorro): Observable<any> {
    return this.http.post(this.url + "add_ahorro", ahorro)
  }

  editAhorro(id: any, ahorro): Observable<any> {
    return this.http.post(this.url +"editar_ahorro/" + id, ahorro);
  }

  deleteAhorro(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_ahorro/" + id);
  }
}
