import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@app/auth/user';
import { Aluno, Pagamento } from '@app/shared/models';
import { AlunosService, PagamentosService } from '@app/shared/services';

@Component({
  selector: 'app-pagamento-form',
  templateUrl: './pagamento-form.component.html',
  styleUrls: ['./pagamento-form.component.scss']
})
export class PagamentoFormComponent implements OnInit {
  form: FormGroup;
  pagamentos: Pagamento[] = [];
  alunos: Aluno[] = [];
  formasPagamento: string[] = ['dinheiro', 'debito', 'credito'];
  pagamentoId: string | null = null;
  returnUrl: string;
  user: User;

  constructor(
    private fb: FormBuilder,
    private service: PagamentosService,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      id: [null, null],
      valorPago: [null, Validators.required],
      formaPagamento: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      userId: [null, Validators.required],
      alunoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.route.params.subscribe((params: Params) => {
      this.pagamentoId = params.id;
      if (!!this.pagamentoId) {
        this.service.getPagamento(this.pagamentoId).subscribe(aluno => {
          this.form.patchValue(aluno);
        });
      }
    });

    this.authService.currentUser().subscribe(user => {
      this.user = user;
      this.form.patchValue({ userId: user.id});
      console.log(this.form.value);
    });

    this.alunosService.listAll().subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  save(): void {
    if (this.form.valid) {
      const { id, ...pagamento } = this.form.value;
      if (!!this.pagamentoId) {
        this.service.update(this.pagamentoId, pagamento).subscribe(updated => {
          console.log(updated);
        });
      }
      else {
        this.service.save(pagamento).subscribe((created) => {
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
