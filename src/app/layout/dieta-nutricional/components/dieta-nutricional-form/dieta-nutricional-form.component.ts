import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { Aluno, User } from '@app/shared/models';
import { AlunosService, DietaNutricionalService } from '@app/shared/services';

@Component({
  selector: 'app-dieta-nutricional-form',
  templateUrl: './dieta-nutricional-form.component.html',
  styleUrls: ['./dieta-nutricional-form.component.scss']
})
export class DietaNutricionalFormComponent implements OnInit {
  form: FormGroup;
  alunos: Aluno[] = [];
  dietaNutricionalId: number | null = null;
  returnUrl: string;
  user: User;
  refeicoes  = [
    { value: 'cafe_manha', label: 'Café da manhã'},
    { value: 'lanche_manha', label: 'Lanche da manhã'},
    { value: 'almoco', label: 'Almoço'},
    { value: 'lanche_tarde', label: 'Lanche da Tarde'},
    { value: 'jantar', label: 'Jantar'},
    { value: 'obrigacao', label: 'Obrigação'}
  ];

  constructor(
    private fb: FormBuilder,
    private service: DietaNutricionalService,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      id: [null, null],
      refeicao: [null, Validators.required],
      segunda: [null, Validators.required],
      terca: [null, Validators.required],
      quarta: [null, Validators.required],
      quinta: [null, Validators.required],
      sexta: [null, Validators.required],
      sabado: [null, Validators.required],
      domingo: [null, Validators.required],
      userId: [null, Validators.required],
      alunoId: [null, Validators.required],
    });
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.route.params.subscribe((params: Params) => {
      this.dietaNutricionalId = params.id;
      if (!!this.dietaNutricionalId) {
        this.service.getDietaNutricional(this.dietaNutricionalId).subscribe(dieta => {
          this.form.patchValue(dieta);
        });
      }
    });

    this.authService.currentUser().subscribe(user => {
      this.user = user;
      this.form.patchValue({ userId: user.id });
      console.log(this.form.value);
    });

    this.alunosService.listAll().subscribe((alunos) => {
      this.alunos = alunos;
    });
  }

  save(): void {
    if (this.form.valid) {
      const { id, ...dieta } = this.form.value;
      if (!!this.dietaNutricionalId) {
        this.service.update(this.dietaNutricionalId, dieta).subscribe(updated => {
          console.log(updated);
        });
      }
      else {
        this.service.save(dieta).subscribe((created) => {
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
