import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietaNutricionalRoutingModule } from './dieta-nutricional-routing.module';
import { DietaNutricionalComponent } from './components/dieta-nutricional/dieta-nutricional.component';
import { DietaNutricionalFormComponent } from './components/dieta-nutricional-form/dieta-nutricional-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { SharedPipesModule } from '@app/shared/pipes/shared-pipes.module';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [DietaNutricionalComponent, DietaNutricionalFormComponent],
  imports: [
    CommonModule,
    DietaNutricionalRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SharedPipesModule
  ]
})
export class DietaNutricionalModule { }
