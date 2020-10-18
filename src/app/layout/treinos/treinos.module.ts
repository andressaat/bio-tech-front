import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreinosRoutingModule } from './treinos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TreinoStepperComponent } from './components/treino-stepper/treino-stepper.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';


@NgModule({
  declarations: [TreinoStepperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TreinosRoutingModule
  ]
})
export class TreinosModule { }
