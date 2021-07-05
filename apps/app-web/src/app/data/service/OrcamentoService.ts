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

export class OrcamentoService {
  constructor(private http: HttpClient, private ErrorHandler: ErrorHandler,
    private AuthenticationService: AuthenticationService) { }

  Ler(): Observable<entities.Orcamento[]> {
    return this.http.get<entities.Orcamento[]>(environment.endpoint + RouteDictionary.Orcamento.Padrao).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  FiltrarOrcamentosPorUsuario(token: string): Observable<entities.Orcamento[]> {
    return this.http.get<entities.Orcamento[]>(environment.endpoint + RouteDictionary.Orcamento.Pedidos + `?token=${token}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

  Editar(item: entities.Orcamento): Observable<entities.Orcamento> {
    let payload = this.AuthenticationService.tokenize({ Orcamento: item });
    return this.http.put<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento.Padrao,
      payload).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError) // then handle the error
      );
  }

  Remover(id: string): Observable<any> {
    return this.http.delete<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento.Padrao + `/${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  Incluir(item: entities.Orcamento): Observable<any> {
    let payload = this.AuthenticationService.tokenize({ Orcamento: item });
    return this.http.post<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento.Padrao, payload).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
