import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietaNutricionalComponent } from './components/dieta-nutricional/dieta-nutricional.component';
import {  DietaNutricionalFormComponent } from './components/dieta-nutricional-form/dieta-nutricional-form.component';
import { RoleGuardService as RoleGuard } from '@app/auth/role-guard.service';

const routes: Routes = [{
  path: '',
  component: DietaNutricionalComponent,
  canActivate: [RoleGuard],
  data: {
    allowedRoles: ['nutricionista', 'gerente'],
  },
},
  {
    path: 'create',
    component: DietaNutricionalFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['nutricionista', 'gerente'],
    },
  },
  {
    path: 'edit/:id',
    component: DietaNutricionalFormComponent,
    canActivate: [RoleGuard],
    data: {
      allowedRoles: ['nutricionista', 'gerente'],
    },
  }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietaNutricionalRoutingModule { }
