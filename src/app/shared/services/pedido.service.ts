import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService{

  constructor(
    public http: HttpClient
  ) {
    super();
  }

  listAll(): Observable<Pedido[]> {
    const queryParams = {
      filter: JSON.stringify({
        order: 'createdAt DESC',
        include: [{
          relation: 'itens'
        }]
      })
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<Pedido[]>(`${environment.API_ENDPOINT}/pedidos`, { params });
  }

  save(pedido: Pedido): Observable<Pedido>{
    return this.http
      .post<Pedido>(`${environment.API_ENDPOINT}/pedidos`, pedido)
      .pipe(catchError(this.handleError<Pedido>('save', {} as Pedido)));
  }
}
