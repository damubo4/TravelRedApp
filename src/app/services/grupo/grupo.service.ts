import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url = 'https://travelred.herokuapp.com/grupos/';

  constructor(private http:HttpClient) { }  

  getGrupos(): Observable<any> {
    return this.http.get<any>(this.url + "listar_grupos/");
  }

  getGrupo(id: any): Observable<any> {
    return this.http.get(this.url + "listar_grupos/" + id);
  }

  deleteGrupo(id: any): Observable<any> {
    return this.http.get(this.url + "eliminar_grupo/" + id);
  }

  editGrupo(id: any, grupo): Observable<any> {
    return this.http.post(this.url + "editar_grupo/" + id, grupo);
  }

  addGrupo(grupo): Observable<any> {
    console.log(grupo);
    return this.http.post(this.url + "add_grupo", grupo);
  }
}
