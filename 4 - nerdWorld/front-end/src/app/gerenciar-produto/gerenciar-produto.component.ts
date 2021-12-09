import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { Categoria } from '../models/categoria';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-gerenciar-produto',
  templateUrl: './gerenciar-produto.component.html',
  styleUrls: ['./gerenciar-produto.component.css']
})
export class GerenciarProdutoComponent implements OnInit {
  produtos: Array<Produto> = new Array<Produto>();
  produtoEdicao?: Produto = undefined;
  categoriaEdicao?: Categoria = undefined;
  estaEditando = false;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(){
    this.listarProdutos();
  }
  
  listarProdutos(): void {
    this.produtosService.listarProdutos().subscribe(produtos => {
      this.produtos = produtos;
    }, err => {
      console.log('Erro ao listar os produtos', err);
    });
  }

  salvar(): void {
    if (this.produtoEdicao == undefined){
      return;
    }
    if (!this.estaEditando){
      this.produtoEdicao.categoria=this.categoriaEdicao;
      this.produtosService.inserir(this.produtoEdicao).subscribe(() => {
      this.listarProdutos();
      this.cancelar();
      });
    }
    else {
        this.produtosService.atualizar(this.produtoEdicao).subscribe(() => {
        this.listarProdutos();
        this.cancelar();
      });
    }
  }

    novoProduto() {
    this.categoriaEdicao = new Categoria();
    this.produtoEdicao = new Produto();
    this.estaEditando = false;
  } 

  cancelar() {
    this.categoriaEdicao = undefined;
    this.produtoEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarProduto(produto : Produto) {
    this.produtoEdicao = produto;
    this.categoriaEdicao = this.produtoEdicao?.categoria;
    this.estaEditando = true;
  }

  excluir(produto: Produto) {
    const resposta = confirm(`Você deseja remover ${produto.nome}`);
    if (resposta && produto && produto.id)  {
      this.produtosService.excluir(produto.id).subscribe(() => {
        this.listarProdutos();
      });
    }
  }

}
