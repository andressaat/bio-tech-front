import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { AvaliacaoFisica } from '@shared/models';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoFisicaService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super();
  }

  listAll(): Observable<AvaliacaoFisica[]> {
    const queryParams = {
      filter: JSON.stringify({
        order: 'createdAt DESC',
        include: [{
          relation: 'aluno'
        }]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<AvaliacaoFisica[]>(`${environment.API_ENDPOINT}/avaliacoes-fisicas`, {params});
  }

  save(avaliacao: AvaliacaoFisica): Observable<AvaliacaoFisica> {
    return this.http
      .post(`${environment.API_ENDPOINT}/avaliacoes-fisicas`, avaliacao)
      .pipe(catchError(this.handleError<AvaliacaoFisica>('save', {} as AvaliacaoFisica)));
  }

  update(id: number, avaliacao: AvaliacaoFisica): Observable<AvaliacaoFisica> {
    return this.http
      .patch(`${environment.API_ENDPOINT}/avaliacoes-fisicas/${id}`, avaliacao)
      .pipe(catchError(this.handleError<AvaliacaoFisica>('save', {} as AvaliacaoFisica)));
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/avaliacoes-fisicas/${id}`);
  }

  getAvaliacaoFisica(id: number): Observable<AvaliacaoFisica> {
    return this.http
      .get(`${environment.API_ENDPOINT}/avaliacoes-fisicas/${id}`)
      .pipe(catchError(this.handleError<AvaliacaoFisica>('getAvaliacaoFisica', {} as AvaliacaoFisica)));
  }
}
