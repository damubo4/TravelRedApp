import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url =  'https://travelred.herokuapp.com/clientes/';     
  // url = 'http://localhost:3000/clientes/';

  constructor(private http:HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get<any>(this.url + "lista_clientes");
  }

  deleteCliente(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_cliente/" + id);
  }

  addClientes(cliente): Observable<any> {    
    return this.http.post(this.url + "add", cliente)
  }

  getCliente(id: any): Observable<any> {
    return this.http.get(this.url + "lista_clientes/" + id);
  }

  editCliente (id: any, cliente): Observable<any> {
    return this.http.post(this.url + "editar_cliente/" + id, cliente);
  }

  getClienteReserva(cedula: any): Observable<any> {
    return this.http.get(this.url + "lista_clientes_cedula/" + cedula);
  }
}
