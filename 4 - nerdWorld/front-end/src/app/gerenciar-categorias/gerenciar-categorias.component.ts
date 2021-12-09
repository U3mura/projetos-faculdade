import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-gerenciar-categorias',
  templateUrl: './gerenciar-categorias.component.html',
  styleUrls: ['./gerenciar-categorias.component.css']
})
export class GerenciarCategoriasComponent implements OnInit {
  categorias: Array<Categoria> = new Array<Categoria>();
  categoriaEdicao?: Categoria = undefined;
  estaEditando = false;

  constructor(private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  editar(categoria :  Categoria){
    alert(categoria.nome);
  }

  listarCategorias(): void {
    this.categoriasService.listarCategorias().subscribe(categorias => {
      this.categorias = categorias;
    }, err => {
      console.log('Erro ao listar os categorias', err);
    });
  }

  salvar(): void {
    if (this.categoriaEdicao == undefined){
      return;
    }
    if (!this.estaEditando){
      this.categoriasService.inserir(this.categoriaEdicao).subscribe(() => {
      this.listarCategorias();
      this.cancelar();
      });
    }
    else {
        this.categoriasService.atualizar(this.categoriaEdicao).subscribe(() => {
        this.listarCategorias();
        this.cancelar();
      });
    }
  }

    novaCategoria() {
    this.categoriaEdicao = new Categoria();
    this.categoriaEdicao = new Categoria();
    this.estaEditando = false;
  } 

  cancelar() {
    this.categoriaEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarCategoria(categoria : Categoria) {
    this.categoriaEdicao = categoria;
    this.estaEditando = true;
  }

  excluir(categoria: Categoria) {
    const resposta = confirm(`Você deseja remover ${categoria.nome}`);
    if (resposta && categoria && categoria.id)  {
      this.categoriasService.excluir(categoria.id).subscribe(() => {
        this.listarCategorias();
      });
    }
  }

}
