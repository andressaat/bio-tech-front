import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DietaNutricional } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DietaNutricionalService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super();
  }

  listAll(): Observable<DietaNutricional[]> {
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
      .get<DietaNutricional[]>(`${environment.API_ENDPOINT}/dietas-nutricionais`, { params });
  }

  save(dieta: DietaNutricional): Observable<DietaNutricional> {
    return this.http
      .post(`${environment.API_ENDPOINT}/dietas-nutricionais`, dieta)
      .pipe(catchError(this.handleError<DietaNutricional>('save', {} as DietaNutricional)));
  }

  update(id: number, dieta: DietaNutricional): Observable<DietaNutricional> {
    return this.http
      .patch(`${environment.API_ENDPOINT}/dietas-nutricionais/${id}`, dieta)
      .pipe(catchError(this.handleError<DietaNutricional>('save', {} as DietaNutricional)));
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/dietas-nutricionais/${id}`);
  }

  getDietaNutricional(id: number): Observable<DietaNutricional> {
    return this.http
      .get(`${environment.API_ENDPOINT}/dietas-nutricionais/${id}`)
      .pipe(catchError(this.handleError<DietaNutricional>('getAvaliacaoFisica', {} as DietaNutricional)));
  }
}
