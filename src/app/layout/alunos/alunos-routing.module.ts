import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './components/alunos/alunos.component';
import { AlunoFormComponent } from './components/aluno-form/aluno-form.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

// const routes: Routes = [{ path: '', component: AlunosComponent }];
const routes: Routes = [
  { path: '', component: AlunosComponent },
  {
    path: ':id',
    component: AlunoComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente'],
    },
  },
  {
    path: 'create',
    component: AlunoFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente'],
    },
  },
  {
    path: 'edit/:id',
    component: AlunoFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
