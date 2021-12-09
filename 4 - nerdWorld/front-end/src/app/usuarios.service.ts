import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

    listarUsuarios(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>('http://localhost:8080/exemplo-cadastro/webapi/usuario');
    }

    inserir(usuario : Usuario): Observable<void>{
      return this.http.post<void>('http://localhost:8080/exemplo-cadastro/webapi/usuario', usuario);
    }

    atualizar(usuario : Usuario): Observable<void> {
      return this.http.put<void>('http://localhost:8080/exemplo-cadastro/webapi/usuario', usuario);
    }

    excluir(id: number): Observable<void> {
      let parametro = new HttpParams();
      parametro = parametro.append('id',id);
      return this.http.delete<void>('http://localhost:8080/exemplo-cadastro/webapi/usuario', {params: parametro});
    }
}
