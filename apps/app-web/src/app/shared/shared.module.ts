import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StarRatingModule } from 'angular-star-rating';

import { DynamicFormModule } from './components/dynamic-form/dynamic-form.module';
import { LoginFormModule } from './components/login/login-form.module';
import { IconeWhatsappComponent } from './components/icone-whatsapp/icone-whatsapp.component';
import { CardProdutoModule } from './components/card-produto/card-produto.module';
import { CardClienteModule } from './components/card-cliente/card-cliente.module';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { VisualizacaoClientesModule } from './components/visualizacao-clientes/visualizacao-clientes.module';
import { SocialNetworkLinksComponent } from './components/social-network-links/social-network-links.component';
import { ScrolltopModule } from './components/scrolltop/scrolltop.module';

import { CountUpModule } from 'ngx-countup';
import { LoadingCubeComponent } from './components/loading-cube/loading-cube.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { CheckoutDisplayComponent } from './components/dialogs/checkout-display/checkout-display.component';
import { BotaoEsgotadoComponent } from './components/botao-esgotado/botao-esgotado.component';
import { CaixaObterEmailComponent } from './components/dialogs/caixa-obter-email/caixa-obter-email.component';
import { MercadopagoButtonComponent } from './components/mercadopago-button/mercadopago-button.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { EscreverComentarioModule } from './components/escrever-comentario/escrever-comentario.module';
import { ExibirListaComentarioComponent } from './components/exibir-lista-comentario/exibir-lista-comentario.component';
import { ExibirComentarioModule } from './components/exibir-comentario/exibir-comentario.module';
import { CardComentarioModule } from './components/card-comentario/card-comentario.module';
import { CardComentarioProdutoComponent } from './components/card-comentario-produto/card-comentario-produto.component';
import { CardComentarioProdutoModule } from './components/card-comentario-produto/card-comentario-produto.module';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer:true,
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
  declarations: [IconeWhatsappComponent,
     SocialNetworkLinksComponent,
     TestimonialComponent,
     LoadingCubeComponent,
     CloseBtnComponent,
     CheckoutDisplayComponent,
     BotaoEsgotadoComponent,
     CaixaObterEmailComponent,
     MercadopagoButtonComponent,
     CardBlogComponent,
     ExibirListaComentarioComponent,
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
    CardClienteModule,
    RouterModule,
    CKEditorModule,
    ScrolltopModule,
    CountUpModule,
    IvyCarouselModule,
    GalleryModule,
    LightboxModule.withConfig({
      panelClass: 'fullscreen'
    }),
    SwiperModule,
    StarRatingModule.forRoot(),
    NgxMaskModule.forRoot(),
    ExibirComentarioModule,
    EscreverComentarioModule,
    CardComentarioModule,
    CardComentarioProdutoModule,
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
    CKEditorModule,
    ScrolltopModule,
    CountUpModule,
    LoadingCubeComponent,
    NgxMaskModule,
    CloseBtnComponent,
    BotaoEsgotadoComponent,
    MercadopagoButtonComponent,
    CardBlogComponent,
    EscreverComentarioModule,
    ExibirComentarioModule,
    ExibirListaComentarioComponent,
    CardComentarioProdutoModule,
    CardComentarioModule,
    IvyCarouselModule,
    GalleryModule,
    LightboxModule,
    SwiperModule,
    StarRatingModule,
    ExibirComentarioModule,
  ],
  providers:[
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
