import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciarCategoriasComponent } from '../gerenciar-categorias/gerenciar-categorias.component';
import { GerenciarProdutoComponent } from '../gerenciar-produto/gerenciar-produto.component';
import { GerenciarUsuariosComponent } from '../gerenciar-usuarios/gerenciar-usuarios.component';
import { LayoutComponent } from '../layout/layout.component';
import { ShopComponent } from '../shop/shop.component';
import { SobrenosComponent } from '../sobrenos/sobrenos.component';

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'shop', component: ShopComponent},
      { path: 'sobrenos', component: SobrenosComponent},
      { path: 'gerenciar-produto', component: GerenciarProdutoComponent},
      { path: 'gerenciar-categorias', component:
      GerenciarCategoriasComponent},
      { path: 'gerenciar-usuarios', component:
      GerenciarUsuariosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
