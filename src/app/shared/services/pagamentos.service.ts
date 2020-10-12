import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '@shared/models';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  constructor(
    public http: HttpClient
  ) { }

  listAll(): Observable<Pagamento[]> {
    return this.http
      .get<Pagamento[]>(`${environment.API_ENDPOINT}/pagamentos`);
  }

  save(pagamento: Pagamento) {
    return this.http
      .post(`${environment.API_ENDPOINT}/pagamentos`, pagamento);
  }

  delete(id: string) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/pagamentos/${id}`);
  }

  getPagamento(id: string) {
    return this.http
      .get(`${environment.API_ENDPOINT}/pagamentos/${id}`);
  }

  update(id: string, pagamento: Pagamento) {
    return this.http
      .patch(`${environment.API_ENDPOINT}/pagamentos/${id}`, pagamento);
  }
}
