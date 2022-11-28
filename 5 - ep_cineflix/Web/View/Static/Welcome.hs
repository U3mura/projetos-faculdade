module Web.View.Static.Welcome where
import Web.View.Prelude

data WelcomeView = WelcomeView

instance View WelcomeView where
    html WelcomeView = [hsx|
         <div id="preloder">
            <div class="loader"></div>
        </div>
        
        <header class="header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="header__logo" style="padding: 5px 0 5px;"> 
                            <a href="#">
                                <img src="img/logo.png" alt="" style="width: 50px;">
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="header__nav">
                            <nav class="header__menu mobile-menu">
                                <ul>
                                    <li class="active">
                                        <a href="#">Página Inicial</a>
                                    </li>
                                    <li>
                                        <a href="Cinemas">Cinemas</a>
                                    </li>
                                    <li>
                                        <a href="Agendamentos">Sessões</a>
                                    </li>
                                    <li>
                                        <a href="#">Categorias <span class="arrow_carrot-down"></span>
                                        </a>
                                        <ul class="dropdown">
                                            <li>
                                                <a href="#">Ação</a>
                                            </li>
                                            <li>
                                                <a href="#">Comédia</a>
                                            </li>
                                            <li>
                                                <a href="#">Fantasia</a>
                                            </li>
                                            <li>
                                                <a href="#">Suspense</a>
                                            </li>
                                            <li>
                                                <a href="#">Terror</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="header__right">
                            <a href="#" class="search-switch">
                                <span class="icon_search"></span>
                            </a>
                            <a href="#">
                                <span class="icon_profile"></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </header>

        <section class="hero">
            <div class="container">
                <div class="hero__slider owl-carousel">
                    <div class="hero__items set-bg" data-setbg="/img/carousel-item-1.webp">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="hero__text">
                                    <div class="label">Fantasia</div>
                                    <h2>Vingadores: Ultimato</h2>
                                    <p>Leia mais sobre Vingadores: Ultimato</p>
                                    <a href="#">
                                        <span>Assistir agora</span>
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hero__items set-bg" data-setbg="img/carousel-item-2.jpg">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="hero__text">
                                    <div class="label">Aventura</div>
                                    <h2>Loki</h2>
                                    <p>Leia mais sobre a série Loki</p>
                                    <a href="#">
                                        <span>Assistir agora</span>
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="product spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="trending__product">
                            <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-8">
                                    <div class="section-title">
                                        <h4>Em cartaz</h4>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <div class="btn__all">
                                        <a href="#" class="primary-btn">Ver todos <span class="arrow_right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-1.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Fantasia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Adão Negro</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-2.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Fantasia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Mundo Estranho</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-3.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Fantasia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Noite Infeliz</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-4.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Fantasia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Lilo, Lilo, Crocodilo</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-5.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Terror</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">A Luz do Demonônio</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-6.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Animação</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Minions 2: A Origem de Gru</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="popular__product">
                            <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-8">
                                    <div class="section-title">
                                        <h4>Populares</h4>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <div class="btn__all">
                                        <a href="#" class="primary-btn">Ver todos <span class="arrow_right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-7.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Animê</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">One Piece film - Red</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-8.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Terror</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">O Telefone Preto</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-9.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Drama</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">O Livro dos Prazeres</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-10.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Drama/Comédia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Sra. Harris vai a Paris</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-11.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Romance/Comédia</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Ingresso para o Paraíso</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg="img/in-theaters-12.jpg">
                                            <div class="ep">18 / 18</div>
                                            <div class="comment">
                                                <i class="fa fa-comments"></i> 11
                                            </div>
                                            <div class="view">
                                                <i class="fa fa-eye"></i> 9141
                                            </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                                <li>Terror/Terror Psicológico</li>
                                                <li>Filme</li>
                                            </ul>
                                            <h5>
                                                <a href="#">Sorria</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-8">
                        <div class="product__sidebar">
                            <div class="product__sidebar__view">
                                <div class="section-title">
                                    <h5>Mais Vistos</h5>
                                </div>
                                <ul class="filter__controls">
                                    <li class="active" data-filter="*">No dia</li>
                                    <li data-filter=".week">Na semana</li>
                                    <li data-filter=".month">No mês</li>
                                    <li data-filter=".years">No ano</li>
                                </ul>
                                <div class="filter__gallery">
                                    <div class="product__sidebar__view__item set-bg mix day years" data-setbg="img/sidebar-item-1.webp">
                                        <div class="ep">18 / ?</div>
                                        <div class="view">
                                            <i class="fa fa-eye"></i> 9141
                                        </div>
                                        <h5>
                                            <a href="#">Destruição Final</a>
                                        </h5>
                                    </div>
                                    <div class="product__sidebar__view__item set-bg mix month week" data-setbg="img/sidebar-item-2.jpg">
                                        <div class="ep">18 / ?</div>
                                        <div class="view">
                                            <i class="fa fa-eye"></i> 9141
                                        </div>
                                        <h5>
                                            <a href="#">Projeto Gemini</a>
                                        </h5>
                                    </div>
                                    <div class="product__sidebar__view__item set-bg mix week years" data-setbg="img/sidebar-item-3.jpg">
                                        <div class="ep">18 / ?</div>
                                        <div class="view">
                                            <i class="fa fa-eye"></i> 9141
                                        </div>
                                        <h5>
                                            <a href="#">Thor: Amor e Trovão</a>
                                        </h5>
                                    </div>
                                    <div class="product__sidebar__view__item set-bg mix years month" data-setbg="img/sidebar-item-4.jpg">
                                        <div class="ep">18 / ?</div>
                                        <div class="view">
                                            <i class="fa fa-eye"></i> 9141
                                        </div>
                                        <h5>
                                            <a href="#">Zona de Combate</a>
                                        </h5>
                                    </div>
                                    <div class="product__sidebar__view__item set-bg mix day" data-setbg="img/sidebar-item-5.jpg">
                                        <div class="ep">18 / ?</div>
                                        <div class="view">
                                            <i class="fa fa-eye"></i> 9141
                                        </div>
                                        <h5>
                                            <a href="#">Doutor Estranho no Multiverso da Loucura</a>
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            <div class="product__sidebar__comment">
                                <div class="section-title">
                                    <h5>Comentários</h5>
                                </div>
                                <div class="product__sidebar__comment__item">
                                    <div class="product__sidebar__comment__item__pic">
                                        <img src="img/in-theaters-13.jpg" alt="" style="width: 90px; height: 130px;">
                                    </div>
                                    <div class="product__sidebar__comment__item__text">
                                        <ul>
                                            <li>Thriller/Mistério</li>
                                            <li>Filme</li>
                                        </ul>
                                        <h5>
                                            <a href="#">Não Se Preocupe, Querida</a>
                                        </h5>
                                        <span>
                                            <i class="fa fa-eye"></i> 19.141 Viewes </span>
                                    </div>
                                </div>
                                <div class="product__sidebar__comment__item">
                                    <div class="product__sidebar__comment__item__pic">
                                        <img src="img/in-theaters-14.jpg" alt="" style="width: 90px; height: 130px;">
                                    </div>
                                    <div class="product__sidebar__comment__item__text">
                                        <ul>
                                            <li>Ação/Drama</li>
                                            <li>Filme</li>
                                        </ul>
                                        <h5>
                                            <a href="#">A Mulher Rei</a>
                                        </h5>
                                        <span>
                                            <i class="fa fa-eye"></i> 19.141 Viewes </span>
                                    </div>
                                </div>
                                <div class="product__sidebar__comment__item">
                                    <div class="product__sidebar__comment__item__pic">
                                        <img src="img/in-theaters-15.jpg" alt="" style="width: 90px; height: 130px;">
                                    </div>
                                    <div class="product__sidebar__comment__item__text">
                                        <ul>
                                            <li>Terror/Ficção Científica</li>
                                            <li>Filme</li>
                                        </ul>
                                        <h5>
                                            <a href="#">Não! Não Olhe!</a>
                                        </h5>
                                        <span>
                                            <i class="fa fa-eye"></i> 19.141 Viewes </span>
                                    </div>
                                </div>
                                <div class="product__sidebar__comment__item">
                                    <div class="product__sidebar__comment__item__pic">
                                        <img src="img/in-theaters-16.jpg" alt="" style="width: 90px; height: 130px;">
                                    </div>
                                    <div class="product__sidebar__comment__item__text">
                                        <ul>
                                            <li>Terror</li>
                                            <li>Filme</li>
                                        </ul>
                                        <h5>
                                            <a href="#">Convite Maldito</a>
                                        </h5>
                                        <span>
                                            <i class="fa fa-eye"></i> 19.141 Viewes </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="footer">
            <div class="page-up">
                <a href="#" id="scrollToTopButton">
                    <span class="arrow_carrot-up"></span>
                </a>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer__nav">
                            <ul>
                                <li class="active">
                                    <a href="#">Página Inicial</a>
                                </li>
                                <li>
                                    <a href="Cinemas">Cinemas</a>
                                </li>
                                <li>
                                    <a href="Agendamentos">Sessões</a>
                                </li>
                                <li>
                                    <a href="#">Contatos</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div class="search-model">
            <div class="h-100 d-flex align-items-center justify-content-center">
                <div class="search-close-switch">
                    <i class="icon_close"></i>
                </div>
                <form class="search-model-form">
                    <input type="text" id="search-input" placeholder="Buscar filme...">
                </form>
            </div>
        </div>
|]