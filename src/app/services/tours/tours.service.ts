import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  // url = 'http://localhost:3000/tours/';
  url = 'https://travelred.herokuapp.com/tours/';

  constructor(private http:HttpClient) { }

  getTours(): Observable<any> {
    return this.http.get<any>(this.url + "listar_tours/");
  }

  getTour(tou_id: any): Observable<any> {
    return this.http.get(this.url + "listar_tours/" + tou_id);
  }

  deleteTour(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_tour/" + id);
  }

  editTour(id: any, tour): Observable<any> {
    return this.http.post(this.url + "editar_tour/" + id, tour);
  }

  addTour(tour): Observable<any> {
    console.log(tour);
    return this.http.post(this.url + "add_tour", tour);
  }
}
