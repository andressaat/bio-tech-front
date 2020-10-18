import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoStepperComponent } from './components/treino-stepper/treino-stepper.component';

const routes: Routes = [{ path: '', component: TreinoStepperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreinosRoutingModule { }
