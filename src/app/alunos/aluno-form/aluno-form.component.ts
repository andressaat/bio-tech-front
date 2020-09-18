import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacotesService } from '../../shared/pacotes.service'
import { Pacote } from '../../shared/pacote'
import { AlunosService } from '../alunos.service';
@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  form: FormGroup;
  pacotes:Pacote []= [];

  constructor(
    private fb: FormBuilder, 
    private alunosService: AlunosService,
    private pacotesService: PacotesService
  ) { 
    this.form = this.fb.group({
      nome: [null, Validators.required],
      dataInicio:  [null, Validators.required],
      cpf:  [null, Validators.required],
      rg:  [null, Validators.required],
      endereco:  [null, Validators.required],
      dataNascimento:  [null, Validators.required],
      telefone:  [null, Validators.required],
      observacaoes:  [null],
      objetivo:  [null],
      pacoteId:  [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.pacotesService.listAll().subscribe((pacotes)=>{
      this.pacotes = pacotes;
    })
  }

  save(){
    if(this.form.valid){
      // console.log(this.form.value)
      this.alunosService.save(this.form.value).subscribe((created)=>{
        console.log(created);
      });
    }
  }

}
