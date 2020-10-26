import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Aluno, AvaliacaoFisica, Treino } from '@app/shared/models';
import { AlunosService, PacotesService } from '@app/shared/services';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {
  alunoId: number | null = null;
  returnUrl: string;
  aluno: Aluno;
  treino: Treino; // o Ultimo Treino cadastrado
  avaliacaoFisica: AvaliacaoFisica; // o Ultimo AvaliacaoFisica cadastrada
  // Teste
  displayedColumns: string[] = [
    'nome',
    'serie',
    'repeticao',
    'carga',
    'observacoes',
  ];

  weekdays = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  dietaDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  dietaDisplayedColumns: ['refeicao', 'segunda','terca','quarta','quinta','sexta','sabado','domingo']
  groupingColumn = 'nomeGrupo';
  reducedGroups = [];
  initialData: any[];
  dictionaryAvaliacaoFisica =   {
    metaPeso: "Meta Peso",
    peso: "Peso",
    altura: "Altura",
    imc: "IMC",
    ombro: "Ombro",
    peitoral: "Peitoral",
    cintura: "Cintura",
    abdomen: "Abdomen",
    quadril: "Quadril",
    panturrilhaDireita: "Panturrilha Direita",
    panturrilhaEsquerda: "Panturrilha Esquerda",
    pescoco: "Pescoço",
    punho: "Punho",
    coxaDireita: "Coxa Direita",
    coxaEsquerda: "Coxa Esquerda",
    coxaProximalDireita: "Coxa Proximal Direita",
    coxaProximalEsquerda: "Coxa Proximal Esquerda",
    bracoRelaxadoDireito: "Braço Relaxado Direito",
    bracoRelaxadoEsquerdo: "Braço Relaxado Esquerdo",
    bracoContraidoDireito: "Braço Contraido Direito",
    bracoContraidoEsquerdo: "Braço Contraido Esquerdo",
    antebraco: "Antebraco",
  }

  constructor(
    private alunosService: AlunosService,
    private pacotesService: PacotesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.route.params.subscribe((params: Params) => {
      this.alunoId = params.id;
      if (!!this.alunoId) {
        this.alunosService.getAluno(this.alunoId).subscribe(aluno => {
          this.aluno = aluno;
          this.treino = aluno?.treinos[0];
          this.avaliacaoFisica = aluno?.avaliacoesFisicas[0];
          this.dietaDataSource = new MatTableDataSource(this.aluno?.dietaNutricional??[]);
          this.buildDataSource();
        });

        // this.alunosService.getTreinos(this.alunoId).subscribe(treinos => {
        //   this.treino = treinos[0];
        //   console.log(treinos[0]);
        //   this.buildDataSource();
        // });
      }
    });
  }

  isChecked(index): boolean{
    return this.treino?.diasDaSemana?.includes(`${index}`);
  }
  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(): void {
    //
    const data = this.treino?.exercicios?.map(exercise => {
      return {
        exercicioId: exercise.id,
        nome: exercise?.exercicio?.nome,
        nomeGrupo: exercise?.exercicio?.grupo?.nome,
        serie: exercise.serie,
        repeticao: exercise.repeticao,
        carga: exercise.carga,
        observacoes: exercise.observacoes,
      };
    });
    //
    this.dataSource = this.groupBy(this.groupingColumn, data ?? [] , this.reducedGroups);
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
  ): MatTableDataSource<any> {
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

}
