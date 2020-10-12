import { Injectable } from '@angular/core';
import { Aluno } from '@shared/models';
import { environment } from '@environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  constructor(
    public http: HttpClient
  ) { }

  listAll(): Observable<Aluno[]> {
    return this.http
      .get<Aluno[]>(`${environment.API_ENDPOINT}/alunos`);
  }

  save(aluno: Aluno) {
    return this.http
      .post(`${environment.API_ENDPOINT}/alunos`, aluno);
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/alunos/${id}`);
  }

  getAluno(id: number){
    return this.http
      .get(`${environment.API_ENDPOINT}/alunos/${id}`);
  }

  update(id: number, aluno: Aluno) {
    return this.http
      .patch(`${environment.API_ENDPOINT}/alunos/${id}`, aluno);
  }
}
