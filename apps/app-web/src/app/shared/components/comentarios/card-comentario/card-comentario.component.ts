import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ComentarioProduto, Usuario } from 'libs/data/src/lib/classes';
import { Comentario } from 'libs/data/src/lib/classes/blogPost';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { fade } from '../../../../animations';
import { AuthenticationService } from '../../../../core/service/authentication/authentication.service';
import { ComentarioProdutoService } from '../../../../data/service';
declare var require: any;
@Component({
  selector: 'personalizados-lopes-card-comentario',
  templateUrl: './card-comentario.component.html',
  styleUrls: ['./card-comentario.component.scss'],
  animations:[fade]
})
export class CardComentarioComponent implements OnInit {
  tipoUsuario = TipoUsuario;
  Editor;

  @Input()
  Comentario:Comentario;
  @Input()
  ComentarioPai:ComentarioProduto;
  @Input()
  EhResposta:boolean
  @Input()
  IndiceResposta:number
  @Input()
  canEdit:boolean = true;
  usr:Usuario;
  querEditar:boolean =false;
  querResponder:boolean =false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private service:ComentarioProdutoService, private auth:AuthenticationService) {
    if(isPlatformBrowser(this.platformId)){
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.Editor = ClassicEditor;
    }
   }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(x=>{
      if(x)
    this.usr = x
    })
  }

  responder(Comentario:Comentario){
    if(this.EhResposta){
      this.responderPai(Comentario);
      return;
    }
    else {
      this.responderPadrao(Comentario)
    }
    this.querResponder = !this.querResponder;
  }

  responderPai(Comentario:Comentario){
    if(!this.ComentarioPai.Respostas){
      this.ComentarioPai.Respostas = []
      Object.assign(this.ComentarioPai.Respostas, {Respostas: [Comentario]});
    }
    else
      this.ComentarioPai.Respostas.push(Comentario);
      this.service.update(this.ComentarioPai.key,this.ComentarioPai);
  }

  responderPadrao(Comentario:Comentario){
    if(!this.Comentario.Respostas){
      this.Comentario.Respostas = []
      Object.assign(this.Comentario.Respostas, {Respostas: [Comentario]});
    }
    else
      this.Comentario.Respostas.push(Comentario);
      this.service.update(this.Comentario.key,this.Comentario);
  }

  Editar(){
    if(this.EhResposta){
      this.editarPai();
      return;
    }
    if(this.usr?._id == this.Comentario.idUsuario || ''){
      this.service.update(this.Comentario.key,this.Comentario)
    }
  }

  editarPai(){
    this.ComentarioPai.Respostas[this.IndiceResposta] = this.Comentario;
    if(this.usr?._id == this.Comentario.idUsuario || ''){
      this.service.update(this.ComentarioPai.key,this.ComentarioPai)
    }
  }
  like(){
    if(!localStorage.getItem(`like${this.Comentario.key}`)){
      if(!this.Comentario.Likes){
        Object.assign(this.Comentario, 1);
      }
      else
        this.Comentario.Likes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.setItem(`like${this.Comentario.key}`,"true")
    }
    else {
      this.Comentario.Likes -= 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.removeItem(`like${this.Comentario.key}`)
    }
  }
  dislike(){
    if(!localStorage.getItem(`dislike${this.Comentario.key}`)){
      if(!this.Comentario.Dislikes){
        Object.assign(this.Comentario, 1);
      }
      else
        this.Comentario.Dislikes += 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.setItem(`dislike${this.Comentario.key}`,"true")
    }
    else {
      this.Comentario.Dislikes -= 1
      this.service.update(this.Comentario.key,this.Comentario);
      localStorage.removeItem(`dislike${this.Comentario.key}`)
    }
  }
  deletar(){
    if(this.EhResposta){
      this.removerRespostaPai()
      return;
    }
    if(this.usr.Tipo == TipoUsuario.admin){
      this.service.delete(this.Comentario.key)
    }
  }

  removerRespostaPai(){
    this.ComentarioPai.Respostas[this.IndiceResposta].Texto = "<p>comentário removido pelo autor</p>";
    this.service.update(this.ComentarioPai.key,this.ComentarioPai);
  }
}
