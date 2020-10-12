import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './components/alunos/alunos.component';
import { AlunoFormComponent } from './components/aluno-form/aluno-form.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AlunosComponent, AlunoFormComponent],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class AlunosModule { }
