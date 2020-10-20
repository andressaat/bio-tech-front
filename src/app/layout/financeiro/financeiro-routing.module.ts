import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagamentoFormComponent } from './components/pagamento-form/pagamento-form.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagamentosComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente', 'gerente'],
    },
  },
  {
    path: 'create',
    component: PagamentoFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente', 'gerente'],
    },
  },
  {
    path: 'edit/:id',
    component: PagamentoFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente', 'gerente'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroRoutingModule {}
