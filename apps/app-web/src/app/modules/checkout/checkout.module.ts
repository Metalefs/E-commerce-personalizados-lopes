import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutPageRoutes } from './checkout.routing';
import { EnderecoComponent } from './page/endereco/endereco.component';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultadoPagamentoComponent } from './page/resultado-pagamento/resultado-pagamento.component';
import { PagamentoTransparenteComponent } from './page/pagamento-transparente/pagamento-transparente.component';
import { PagamentoComponent } from './page/pagamento/pagamento.component';
import { CaixaCodigoPromocionalComponent } from './page/confirmacao/caixa-codigo-promocional/caixa-codigo-promocional.component';

@NgModule({
  declarations: [CheckoutComponent, ConfirmacaoComponent, DadosComponent, EnderecoComponent, ResultadoPagamentoComponent, PagamentoTransparenteComponent, PagamentoComponent, CaixaCodigoPromocionalComponent],
  imports: [
    CheckoutPageRoutes,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports:[

  ]
})
export class CheckoutModule { }
