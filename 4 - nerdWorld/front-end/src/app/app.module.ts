import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ShopComponent } from './shop/shop.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { GerenciarProdutoComponent } from './gerenciar-produto/gerenciar-produto.component';

import { HttpClientModule } from '@angular/common/http';
import { ProdutosService } from './produtos.service';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { FormsModule } from '@angular/forms';
import { GerenciarCategoriasComponent } from './gerenciar-categorias/gerenciar-categorias.component';
import { GerenciarUsuariosComponent } from './gerenciar-usuarios/gerenciar-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    ShopComponent,
    FooterComponent,
    LayoutComponent,
    SobrenosComponent,
    GerenciarProdutoComponent,
    GerenciarCategoriasComponent,
    GerenciarUsuariosComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  
  providers: [HttpClientModule, ProdutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
