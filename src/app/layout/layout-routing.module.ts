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
          import('./financeiro/financeiro.module').then(
            (m) => m.FinanceiroModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['atendente', 'gerente'],
        },
      },
      {
        path: 'treinos',
        loadChildren: () =>
          import('./treinos/treinos.module').then((m) => m.TreinosModule),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['instrutor', 'gerente'],
        },
      },

      {
        path: 'avaliacao-fisica',
        loadChildren: () =>
          import('./avaliacao-fisica/avaliacao-fisica.module').then(
            (m) => m.AvaliacaoFisicaModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['gerente', 'nutricionista'],
        },
      },
      {
        path: 'dieta-nutricional',
        loadChildren: () =>
          import('./dieta-nutricional/dieta-nutricional.module').then(
            (m) => m.DietaNutricionalModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: ['gerente', 'nutricionista'],
        },
      },
      { path: 'vendas', loadChildren: () => import('./loja/loja.module').then(m => m.LojaModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
