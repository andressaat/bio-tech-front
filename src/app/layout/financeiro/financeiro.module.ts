import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { PagamentoFormComponent } from './components/pagamento-form/pagamento-form.component';
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
  declarations: [PagamentosComponent, PagamentoFormComponent],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SharedPipesModule
  ]
})
export class FinanceiroModule { }
