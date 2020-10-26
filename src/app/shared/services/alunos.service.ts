import { Injectable } from '@angular/core';
import { Aluno, Treino } from '@shared/models';
import { environment } from '@environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlunosService extends BaseService {
  constructor(
    public http: HttpClient
  ) {
    super();
   }

  listAll(): Observable<Aluno[]> {
    return this.http
      .get<Aluno[]>(`${environment.API_ENDPOINT}/alunos`);
  }

  save(aluno: Aluno): Observable<Aluno> {
    return this.http
      .post(`${environment.API_ENDPOINT}/alunos`, aluno)
      .pipe(catchError(this.handleError<Aluno>('save', {} as Aluno)));
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/alunos/${id}`);
  }

  getAluno(id: number): Observable<Aluno>{

    const queryParams = {
      filter: JSON.stringify({
        include: [{
          relation: 'treinos',
          scope:{
            order: 'createdAt DESC',
            limit: 1,
            include: [
              {
                relation: 'exercicios',
                scope: {
                  include: [
                    {
                      relation: 'exercicio',
                      scope:  {
                        include: [
                          {
                            relation: 'grupo'
                          }
                        ],
                      }
                    }
                  ],
                }
              }
            ]
          },
        },
      {
        relation: 'avaliacoesFisicas',
        scope:{
          order: 'createdAt DESC',
          limit: 1
        }
      },{
        relation: 'dietaNutricional'
      }]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get(`${environment.API_ENDPOINT}/alunos/${id}`, {params})
      .pipe(catchError(this.handleError<Aluno>('save', {} as Aluno)));
  }

  update(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http
      .patch(`${environment.API_ENDPOINT}/alunos/${id}`, aluno)
      .pipe(catchError(this.handleError<Aluno>('save', {} as Aluno)));
  }

  getTreinos(id: number): Observable<Treino[]> {
    const queryParams = {
      filter: JSON.stringify({
        order: 'createdAt DESC',
        limit: 1,
        include: [{
          relation: 'exercicios',
          scope: {
            include: [
              {
                relation: 'exercicio',
                scope:  {
                  include: [
                    {
                      relation: 'grupo'
                    }
                  ],
                }
              }
            ],
          }
        }]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get(`${environment.API_ENDPOINT}/alunos/${id}/treinos` , {params})
      .pipe(catchError(this.handleError<Treino[]>('save', {} as Treino[])));
  }
}
