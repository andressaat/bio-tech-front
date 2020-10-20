import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoStepperComponent } from './components/treino-stepper/treino-stepper.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [{
  path: '', component: TreinoStepperComponent,
  canActivate: [RoleGuard],
  data: {
    allowedRoles: ['instrutor', 'gerente', 'gerente'],
  }, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreinosRoutingModule { }
