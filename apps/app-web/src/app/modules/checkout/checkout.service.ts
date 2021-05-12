import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public static DadosCompleto:boolean;
  public static EnderecoCompleto:boolean;
  public static PagamentoCompleto:boolean;
  public static valid:boolean;
  public static erros:string[] = [];
  constructor() { }
  Validate(Orcamento){
    CheckoutService.valid = false;
    CheckoutService.erros = [];


    Orcamento.Produto.forEach(prd=>{
      if(!prd.Produto.Cor)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui cor selecionada.`);
      if(!prd.Produto.Quantidade || prd.Produto.Quantidade <= 0)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui quantidade selecionada.`);
      if(!prd.Produto.Tamanho)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui tamanho selecionado.`);
      if(!prd.Produto.Arte)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui arte selecionada.`);
    })

    CheckoutService.valid = CheckoutService.erros.length == 0;

  }

  getValid(){
    return CheckoutService.valid;
  }
  getErros(){
    return CheckoutService.erros;
  }
}
