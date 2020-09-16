import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  form: FormGroup;
  planos: [{id:1,nome:'tetse'},{d:2,nome:'abcS'}];

  constructor(private fb: FormBuilder) { 
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
  }

}
