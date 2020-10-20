import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { Aluno, User } from '@app/shared/models';
import { AlunosService, AvaliacaoFisicaService } from '@app/shared/services';

@Component({
  selector: 'app-avaliacao-fisica-form',
  templateUrl: './avaliacao-fisica-form.component.html',
  styleUrls: ['./avaliacao-fisica-form.component.scss']
})
export class AvaliacaoFisicaFormComponent implements OnInit {
  form: FormGroup;
  alunos: Aluno[] = [];
  avaliacaoFisicaId: number | null = null;
  returnUrl: string;
  user: User;

  constructor(
    private fb: FormBuilder,
    private service: AvaliacaoFisicaService,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      id: [null, null],
      metaPeso: [null, Validators.required],
      peso: [null, Validators.required],
      altura: [null, Validators.required],
      imc: [null, Validators.required],
      ombro: [null, Validators.required],
      peitoral: [null, Validators.required],
      cintura: [null, Validators.required],
      abdomen: [null, Validators.required],
      quadril: [null, Validators.required],
      panturrilhaDireita: [null, Validators.required],
      panturrilhaEsquerda: [null, Validators.required],
      pescoco: [null, Validators.required],
      punho: [null, Validators.required],
      coxaDireita: [null, Validators.required],
      coxaEsquerda: [null, Validators.required],
      coxaProximalDireita: [null, Validators.required],
      coxaProximalEsquerda: [null, Validators.required],
      bracoRelaxadoDireito: [null, Validators.required],
      bracoRelaxadoEsquerdo: [null, Validators.required],
      bracoContraidoDireito: [null, Validators.required],
      bracoContraidoEsquerdo: [null, Validators.required],
      antebraco: [null, Validators.required],
      userId: [null, Validators.required],
      alunoId: [null, Validators.required],
    });
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.route.params.subscribe((params: Params) => {
      this.avaliacaoFisicaId = params.id;
      if (!!this.avaliacaoFisicaId) {
        this.service.getAvaliacaoFisica(this.avaliacaoFisicaId).subscribe(avaliacao => {
          this.form.patchValue(avaliacao);
        });
      }
    });

    this.authService.currentUser().subscribe(user => {
      this.user = user;
      this.form.patchValue({ userId: user.id });
    });


    this.alunosService.listAll().subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  save(): void {
    if (this.form.valid) {
      const { id, ...avaliacao } = this.form.value;

      Object.keys(avaliacao).forEach(key => {

        if (Object.prototype.toString.call(parseFloat(avaliacao[key])) === '[object Number]' && key !== 'userId'){
          avaliacao[key] = parseFloat(avaliacao[key]);
        }
      });

      if (!!this.avaliacaoFisicaId) {
        const { userId, ...data } = avaliacao;
        this.service.update(this.avaliacaoFisicaId, data).subscribe(updated => {
          console.log(updated);
        });
      }
      else {
        this.service.save(avaliacao).subscribe((created) => {
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
