import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LojaRoutingModule } from './loja-routing.module';;
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { AppMaterialModule } from '@app/app-material/app-material.module'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PedidoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LojaRoutingModule,
    AppMaterialModule
  ]
})
export class LojaModule { }
