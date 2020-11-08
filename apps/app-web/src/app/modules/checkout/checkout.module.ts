import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { ConfirmacaoComponent } from './page/confirmacao/confirmacao.component';
import { DadosComponent } from './page/dados/dados.component';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutPageRoutes } from './checkout.routing';

@NgModule({
  declarations: [CheckoutComponent,ConfirmacaoComponent,DadosComponent],
  imports: [
    CheckoutPageRoutes,
    CommonModule,
    SharedModule
  ]
})
export class CheckoutModule { }
