import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DietaNutricional } from '@app/shared/models';
import { DietaNutricionalService } from '@app/shared/services';

@Component({
  selector: 'app-dieta-nutricional',
  templateUrl: './dieta-nutricional.component.html',
  styleUrls: ['./dieta-nutricional.component.scss']
})
export class DietaNutricionalComponent implements OnInit {
  dietas: DietaNutricional[] = [];
  displayedColumns: string[] = ['dietaId', 'refeicao', 'createdAt', 'actions' ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  groupingColumn = 'nomeGrupo';
  reducedGroups = [];
  refeicoesMap = {
    cafe_manha: 'Café da manhã',
    lanche_manha: 'Lanche da manhã',
    almoco: 'Almoço',
    lanche_tarde: 'Lanche da Tarde',
    jantar: 'Jantar',
    obrigacao: 'Obrigação'
  };

  constructor(
    private service: DietaNutricionalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.dietas = results;
      this.buildDataSource();
    });
  }

  onAdd(): void {
    this.router.navigate(['create'], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onEdit(dieta: any): void {
    this.router.navigate(['edit', dieta.dietaId], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onRemove(dieta: any): void {
    this.service.delete(dieta.dietaId).subscribe((deletar) => {
      const index = this.dietas.indexOf(dieta);
      this.dietas.splice(index, 1);
      // this.dataSource.data = this.dietas;
      this.buildDataSource();
    });
  }

 /**
  * Rebuilds the datasource after any change to the criterions
  */
  buildDataSource(): void {
    //
    const data = this.dietas.map(dieta => {
      return {
        dietaId: dieta.id,
        nomeGrupo: dieta?.aluno?.nome,
        refeicao: this.refeicoesMap[dieta.refeicao],
        createdAt: dieta.createdAt
      };
    });
    //
    this.dataSource = this.groupBy(this.groupingColumn, data, this.reducedGroups);
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

  isNotGroup(index, item): boolean {
    return !item.isGroup;
  }

}
