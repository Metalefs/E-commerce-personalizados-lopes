import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy } from '@angular/core';
import { entities } from '@personalizados-lopes/data';

import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { Router, RouterOutlet } from '@angular/router';
import { Link } from '../../../data/models';
import { fade, slider } from '../../../animations';

@Component({
  selector: 'personalizados-lopes-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.scss'],

  animations: [slider,fade]
})
export class GerenciamentoComponent implements OnInit {
  user: entities.Usuario;
  activenav:string = "Dashboard";
  opened = true;
  navs:Link[];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private cdr: ChangeDetectorRef,
    media: MediaMatcher,
    private AuthenticationService:AuthenticationService,
     private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => cdr.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }

  LerWindowSize(){
      return this.mobileQuery;
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);

    this.navs = [
      {name: "Dashboard", href: "/gerenciamento/app"},
      {name: "Produtos", href: "produtos"},
      {name: "Pedidos", href: "pedidos"},
      {name: "Usuarios Interessados", href: "emails"},
      {name: "Categorias de produtos", href: "categoria"},
      {name: "Depoimentos", href: "cliente"},
      {name: "Blog", href: "blog"},
      {name: "Sobre a empresa", href: "sobre"},
      {name: "Informações de contato", href: "informacaocontato"},
      {name: "Serviços da empresa", href: "servico"},
      {name: "Carrosel de imagens", href: "carrosel"},
      {name: "Mensagens Automaticas", href: "mensagem"},
      {name: "Imagens do site", href: "imagens"},
      {name: "Integrações", href: "integracoes"},
    ]
  }
  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
  togglenav(nav:any, state:boolean){
    this.activenav = nav.name;
    this.opened=false;
  }
}
