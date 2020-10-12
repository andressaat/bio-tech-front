import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pacote } from '@app/shared/models';
import { AlunosService, PacotesService } from '@app/shared/services';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {
  form: FormGroup;
  pacotes: Pacote[] = [];
  alunoId: number | null = null;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private alunosService: AlunosService,
    private pacotesService: PacotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null, null],
      nome: [null, Validators.required],
      dataInicio: [null, Validators.required],
      cpf: [null, Validators.required],
      rg: [null, Validators.required],
      endereco: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      telefone: [null, Validators.required],
      observacaoes: [null, Validators.required],
      objetivo: [null, Validators.required],
      pacoteId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    console.log('edit', this.returnUrl, this.route.snapshot.queryParams);
    this.route.params.subscribe((params: Params) => {
      this.alunoId = params.id;
      if (!!this.alunoId) {
        this.alunosService.getAluno(this.alunoId).subscribe(aluno => {
          this.form.patchValue(aluno);
        });
      }
    });

    this.pacotesService.listAll().subscribe((pacotes) => {
      this.pacotes = pacotes;
    });
  }

  save(): void {
    if (this.form.valid) {
      const { id, ...aluno } = this.form.value;
      if (!!this.alunoId) {
        this.alunosService.update(this.alunoId, aluno).subscribe(updated => {
          console.log(updated);
        });
      }
      else {
        this.alunosService.save(aluno).subscribe((created) => {
          console.log(created);
        });
      }
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  cancel(): void {
    this.router.navigateByUrl(this.returnUrl);
  }
}
