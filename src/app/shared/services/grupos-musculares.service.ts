import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrupoMuscular } from '@shared/models';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class GruposMuscularesService {

  constructor(
    public http: HttpClient,
  ) { }

  listAll(): Observable<GrupoMuscular[]> {
    const queryParams = {
      filter: JSON.stringify({
        include: [{
          relation: 'exercicios'
        }]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<GrupoMuscular[]>(`${environment.API_ENDPOINT}/grupo-muscular`, { params });
  }
}
