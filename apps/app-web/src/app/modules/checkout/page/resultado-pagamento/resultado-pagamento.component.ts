import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Pedido } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';

import { AdicionarOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { MercadoPagoPayment } from 'libs/data/src/lib/interfaces';
import { IncrementarVendaProduto } from 'apps/app-web/src/app/data/store/actions/produto.actions';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollService } from 'apps/app-web/src/app/shared/services/page-scroll.service';
import { CheckoutService } from '../../checkout.service';
import { PedidoService } from 'apps/app-web/src/app/data/service';

@Component({
  selector: 'personalizados-lopes-resultado-pagamento',
  templateUrl: './resultado-pagamento.component.html',
  styleUrls: ['./resultado-pagamento.component.scss']
})
export class ResultadoPagamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento: Orcamento;
  Pedido: Pedido;

  Finalizado:boolean = false;
  Loading:boolean = false;
  state='flipped';
  payment:MercadoPagoPayment;
  status:StatusPagamento;
  StatusPagamento = StatusPagamento;
  _init_point:{};
  constructor(
    private pedidoService:PedidoService,
    private activeRoute:ActivatedRoute,
    private snack: MatSnackBar,
    private checkoutService: CheckoutService,
    private scrollService:PageScrollService,
    private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
      this.Pedido = new Pedido(x);

      if(this.Orcamento.Produto){
        this.Orcamento.Produto.forEach(prod=>{
          if(!prod.Produto.Vendas)
            Object.assign(prod.Produto,{Vendas:0})
          prod.Produto.Vendas++;
          this.store.dispatch(new IncrementarVendaProduto(prod.Produto._id));
        })
      }

      if(this.Orcamento.Status == StatusOrcamento.enviado)
        this.Finalizado = true;
    })
    setTimeout(()=>{
      this.flip()
      this.LerParametros();
    },0);
  }

  LerParametros(){
    this.activeRoute.queryParams.subscribe(params => {
      this.PreencherDadosPagamentoNoPedido(params);

      switch(params.status){
        case ("approved"): {
          this.status = StatusPagamento.aprovado;
          break;
        }
        case("rejected"):{
          this.status = StatusPagamento.rejeitado;
          this.goCheckout();
          break;
        }
        case("failure"):{
          this.status = StatusPagamento.rejeitado;
          this.goCheckout();
          break;
        }
        case("pending"):{
          this.status = StatusPagamento.pendente;
          break;
        }
        default:{
          this.status = StatusPagamento.desistencia;
        }
      }
      if(!params.status||params.status == 'null'){
        this.status = StatusPagamento.desistencia;
      }
      this.SalvarPedido();
    });
  }

  PreencherDadosPagamentoNoPedido(resultadoPagamento:any){
    this.Pedido.ResultadoPagamentoMP = {
      collection_id: resultadoPagamento.collection_id ?? 0,
      collection_status: resultadoPagamento.collection_status ?? '',
      site_id: resultadoPagamento.site_id ?? '',
      status: resultadoPagamento.status ?? '',
      merchant_account_id: resultadoPagamento.merchant_account_id ?? 0,
      external_reference: resultadoPagamento.external_reference ??' ',
      payment_id: resultadoPagamento.payment_id ?? 0,
      merchant_order_id: resultadoPagamento.merchant_order_id ?? 0,
      preference_id: resultadoPagamento.eference_id ?? '',
      payment_type: resultadoPagamento.payment_type ?? '',
      processing_mode: resultadoPagamento.processing_mode ??''
    }
  }

  SalvarPedido(){
    if(this.OrcamentoValido()){
      if(this.Orcamento.Preco >0) {
        this.AdicionarOrcamento();
        this.AdicionarPedido();
      }
    }
  }

  OrcamentoValido(){
    return this.Orcamento.Usuario.Email&&
    !this.Finalizado&&
    !localStorage.getItem('Orcamento'+this.Orcamento.Produto[0].codOrcamento);
  }

  AdicionarOrcamento(){
    //this.store.dispatch(new AdicionarOrcamento()).subscribe(()=>{
      setTimeout(()=>{
        this.Finalizado = true;
        localStorage.setItem('Orcamento'+this.Orcamento.Produto[0].codOrcamento,"true");
        if(isPlatformBrowser(PLATFORM_ID))
          this.scrollService.scrollDown();

        this.Loading = false;
        if(this.status == StatusPagamento.aprovado || this.status == StatusPagamento.pendente){
          this.Orcamento.Status = StatusOrcamento.enviado;
          this.store.dispatch(new ResetarOrcamento())
        }
      },3500)
    //});
  }

  AdicionarPedido(){
    this.pedidoService.Incluir(this.Pedido).subscribe(()=>{
      this.snack.open("Pedido enviado com sucesso.","fechar",{
        verticalPosition:'top',
        duration:5000
      });
    });
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

  goCheckout(){
    this.Orcamento$.subscribe(orcamento => {
      this.Loading = true;

      if(orcamento.Usuario.Email)
      this.checkoutService.goCheckout(orcamento).subscribe(result => {
        this._init_point = result;
        this.Loading = false;
        if(isPlatformBrowser(PLATFORM_ID))
          this.scrollService.scrollDown();
      })
      else{
        this.snack.open("Carrinho inválido, tente finalizar o pedido no carrinho novamente para concluir o pagamento.","fechar",{
          verticalPosition:'top',
          duration:5000
        });
      }
    })
  }
}
export enum StatusPagamento{
  aprovado,
  pendente,
  rejeitado,
  desistencia
}
