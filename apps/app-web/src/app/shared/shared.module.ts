import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { SwiperModule } from 'ngx-swiper-wrapper'; //NO SSR
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { StarRatingModule } from 'angular-star-rating'; //NO SSR

import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module';
import { LoginFormModule } from './components/login/login-form.module';
import { IconeWhatsappComponent } from './components/icone-whatsapp/icone-whatsapp.component';
import { CardProdutoModule } from './components/card-produto/card-produto.module';
import { CardClienteModule } from './components/card-cliente/card-cliente.module';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { VisualizacaoClientesModule } from './components/visualizacao-clientes/visualizacao-clientes.module';
import { SocialNetworkLinksComponent } from './components/social-network-links/social-network-links.component';
import { ScrolltopModule } from './components/scrolltop/scrolltop.module';

import { LoadingCubeComponent } from './components/loading-cube/loading-cube.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { CheckoutDisplayComponent } from './components/dialogs/checkout-display/checkout-display.component';
import { CaixaObterEmailComponent } from './components/dialogs/caixa-obter-email/caixa-obter-email.component';
import { MercadopagoButtonComponent } from './components/mercadopago-button/mercadopago-button.component';

import { EscreverComentarioModule } from './components/comentarios/escrever-comentario/escrever-comentario.module';

import { CardComentarioModule } from './components/comentarios/card-comentario/card-comentario.module';
import { CardComentarioProdutoModule } from './components/comentarios/exibir-lista-comentario-produto/card-comentario-produto/card-comentario-produto.module';

import { ExibirListaComentarioComponent } from './components/comentarios/exibir-lista-comentario/exibir-lista-comentario.component';
import { ExibirListaComentarioProdutoComponent } from './components/comentarios/exibir-lista-comentario-produto/exibir-lista-comentario-produto.component';
import { ProdutoSwiperComponent } from './components/produto-swiper/produto-swiper.component';
import { ExibicaoPerfilModule } from './components/exibicao-perfil/exibicao-perfil.module';
import { CardBlogModule } from './components/card-blog/card-blog.module';
import { CardPedidoModule } from './components/card-pedido/card-pedido.module';
import { TagProdutoSwiperComponent } from './components/tag-produto-swiper/tag-produto-swiper.component';
import { BlogSwiperComponent } from './components/blog-swiper/blog-swiper.component';
import { EditorModule } from './components/editor/editor/editor.module';
import { AutocompleteDropdownModule } from './components/autocomplete-dropdown/autocomplete-dropdown.module';
import { ExibicaoPrecoProdutoModule } from './components/exibicao-preco-produto/exibicao-preco-produto.module';

import { CorProdutoCheckboxSelectorComponent } from '../modules/gerenciamento/page/editar-produto/components/cor-produto-selector/cor-produto-selector.component';
import { TamanhoProdutoSelectorComponent } from '../modules/gerenciamento/page/editar-produto/components/tamanho-produto-selector/tamanho-produto-selector.component';
import { FornecedorProdutoSelectorComponent } from '../modules/gerenciamento/page/editar-produto/components/fornecedor-produto-selector/fornecedor-produto-selector.component';
import { ExibicaoCanvasDesignProdutoComponent } from './components/exibicao-canvas-design-produto/exibicao-canvas-design-produto.component';
import { TabelaEdicaoOrcamentoComponent } from './components/tabela-edicao-orcamento/tabela-edicao-orcamento.component';

import { ExibicaoArteProdutoComponent } from './components/exibicao-arte-produto/exibicao-arte-produto.component';
import { CostumizationComponent } from './components/exibicao-arte-produto/costumization/costumization.component';
import { StockImageComponent } from './components/exibicao-arte-produto/costumization/dialogs/stock-image/stock-image.component';
import { ImportacaoComponent } from './components/exibicao-arte-produto/costumization/dialogs/importacao/importacao.component';
import { VisualizacaoProdutoLojaModule } from './components/visualizacao-produto-loja/visualizacao-produto-loja.module';
import { PreviewProdutoModule } from './components/dialogs/preview-produto/preview-produto.module';
import { CardEstampaModule } from './components/card-estampa/card-estampa.module';
import { CorProdutoSelectorModule } from './components/cor-produto-selector/cor-produto-selector.module';
import { SelecaoTamanhoProdutoEdicaoComponent } from './components/selecao-tamanho-produto-edicao/selecao-tamanho-produto-edicao.component';
import { ExibicaoPrecoPrazoCepComponent } from './components/dialogs/exibicao-preco-prazo-cep/exibicao-preco-prazo-cep.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

import { UiModule } from "@personalizados-lopes/ui"
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer: true,
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
};

@NgModule({
  declarations: [
    IconeWhatsappComponent,
    SocialNetworkLinksComponent,
    TestimonialComponent,
    LoadingCubeComponent,
    CloseBtnComponent,
    CheckoutDisplayComponent,
    CaixaObterEmailComponent,
    MercadopagoButtonComponent,
    ExibirListaComentarioComponent,
    ExibirListaComentarioProdutoComponent,
    ProdutoSwiperComponent,
    TagProdutoSwiperComponent,
    BlogSwiperComponent,
    CorProdutoCheckboxSelectorComponent,
    TamanhoProdutoSelectorComponent,
    FornecedorProdutoSelectorComponent,
    ExibicaoCanvasDesignProdutoComponent,
    TabelaEdicaoOrcamentoComponent,
    ExibicaoArteProdutoComponent,
    CostumizationComponent,
    StockImageComponent,
    ImportacaoComponent,
    ExibicaoArteProdutoComponent,
    CostumizationComponent,
    StockImageComponent,
    ImportacaoComponent,
    SelecaoTamanhoProdutoEdicaoComponent,
    ExibicaoPrecoPrazoCepComponent,
    CarrouselComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    DynamicFormModule,
    LoginFormModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    CorProdutoSelectorModule,
    CardClienteModule,
    RouterModule,
    ScrolltopModule,
    GalleryModule,
    LightboxModule.withConfig({
      panelClass: 'fullscreen'
    }),
    SwiperModule,
    StarRatingModule.forRoot(),
    NgxMaskModule.forRoot(),
    EscreverComentarioModule,
    CardComentarioModule,
    ExibicaoPerfilModule,
    CardComentarioProdutoModule,
    CardBlogModule,
    CardPedidoModule,
    EditorModule,
    AutocompleteDropdownModule,
    ExibicaoPrecoProdutoModule,
    PreviewProdutoModule,
    CardEstampaModule,
    UiModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    DynamicFormModule,
    LoginFormModule,
    FormsModule,
    ReactiveFormsModule,
    CardProdutoModule,
    CardClienteModule,
    VisualizacaoClientesModule,
    IconeWhatsappComponent,
    SocialNetworkLinksComponent,
    RouterModule,
    TestimonialComponent,
    ScrolltopModule,
    LoadingCubeComponent,
    NgxMaskModule,
    CloseBtnComponent,
    MercadopagoButtonComponent,
    CardBlogModule,
    GalleryModule,
    LightboxModule,
    SwiperModule,
    StarRatingModule,
    EscreverComentarioModule,
    CardComentarioModule,
    CardComentarioProdutoModule,
    ExibirListaComentarioComponent,
    ExibirListaComentarioProdutoComponent,
    ProdutoSwiperComponent,
    ExibicaoPerfilModule,
    CardPedidoModule,
    TagProdutoSwiperComponent,
    BlogSwiperComponent,
    EditorModule,
    AutocompleteDropdownModule,
    CorProdutoSelectorModule,
    ExibicaoPrecoProdutoModule,
    CorProdutoCheckboxSelectorComponent,
    TamanhoProdutoSelectorComponent,
    SelecaoTamanhoProdutoEdicaoComponent,
    FornecedorProdutoSelectorComponent,
    ExibicaoCanvasDesignProdutoComponent,
    TabelaEdicaoOrcamentoComponent,
    ExibicaoArteProdutoComponent,
    CostumizationComponent,
    StockImageComponent,
    ImportacaoComponent,
    VisualizacaoProdutoLojaModule,
    PreviewProdutoModule,
    CardEstampaModule,
    UiModule,
    CarrouselComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
