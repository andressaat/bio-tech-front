import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './components/alunos/alunos.component';
import { AlunoFormComponent } from './components/aluno-form/aluno-form.component';
import { AppMaterialModule } from '@app/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlunoComponent } from './components/aluno/aluno.component';
import { SharedPipesModule } from '@app/shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [AlunosComponent, AlunoFormComponent, AlunoComponent],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedPipesModule
  ]
})
export class AlunosModule { }
