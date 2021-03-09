import 'rxjs/add/operator/filter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cardFlip, fade, slideInOut } from '../../../animations';
import { FiltroProduto } from '../../../data/models/filtroProduto';
import { OrderType } from '../../../data/models/order-type';
import { LerCategoria } from '../../../data/store/actions/categoria.actions';
import { EditarFiltroProduto } from '../../../data/store/actions/filtroproduto.actions';
import { LerProduto } from '../../../data/store/actions/produto.actions';
import { CategoriaState, FiltroProdutoState, ProdutoState } from '../../../data/store/state';
import { FiltroProdutoStateModel } from '../../../data/store/state/filtroproduto.state';
import { ObterImagensCarousel } from '../../../helper/FileHelper';
import { FiltroCategoria, FiltroCategoriaDialogComponent } from './dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacao, FiltroOrdenacaoDialogComponent } from './dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';
import { ProdutoService } from '../../../data/service';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { order, orderPreco } from '../../../helper/ObjHelper';
import { NgDialogAnimationService } from 'ng-dialog-animation';

@Component({
  selector: 'personalizados-lopes-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [cardFlip,fade,slideInOut]
})
export class ProdutosComponent implements OnInit {
  state = "flipped"
  defaultCategory = "Todos os produtos";
  CategoriaAtiva:Categoria;

  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<Categoria[]>;
  @Select(CategoriaState.areCategoriasLoaded) areCategoriasLoaded$;
  areCategoriasLoadedSub: Subscription;

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  Produtos:Produto[];

  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<FiltroProdutoStateModel>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  areProdutosLoadedSub: Subscription;

  activeSearchFilter = "";
  activeOrderFilter:number = TiposOrdenacao.nome;
  @ViewChild('carousel', { static: true }) carousel

  page:number = 1;
  limit:number = 12;
  total:number = 0;

  loading:boolean = false;
  loading_more:boolean = false;
  imagens:[{path:string}] = [{path:ObterImagensCarousel()[0]}];
  ordertypes:OrderType[]= [
    {name:'nome (a-z)', id: TiposOrdenacao.nome},
    {name:'nome (z-a)', id: TiposOrdenacao.nomeDesc},
    {name:'maior preço', id: TiposOrdenacao.preco},
    {name:'menor preço', id: TiposOrdenacao.precoDesc},
  ]

  constructor(
    private dialog: NgDialogAnimationService,
    private store: Store,
    private activeRoute: ActivatedRoute,
    private produtoService: ProdutoService
    ) {

  }

  ngOnInit(): void {
    this.Filtro$.subscribe(x=>{
      if(x.Categoria)
      this.CategoriaAtiva = x.Categoria;
      else{
        this.CategoriaAtiva = new Categoria(this.defaultCategory,this.defaultCategory)
      }
      this.activeOrderFilter = x.OrderFilter;
      this.activeSearchFilter = x.SearchFilter;
    })
    this.Atualizar();
    setTimeout(()=>{
      this.flip()
    },0)
    this.carousel.handleHorizontalSwipe = null;
    this.carousel.handleTouchstart = null;
    this.carousel.handleTouchend = null;
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  Atualizar(){
    this.atualizarFiltroAtivo();
    this.RecarregarCategorias();
    this.LerParametros();
  }

  LerParametros(){
    this.activeRoute.queryParams.filter(params => params.categoria)
    .subscribe(params => {
      this.SetCategoria(new Categoria(params.categoria, ""));
    })
    this.activeRoute.queryParams.filter(params => params.nome)
    .subscribe(params => {
      this.activeSearchFilter = params.nome;
      this.atualizarFiltroAtivo();
    })
  }
  fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
    Tags:"",
  }
  atualizarFiltroAtivo(){
    this.loading = true;
    this.fQuery.Nome = this.activeSearchFilter||''
    this.fQuery.NomeCategoria  = this.CategoriaAtiva.Nome||"";
    if(this.page > 1)
      this.page =1;
    this.produtoService.FiltrarProdutos(this.fQuery,this.page,this.limit).subscribe(async x=>{
      this.total = x.total;
      this.Produtos = x.items;
      switch(+this.activeOrderFilter){
        case TiposOrdenacao.nome:
         x.items = x.items.sort((a, b) => a.Nome.localeCompare(b.Nome));
        break;

        case TiposOrdenacao.nomeDesc:
         x.items = x.items.sort((a, b) => this.order(a,b,true));
        break;

        case TiposOrdenacao.preco:
         x.items = x.items.sort((a, b) => this.orderPreco(a,b,false));
        break;

        case TiposOrdenacao.precoDesc:
         x.items = x.items.sort((a, b) => this.orderPreco(a,b,true));
        break;
      }

      let FiltroProduto:FiltroProduto = {
        Categoria:this.CategoriaAtiva,
        SearchFilter:this.activeSearchFilter,
        OrderFilter:this.activeOrderFilter,
        Produtos: x.items.filter(x=>this.filtroAtivo(x)),
      };

      this.store.dispatch(new EditarFiltroProduto(FiltroProduto)).subscribe();
      await delay(400).then(x=>{this.loading = x;});

      function delay(ms: number): Promise<boolean> {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(false);
          }, ms);
        });
      }
    })
  }

  filtroAtivo(produto:Produto){
    if(this.matchSearchFilter(produto))
    return this.CategoriaAtiva?.Nome == this.defaultCategory
            ||  this.CategoriaAtiva?.Nome == produto.Categoria.Nome;
  }

  matchSearchFilter(produto:Produto){
    if(this.activeSearchFilter)
    return this.activeSearchFilter.length > 0 ?
     produto.Nome.toLocaleLowerCase().includes(this.activeSearchFilter.toLocaleLowerCase())
     :
     true;

    return true;
  }
  order(a,b,desc){
    return order(a,b,desc)
  }
  orderPreco(a,b,desc){
    return orderPreco(a,b,desc)
  }

  redefinirBusca(){
    this.SetCategoria(new Categoria(this.defaultCategory,this.defaultCategory));
    this.activeSearchFilter= '',
    this.activeOrderFilter=0;
  }
  SetCategoria(categoria:Categoria){
    this.CategoriaAtiva = categoria == null ?
    new Categoria(this.defaultCategory,this.defaultCategory)
    :
    this.CategoriaAtiva = categoria;
    this.ResetPage();
    this.atualizarFiltroAtivo();
  }
  ResetPage(){
    this.page = 1;
  }
  CarregarMaisProdutos(){
    this.page++;
    this.loading_more = true;
    this.produtoService.FiltrarProdutos(this.fQuery,this.page,this.limit).subscribe(x=>{
      this.total = x.total;
      x.items.forEach(item=>this.Produtos.push(item))
      this.loading_more = false;
    })
  }

  RecarregarCategorias(){
    this.areCategoriasLoadedSub = this.areCategoriasLoaded$.pipe(
      tap((areCategoriasLoaded) => {
        if(!areCategoriasLoaded)
          this.store.dispatch(new LerCategoria());
      })
    ).subscribe(value => {
    });
  }

  AbrirDialogoCategorias(){
    this.Categorias$.subscribe(x=>{
      const dialogRef = this.dialog.open(FiltroCategoriaDialogComponent, {
        restoreFocus: false,
        width:'512px',
        data:{Categorias:x,CategoriaAtiva:this.CategoriaAtiva} as FiltroCategoria,
        height:'100vh',
        animation: {
          to: "right",
          incomingOptions: {
            keyframeAnimationOptions: { easing: "ease", duration: 300 }
          },
          outgoingOptions: {
            keyframeAnimationOptions: { easing: "ease", duration: 300 }
          }
        },
        position: { rowEnd: "0" },
        panelClass:['','animate__animated','animate__slideInLeft']
      });
      dialogRef.afterClosed().subscribe((result :Categoria) => {
        this.SetCategoria(result);
      });
    })
  }

  AbrirDialogoOrdenacao(){
    const dialogRef = this.dialog.open(FiltroOrdenacaoDialogComponent, {
      restoreFocus: false,
      width:'512px',
      data:{
        ordertypes:this.ordertypes,
        activeOrderFilter:this.activeOrderFilter
      } as FiltroOrdenacao,
      height:'100vh',
      animation: {
        to: "left",
        incomingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        }
      },
      position: { rowStart: "0" },

      panelClass:['','animate__animated','animate__slideInRight']
    });
    dialogRef.afterClosed().subscribe((result :OrderType) => {
      if(result){
        this.activeOrderFilter = result.id;
        this.atualizarFiltroAtivo()
      }
    });
  }

  translate(orderId:number){
    return this.ordertypes.filter(x=>x.id == orderId)[0].name;
  }
  Ceil(number){
    return Math.ceil(number);
  }
}
export enum TiposOrdenacao {
  nome,
  nomeDesc,
  preco,
  precoDesc
}
