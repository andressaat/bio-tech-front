import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoFisicaRoutingModule } from './avaliacao-fisica-routing.module';
import { AvaliacaoFisicaComponent } from './components/avaliacao-fisica/avaliacao-fisica.component';
import { AvaliacaoFisicaFormComponent } from './components/avaliacao-fisica-form/avaliacao-fisica-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { SharedPipesModule } from '@app/shared/pipes/shared-pipes.module';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 3,
  prefix: ' ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [AvaliacaoFisicaComponent, AvaliacaoFisicaFormComponent],
  imports: [
    CommonModule,
    AvaliacaoFisicaRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SharedPipesModule
  ]
})
export class AvaliacaoFisicaModule { }
