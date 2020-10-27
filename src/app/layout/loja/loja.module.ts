import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LojaRoutingModule } from './loja-routing.module'; ;
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VendasComponent } from './components/vendas/vendas.component';
import { SharedPipesModule } from '@app/shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [PedidoFormComponent, VendasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LojaRoutingModule,
    AppMaterialModule,
    SharedPipesModule
  ]
})
export class LojaModule { }
