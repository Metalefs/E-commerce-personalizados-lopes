import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'apps/app-web/src/environments/environment';
import { EmpresaComponent } from './page/empresa.component';

export const routes: Routes = [
  {
    path: '',
    component: EmpresaComponent,
    data: { animation:'isRight', title: 'Sobre nós' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaPageRoutes {}
