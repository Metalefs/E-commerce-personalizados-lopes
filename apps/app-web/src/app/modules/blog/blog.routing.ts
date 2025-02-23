import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './page/blog/blog.component';
import { ExibicaoBlogComponent } from './page/exibicao-blog/exibicao-blog.component';
import { ListagemPostsComponent } from './page/listagem-posts/listagem-posts.component';
export const routes: Routes = [
  {
    path: '',
    component: BlogComponent,

    data: { animation:'isRight' },
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: ListagemPostsComponent,
        data: { animation:'isRight', title: 'Blog' }
      },
    ]
  },
  {

    path: ':id',
    component: BlogComponent,
    pathMatch: 'full',
    data: { animation:'isRight', title: 'Blog' },
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: ExibicaoBlogComponent,
        data: { animation:'isLeft', title: 'Blog' },
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPageRoutes {}
