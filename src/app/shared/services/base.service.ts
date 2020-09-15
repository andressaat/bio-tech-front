import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export abstract class BaseService {

  private router: Router;

  constructor() {}


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line: ban-types
  public handleError<T>(operation = 'operation', result?: T): Function {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      if (error.status !== 403) {
        this.log(`${operation} failed: ${error.message}`);
      }

      if (error.status === 403) {
        this.log(`Acesso Negado`);
        this.router.navigate(['/access-denied']);
      }
      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return throwError(error);
      // throwError(error);
    };
  }

  public log(message: string): void {
    console.log(message);
  }

}
