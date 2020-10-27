import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendasComponent } from './components/vendas/vendas.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: VendasComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['atendente', 'gerente'],
    },
  },
  {
    path: 'create',
    component: PedidoFormComponent,
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
export class LojaRoutingModule {}
