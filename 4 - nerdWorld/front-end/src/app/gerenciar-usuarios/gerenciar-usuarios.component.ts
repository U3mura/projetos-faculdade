import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css']
})
export class GerenciarUsuariosComponent implements OnInit {
  usuarios: Array<Usuario> = new Array<Usuario>();
  usuarioEdicao?: Usuario = undefined;
  estaEditando = false;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    }, err => {
      console.log('Erro ao listar os usuarios', err);
    });
  }

  salvar(): void {
    if (this.usuarioEdicao == undefined){
      return;
    }
    if (!this.estaEditando){
      this.usuariosService.inserir(this.usuarioEdicao).subscribe(() => {
      this.listarUsuarios();
      this.cancelar();
      });
    }
    else {
        this.usuariosService.atualizar(this.usuarioEdicao).subscribe(() => {
        this.listarUsuarios();
        this.cancelar();
      });
    }
  }

    novoUsuario() {
    this.usuarioEdicao = new Usuario();
    this.estaEditando = false;
  } 

  cancelar() {
    this.usuarioEdicao = undefined;
    this.estaEditando = false;
  }

  selecionarUsuario(usuario: Usuario) {
    this.usuarioEdicao = usuario;
    this.estaEditando = true;
  }

  excluir(usuario: Usuario) {
    const resposta = confirm(`Você deseja remover ${usuario.nome}`);
    if (resposta && usuario && usuario.id)  {
      this.usuariosService.excluir(usuario.id).subscribe(() => {
        this.listarUsuarios();
      });
    }
  }

  

}
