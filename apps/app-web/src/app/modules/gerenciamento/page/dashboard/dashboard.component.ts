import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService } from '../../../../data/service/';
import { CategoriaService } from '../../../../shared/services/';
@Component({
  selector: 'personalizados-lopes-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Produtos:entities.Produto[];
  constructor(private breakpointObserver: BreakpointObserver,
    private service: ProdutoService, private ServicoCategoria: CategoriaService) {
    this.service = service;
  }

  ngOnInit(){
  }
}
