import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Produto } from 'libs/data/src/lib/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'apps/app-web/src/app/data/service';
import { Select, Store } from '@ngxs/store';
import { GostarProduto, LerProduto } from 'apps/app-web/src/app/data/store/actions/Produto.actions';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Observable, pipe, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import {GalleryConfig, ThumbnailsPosition, GalleryItem, Gallery } from 'ng-gallery';
import { AdicionarProdutoAoOrcamento } from 'apps/app-web/src/app/data/store/actions/Orcamento.actions';

@Component({
  selector: 'personalizados-lopes-exibicao-produto',
  templateUrl: './exibicao-produto.component.html',
  styleUrls: ['./exibicao-produto.component.scss']
})
export class ExibicaoProdutoComponent implements OnInit {
  galleryConfig$: Observable<GalleryConfig>;

  Url:string;
  Produto:Produto;
  Liked:boolean = false;

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  areProdutosLoadedSub: Subscription;
  images: GalleryItem[];
  images$: Observable<GalleryItem[]>;
  isOrcamento:boolean = false;
  constructor(
    breakpointObserver: BreakpointObserver,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private gallery: Gallery,
    private store: Store) {

      this.galleryConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
            return {
              thumbPosition: ThumbnailsPosition.Left,
              thumbWidth: 80,
              thumbHeight: 80
            };
          }
          return {
            thumbPosition: ThumbnailsPosition.Left,
            thumbWidth: 120,
            thumbHeight: 90
          };
        })
      );
    }

  ngOnInit(): void {
    this.LerProdutosCarregados();
    if(this.Produto.Quantidade == 0)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
    this.Url = `https://${window.location.href}`;
  }

  AdicionarAoOrcamento(){
    this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto));
    this.isOrcamento = true;
    setTimeout(()=>{
      this.router.navigateByUrl("/orcamento");
    },1500)
  }

  Like(){
    if(!localStorage.getItem(`heartproduto${this.Produto._id}`)){
      this.store.dispatch(new GostarProduto(this.Produto._id)).subscribe(x=>{
        this.Liked = true;
        localStorage.setItem(`heartproduto${this.Produto._id}`,'true');
      });
    }
    else
      return
  }

  LerProdutosCarregados(){
    let id = this.activeRoute.snapshot.params['id'];
    this.Liked = localStorage.getItem(`heartproduto${id}`) == 'true' ? true: false;

    const galleryRef = this.gallery.ref('myGallery');

    this.Produtos$.subscribe( res => {
      const index = res.findIndex(item => item._id === id);
      this.Produto = res[index];
      this.Produto?.Imagem.forEach(img =>{
        console.log(img);
        galleryRef.addImage({ src:img, thumb: img });
      });
    });
  }

  RecarregarProdutos(){
    this.areProdutosLoadedSub = this.areProdutosLoaded$.pipe(
      tap((areProdutosLoaded) => {
        if(!areProdutosLoaded)
          this.store.dispatch(new LerProduto());
      })
    ).subscribe(value => {
      console.log(value);
    });
  }
}
