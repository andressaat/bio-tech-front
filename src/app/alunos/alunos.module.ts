import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlunosComponent } from './alunos/alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';




@NgModule({
  declarations: [AlunosComponent, AlunoFormComponent, AlunoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlunosRoutingModule,
    AppMaterialModule
  ]
})
export class AlunosModule { }
