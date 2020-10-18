import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  Aluno,
  Exercicio,
  GrupoMuscular,
  Treino,
  TreinoExercicio,
} from '@app/shared/models';
import {
  AlunosService,
  GruposMuscularesService,
  TreinoService,
} from '@app/shared/services';

@Component({
  selector: 'app-treino-stepper',
  templateUrl: './treino-stepper.component.html',
  styleUrls: ['./treino-stepper.component.scss'],
})
export class TreinoStepperComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  alunos: Aluno[] = [];
  weekdays = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];

  displayedColumns: string[] = [
    'nome',
    'serie',
    'repeticao',
    'carga',
    'observacoes',
  ];
  dataSource: MatTableDataSource<TreinoExercicio>;

  grupoMuscular: GrupoMuscular[];
  grupoExercicios: { id: number; nome: string; exercicios: Exercicio[] }[] = [];

  exercicios: TreinoExercicio[] = [];

  panelOpenState = false;
  clickButton = false;
  groupingColumn = 'nomeGrupo';
  reducedGroups = [];
  initialData: any[];
  mapOfGroups: Map<number, GrupoMuscular>;

  constructor(
    private formBuilder: FormBuilder,
    private alunosService: AlunosService,
    private gruposMuscularesService: GruposMuscularesService,
    private treinoService: TreinoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapOfGroups = new Map();

    this.firstFormGroup = this.formBuilder.group({
      alunoId: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      diasDaSemana: this.formBuilder.array(
        this.weekdays.map((_) => false),
        this.minSelectedCheckboxes()
      ),
    });

    this.thirdFormGroup = this.formBuilder.group({
      exercicios: this.formBuilder.array(
        [],
        Validators.compose([Validators.required, Validators.minLength(1)])
      ),
    });

    this.dataSource = new MatTableDataSource(this.exercicios);

    this.alunosService.listAll().subscribe((alunos) => {
      this.alunos = alunos;
    });

    this.gruposMuscularesService.listAll().subscribe((group) => {
      this.grupoMuscular = group;
    });

    this.buildDataSource();
  }

  get formExercicios() {
    return this.thirdFormGroup.get('exercicios') as FormArray;
  }

  addExercise(exercise: Exercicio): void {
    if (!exercise) {
      return;
    }

    const alreadyExists = this.exercicios.find(
      (g) => g.exercicioId === exercise.id
    );

    if (alreadyExists) {
      return;
    }

    let group = this.mapOfGroups.get(exercise.grupoId);

    if (!group) {
      group = this.grupoMuscular.find((g) => g.id === exercise.grupoId);
    }

    const data = {
      exercicioId: exercise.id,
      nome: exercise.nome,
      nomeGrupo: group.nome,
      serie: 4,
      repeticao: 10,
      carga: 1,
      observacoes: '',
    };

    this.exercicios.push(data);
    this.formExercicios.push(
      this.formBuilder.group({
        exercicioId: exercise.id,
        nome: exercise.nome,
        nomeGrupo: group.nome,
        serie: [4, Validators.required],
        repeticao: [10, Validators.required],
        carga: [1, Validators.required],
        observacoes: '',
      })
    );
    this.buildDataSource();
  }

  minSelectedCheckboxes(): ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const selectedCount = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return selectedCount >= 1 ? null : { notSelected: true };
    };

    return validator;
  }

  save(): void {
    let data = {};

    if (this.firstFormGroup.valid) {
      data = {
        ...this.firstFormGroup.value,
      };
    }

    if (this.secondFormGroup.valid) {
      const form = this.secondFormGroup.value;

      form.diasDaSemana = form.diasDaSemana.reduce(
        (previous, current, index) => {
          if (current) {
            previous.push(`${index + 1}`);
          }
          return previous;
        },
        []
      );

      data = {
        ...data,
        ...this.secondFormGroup.value,
      };
    }

    if (this.thirdFormGroup.valid) {
      const exercicios = this.thirdFormGroup.value
        .exercicios as TreinoExercicio[];

      data = {
        ...data,
        exercicios: exercicios.map(({ exercicioId, serie, repeticao, carga, observacoes }) =>
        ({ exercicioId, serie, repeticao, carga, observacoes}))
      };

      this.treinoService
        .save(data as Treino)
        .subscribe((a) => {
          console.log(a);
          this.router.navigate(['/alunos']);
        });


      // this.treinoService
      //   .save(data as Treino)
      //   .pipe(
      //     mergeMap((treino) =>
      //       forkJoin(
      //         exercicios.map(
      //           ({ exercicioId, serie, repeticao, carga, observacoes }) => {
      //             return this.treinoService.addExercicio(treino.id, {
      //               exercicioId,
      //               serie,
      //               repeticao,
      //               carga,
      //               observacoes,
      //             });
      //           }
      //         )
      //       )
      //     )
      //   )
      //   .subscribe((a) => {
      //     console.log(a);
      //     this.router.navigate(['/alunos']);
      //   });
    }
  }

  getActualIndex(index: number): number {
    if (index > this.exercicios.length) {
      return this.exercicios.length - 1;
    }
    return index - 1;
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(): void {
    this.dataSource = this.groupBy(
      this.groupingColumn,
      this.exercicios, // initialData
      this.reducedGroups
    );
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(
    column: string,
    data: any[],
    reducedGroups?: any[]
  ): MatTableDataSource<TreinoExercicio> {
    if (!column) {
      return new MatTableDataSource(data);
    }
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) {
      collapsedGroups = [];
    }
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
        accumulator[currentGroup] = [
          {
            groupName: currentValue[column],
            value: currentValue[column],
            isGroup: true,
            reduced: collapsedGroups.some(
              (group) => group.value === currentValue[column]
            ),
          },
        ];
      }

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});
    const groupArray = Object.keys(groups).map((key) => groups[key]);
    const flatList = groupArray.reduce((a, c) => {
      return a.concat(c);
    }, []);

    return flatList.filter((rawLine) => {
      return (
        rawLine.isGroup ||
        collapsedGroups.every((group) => rawLine[column] !== group.value)
      );
    });
  }

  /**
   * Since groups are on the same level as the data,
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row): void {
    row.reduced = !row.reduced;
    if (row.reduced) {
      this.reducedGroups.push(row);
    } else {
      this.reducedGroups = this.reducedGroups.filter(
        (el) => el.value !== row.value
      );
    }

    this.buildDataSource();
  }
}
