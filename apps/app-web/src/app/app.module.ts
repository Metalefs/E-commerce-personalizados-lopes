import { BrowserModule, Title, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './core/interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { LIGHTBOX_CONFIG } from 'ng-gallery/lightbox';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';

import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './core/service/RouteReuseService';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { TransferHttpCacheModule } from '@nguniversal/common';

import { CookieLawModule } from 'angular2-cookie-law';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { States } from './data/store/state';
import { OrcamentoService, ProdutoService, EmailNotificacaoService, ImagemService, ItemCarouselService, SobreService, EstampaService } from './data/service';
import { CEPService, EstadoService } from './shared/services'
import { MediaMatcher } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { NgxSpinnerModule } from "ngx-spinner";

import { CheckoutService } from './modules/checkout/checkout.service';
import { DocumentRef } from './shared/services/document.service';
import { WindowRef } from './shared/services/window.service';
import { PageScrollService } from './shared/services/page-scroll.service';
import { AuthenticationService } from './core/service/authentication/authentication.service';
import { BaseService } from './data/service/base/base.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
NgxsModule.forRoot(States, { developmentMode: !environment.production })
@NgModule({
  declarations: [AppComponent],
  imports:
  [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    AngularFireStorageModule,
    HammerModule,
    CookieLawModule,
    GalleryModule,
    LightboxModule,
    ImageViewerModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCYzAtXmRwAvgeqvVn1J8SNC0TOEM6Jbq4",
      authDomain: "personalizados-lopes-web-app.firebaseapp.com",
      databaseURL: "https://personalizados-lopes-web-app.firebaseio.com",
      projectId: "personalizados-lopes-web-app",
      storageBucket: "personalizados-lopes-web-app.appspot.com",
      messagingSenderId: "38712629948",
      appId: "1:38712629948:web:2ac14da01082ccff1c0eb9",
      measurementId: "G-DJB9B89GXD"
    }),
    AppRoutingModule,
    NgxSpinnerModule,
    NgxsModule.forRoot(States),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled:true
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PerfectScrollbarModule,
  ],
  providers: [
    NgDialogAnimationService,
    Title,
    CheckoutService,
    AuthenticationService,
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: WindowRef },
    { provide: DocumentRef },
    { provide: AngularFireStorage },
    { provide: BaseService },
    { provide: ProdutoService },
    { provide: PageScrollService },
    { provide: SobreService },
    { provide: OrcamentoService },
    { provide: EmailNotificacaoService },
    { provide: ItemCarouselService },
    { provide: ImagemService },
    { provide: EstampaService },
    { provide: CEPService },
    { provide: EstadoService },
    { provide: ErrorHandler },
    { provide: MediaMatcher },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
