import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { BlogPostService } from 'apps/app-web/src/app/modules/blog/blog.service';
import { BlogPost, Usuario } from 'libs/data/src/lib/classes';
import { StatusPostagem } from 'libs/data/src/lib/classes/blogPost';
import { map } from 'rxjs/operators';

@Component({
  selector: 'personalizados-lopes-listagem-posts',
  templateUrl: './listagem-posts.component.html',
  styleUrls: ['./listagem-posts.component.scss']
})
export class ListagemPostsComponent implements OnInit {

  Blog:BlogPost[];
  loading:boolean = true;
  statusPostagem = StatusPostagem;
  user:Usuario;
  constructor(private BlogService:BlogPostService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.val(), ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Blog = data;
      this.loading = false;
    });
    this.authService.currentUser.subscribe(x=>{
      this.user = x;
    })
  }
}
