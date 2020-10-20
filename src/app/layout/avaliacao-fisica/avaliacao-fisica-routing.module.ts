import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoFisicaComponent } from './components/avaliacao-fisica/avaliacao-fisica.component';
import { AvaliacaoFisicaFormComponent } from './components/avaliacao-fisica-form/avaliacao-fisica-form.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoFisicaComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['nutricionista', 'gerente'],
    },
  },
  {
    path: 'create',
    component: AvaliacaoFisicaFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['nutricionista', 'gerente'],
    },
  },
  {
    path: 'edit/:id',
    component: AvaliacaoFisicaFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['nutricionista', 'gerente'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoFisicaRoutingModule { }
