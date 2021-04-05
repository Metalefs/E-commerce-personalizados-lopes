import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';

import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class IntegracoesService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Integracoes> {
        return this.http.get<entities.Integracoes>(environment.endpoint + RouteDictionary.Integracoes).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }
    Editar(item: entities.Integracoes): Observable<entities.Integracoes> {
        let payload = this.AuthenticationService.tokenize({Integracoes:item});
        console.log(payload);
        return this.http.put<entities.Integracoes>(environment.endpoint + RouteDictionary.Integracoes,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }
    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Integracoes>(environment.endpoint + RouteDictionary.Integracoes + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }
    Incluir(item: entities.Integracoes): Observable<any> {
        let payload = this.AuthenticationService.tokenize({Integracoes:item});
        return this.http.post<entities.Integracoes>(environment.endpoint + RouteDictionary.Integracoes, {payload}).pipe(
            retry(3),
            catchError(this.ErrorHandler.handleError)
        );
    }
}
