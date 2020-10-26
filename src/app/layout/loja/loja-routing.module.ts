import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';

const routes: Routes = [{ path: '', component: PedidoFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LojaRoutingModule { }
