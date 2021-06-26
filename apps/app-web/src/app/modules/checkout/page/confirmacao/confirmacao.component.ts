import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut } from 'apps/app-web/src/app/animations';
import { EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { Cor, StatusProduto } from 'libs/data/src/lib/classes/produto';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable, pipe } from 'rxjs';
import { CheckoutService } from '../../checkout.service';
@Component({
  selector: 'personalizados-lopes-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
  animations:[fade,slideInOut]
})
export class ConfirmacaoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  dataSource: MatTableDataSource<CodProduto>;
  ErroCadastro:boolean = false;
  Total:number = 0;
  @Input() edit = true;
  constructor(public checkoutService: CheckoutService, private store:Store,private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      this.dataSource = new MatTableDataSource<CodProduto>(x.Produto);

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        "Subtotal",
      ];

      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Orçamento já foi enviado! Responderemos em até 48 horas.", "Fechar",{duration:5000}).afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
    })
  }
  upload($event,element){
    if(element){
      let fileNames='';
      getPreviewURL($event,fileNames,(res,name)=>{
        element.Produto.Arte = res;
        fileNames = name;
        this.EditarOrcamento(element);
      })
    }
  }
  IncrementarQuantidade(element){
    if(element){
      element.Produto.Quantidade++;
      this.EditarOrcamento(element);
    }
  }
  DecrescerQuantidade(element){
    if(element){
      if(element.Produto.Quantidade > element.Produto.QuantidadeMinima || element.Quantidade > 1)
      element.Produto.Quantidade--;
      this.EditarOrcamento(element);
    }
  }
  SetarTamanho(element,tamanho){
    if(element){
      element.Produto.Tamanho = tamanho;
      this.EditarOrcamento(element);
    }
  }

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento)).subscribe(store =>{
      this.Orcamento$.subscribe(orc=>{
        this.checkoutService.Validate(orc);
      })
    });
  }

  VerificarQuantidade($event,element){
    if(element){
      element.QuantidadeMinima  = element.QuantidadeMinima== 0 ?1:element.QuantidadeMinima;
      if($event.target.value < element.QuantidadeMinima)
        element.Quantidade = element.QuantidadeMinima;
      this.EditarOrcamento(element)
    }
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        //let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.checkoutService.Validate(x);
        this.dataSource = Produtos as any;
      })
    });
  }

  setColor(cor:Cor, element){
    element.Produto.Cor = cor;
    this.EditarOrcamento(element);
  }

  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      if(produto.Produto){
        let preco;
        let Produto;
        if(produto.Produto.PrecoPromocional){
          preco =  produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;
        }
        let Produtos =  x.Produto;
        let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
        if(Produtos[index])
        Produto = Produtos[index].Produto;
        if(Produto)
        this.Total = preco * Produto.Quantidade;
      }
    })
    if(produto.Produto.Preco){
      let preco = produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;

      return (preco * produto.Produto.Quantidade).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data;
    return 0;
  }

}
