import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Produto } from 'libs/data/src/lib/classes';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoService } from '../../../data/service';
import { removeDuplicates } from '../../../helper/ObjHelper';

@Component({
  selector: 'personalizados-lopes-tag-produto-swiper',
  templateUrl: './tag-produto-swiper.component.html',
  styleUrls: ['./tag-produto-swiper.component.scss']
})
export class TagProdutoSwiperComponent implements OnInit {

  ProdutosTag:Produto[] = [];
  @Input()TAGS:string[];
  slidesPerView:number=3;
  @ViewChild('swiperEl2') swiperEl2: ElementRef;


  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperEl2?.nativeElement?.swiper?.autoplay.stop();
    } else {
      this.swiperEl2?.nativeElement?.swiper?.autoplay.start();
    }
  }
  constructor(
    private breakpointObserver: BreakpointObserver,
    private service:ProdutoService) {

    }
    swiperConfig$: Observable<SwiperConfigInterface>;
    ngOnInit(): void {
      let fQuery:FiltrarProdutoSearchQuery={
        Nome: "",
        NomeCategoria: "",
        Preco: "",
        Status: "",
        Marca: "",
        Cores: "",
        Modelo: "",
        Tags:this.TAGS.join(","),
      }
      this.service.FiltrarProdutos(fQuery,1,20).subscribe(x=>{
       this.ProdutosTag = x.items;
      })
      this.swiperConfig$ = this.breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
              return {
                direction              : 'horizontal',
                keyboard               : true,
                loop                   : true,
                loopFillGroupWithBlank : false,
                preloadImages          : true,
                lazy                   : true,
                observer               : true,
                spaceBetween           : 1,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                slidesPerView:1,
                autoplay: {
                  delay               : 4000,
                  disableOnInteraction: false,
                },
              }
          }
          else{
            return {
              direction              : 'horizontal',
              updateOnWindowResize   : true,
              autoHeight             : true,
              height                 : 400,
              keyboard               : true,
              loop                   : this.ProdutosTag.length > this.slidesPerView ? true : false,
              loopFillGroupWithBlank : true,
              spaceBetween           : 22,
              preloadImages          : false,
              lazy                   : false,
              observer               : true,
              slidesPerView          : this.ProdutosTag.length > this.slidesPerView ? this.slidesPerView : this.ProdutosTag.length,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              autoplay: {
                delay               : 4000,
                disableOnInteraction: true,
              }
            }
          }
        })
      );
    }
}
