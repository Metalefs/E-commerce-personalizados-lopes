import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DetalhesCEP } from '../models/interfaces/DetalhesCEP';
import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class CEPService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler){}

    ObterDetalhes(cep:string): Observable<DetalhesCEP> {
        // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

        return this.http.get<DetalhesCEP>(`https://viacep.com.br/ws/${cep}/json`).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
      } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
  }
}
