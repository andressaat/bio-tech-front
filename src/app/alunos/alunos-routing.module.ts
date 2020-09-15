import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosComponent } from './alunos/alunos.component';

const routes: Routes = [
  { path: '', component: AlunosComponent },
  { path: 'create', component: AlunoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }