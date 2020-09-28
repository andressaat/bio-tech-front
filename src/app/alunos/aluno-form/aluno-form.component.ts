import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacotesService } from '../../shared/pacotes.service'
import { Pacote } from '../../shared/pacote'
import { AlunosService } from '../alunos.service';
import { ActivatedRoute, Params, Router, RouterState } from '@angular/router';
@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  form: FormGroup;
  pacotes:Pacote []= [];
  alunoId:number|null = null;
  returnUrl: string;

  constructor(
    private fb: FormBuilder, 
    private alunosService: AlunosService,
    private pacotesService: PacotesService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.form = this.fb.group({
      id:[null,null],
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/'; 
    console.log(this.returnUrl,this.route.snapshot.queryParams)
    this.route.params.subscribe((params: Params) => {
      this.alunoId= params['id'];
      if(!!this.alunoId){
        this.alunosService.getAluno(this.alunoId).subscribe(aluno =>{
          this.form.patchValue(aluno);
        });
      }
    });

    this.pacotesService.listAll().subscribe((pacotes)=>{
      this.pacotes = pacotes;
    })
  }

  save() {
    if (this.form.valid) {
      const { id, ...aluno } = this.form.value;
      if (!!this.alunoId) {
        this.alunosService.update(this.alunoId, aluno).subscribe(updated => {
          console.log(updated);
        })
      }
      else {
        this.alunosService.save(aluno).subscribe((created) => {
          console.log(created);
        });
      }
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  cancel(){
    this.router.navigateByUrl(this.returnUrl)
  }

}
