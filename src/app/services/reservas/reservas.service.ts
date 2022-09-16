import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  // url = 'http://localhost:3000/reservas/';
  url = 'https://travelred.herokuapp.com/reservas/';

  constructor(private http:HttpClient) { }

  getReservas(): Observable<any> {
    return this.http.get<any>(this.url + "listar_reservas");
  }

  getReserva(id): Observable<any> {
    return this.http.get<any>(this.url + "listar_reservas/" + id);
  }

  addReserva(reserva): Observable<any> {
    return this.http.post(this.url + "add_reserva", reserva)
  }

  editReserva(id: any, reserva): Observable<any> {
    return this.http.post(this.url + "editar_reserva/" + id, reserva);
  }

  deleteReserva(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_reserva/" + id);
  }
}
