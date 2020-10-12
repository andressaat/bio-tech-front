import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'alunos',
        loadChildren: () =>
          import('./alunos/alunos.module').then((m) => m.AlunosModule),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['atendente', 'gerente', 'instrutor', 'nutricionista'],
        },
      },
      {
        path: 'financeiro',
        loadChildren: () =>
          import('./financeiro/financeiro.module').then((m) => m.FinanceiroModule),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['atendente', 'gerente'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
