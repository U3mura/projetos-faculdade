import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from './models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

    listarProdutos(): Observable<Produto[]>{
      return this.http.get<Produto[]>('http://localhost:8080/exemplo-cadastro/webapi/produto');
    }

    inserir(produto : Produto): Observable<void>{
      return this.http.post<void>('http://localhost:8080/exemplo-cadastro/webapi/produto', produto);
    }

    atualizar(produto : Produto): Observable<void> {
      return this.http.put<void>('http://localhost:8080/exemplo-cadastro/webapi/produto', produto);
    }

    excluir(id: number): Observable<void> {
      let parametro = new HttpParams();
      parametro = parametro.append('id',id);
      return this.http.delete<void>('http://localhost:8080/exemplo-cadastro/webapi/produto', {params: parametro});
    }
}
