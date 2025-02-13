import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';

import { Estampa, Imagem } from 'libs/data/src/lib/classes';
import { ErrorHandler } from '../../core/error.handler';

import { ImagemService } from './ImagemService';
import { BaseServiceWithImageHandling } from './base/base-with-image-handling';
import { environment } from 'apps/app-web/src/environments/environment';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { isEmpty } from '../../helper/ObjHelper';
@Injectable({
  providedIn: 'root'
})

export class EstampaService extends BaseServiceWithImageHandling<Estampa> {

  constructor(
    protected http: HttpClient,
    protected ErrorHandler: ErrorHandler,
    protected servicoImagem: ImagemService
    ) {
      super(RouteDictionary.Estampa.Raiz,http,ErrorHandler,servicoImagem)
    }
    FiltrarPorIdCategoria(idCategoria: any): Observable<Array<Estampa>> {
      return this.http.get<Array<Estampa>>(environment.endpoint + RouteDictionary.Estampa.Raiz + `?idCategoria = ${idCategoria}`).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      );
    }

    async Editar(item: Estampa): Promise<Observable<Estampa>> {
      return this.EditarImagens(item).then(x => {
        return this.http.put<Estampa>(environment.endpoint + RouteDictionary.Estampa.Raiz,
          {item}).pipe(
            retry(3),
            catchError(this.ErrorHandler.handleError)
          )
      });
    }

    async EditarImagens(item: Estampa): Promise<Estampa> {
      if (!isEmpty(item.Files[0])) {
        let deletar = confirm("Imagens diferentes, deletar?");
        if (deletar)
          await this.DeletarImagem(item);
        return await this.SalvarImagem(item);
      }
    }


    async Remover(id: string): Promise<Observable<any>> {
      return new Promise((resolve, reject) => {
        this.Filtrar(id).subscribe(async (Estampa :any) => {
          if(Estampa[0].Imagem)
            await this.servicoImagem.deleteImage(Estampa[0].Imagem[0].Src)
            .catch(err=>{this.ErrorHandler.handleError(err);reject(err)});

          resolve(this.http.delete<Estampa>(environment.endpoint + RouteDictionary.Estampa.Raiz + `${id}`).pipe(
            retry(3),
            catchError(this.ErrorHandler.handleError)
          ));
        })
      })
    }

    async DeletarImagem(item: Estampa) {
      if (item.Imagem)
        return await this.servicoImagem.deleteImage(item.Imagem[0].Src).catch(ex=>{
          console.log(ex);
        })
    }

    async SalvarImagem(item: Estampa): Promise<Estampa> {
      if (item.Files?.length) {
        for (let i = 0; i <= item.Files.length; i++)
          if (item.Files[i])
            await this.servicoImagem.storeImage(PathDictionary.estampas, item.Files[i]).then(async x => {
              let src = await this.servicoImagem.getRef((await x).metadata.fullPath, item.Nome, "Estampa");
              item.Imagem[i] = new Imagem(src,item.Nome,'Estampa');
            })
        return item;
      }
    }
}
