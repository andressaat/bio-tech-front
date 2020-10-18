import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treino, TreinoExercicio } from '@shared/models';
import { environment } from '@environment';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreinoService extends BaseService{

  constructor(public http: HttpClient) {
    super();
   }

  listAll(): Observable<Treino[]> {
    const queryParams = {
      filter: JSON.stringify({
        include: [
          {
            relation: 'exercicios'
          },
          {
            relation: 'aluno'
          }
        ]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<Treino[]>(`${environment.API_ENDPOINT}/treinos`, { params });
  }

  save(treino: Treino): Observable<Treino>{
    return this.http
      .post<Treino>(`${environment.API_ENDPOINT}/treinos`, treino)
      .pipe(catchError(this.handleError<Treino>('save', {} as Treino)));
  }

  addExercicio(treinoId: number, exercicio: TreinoExercicio): Observable<TreinoExercicio>{
    return this.http
      .post<TreinoExercicio>(`${environment.API_ENDPOINT}/treinos/${treinoId}/treino-exercicios`, exercicio)
      .pipe(catchError(this.handleError<TreinoExercicio>('addExercicio', {} as TreinoExercicio)));
  }
}
