import { Component, Input, OnInit } from '@angular/core';
import { entities } from '@personalizados-lopes/data';
import { translateEnum } from '../../../../helper/ObjHelper';
import { StatusProduto } from '../../../../../../../../libs/data/src/lib/classes/produto';

@Component({
  selector: 'personalizados-lopes-card-produto-status-produto',
  templateUrl: './card-produto-status-produto.component.html',
  styleUrls: ['./card-produto-status-produto.component.scss']
})
export class CardProdutoStatusProdutoComponent implements OnInit {

  @Input() Produto: Produto;

  @Input() statusProduto: StatusProduto;

  @Input() Produto;

  @Input() translateStatusProduto: (status) => string;

  constructor() {
  }

  ngOnInit(): void {
  }

}