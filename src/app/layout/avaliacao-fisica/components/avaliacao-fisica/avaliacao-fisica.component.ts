import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaliacaoFisica } from '@app/shared/models';
import { AvaliacaoFisicaService, PagamentosService } from '@app/shared/services';

@Component({
  selector: 'app-avaliacao-fisica',
  templateUrl: './avaliacao-fisica.component.html',
  styleUrls: ['./avaliacao-fisica.component.scss']
})
export class AvaliacaoFisicaComponent implements OnInit {
  avaliacoes: AvaliacaoFisica[] = [];
  displayedColumns: string[] = ['id', 'aluno',  'createdAt', 'actions'];
  dataSource: MatTableDataSource<AvaliacaoFisica>;

  constructor(
    private service: AvaliacaoFisicaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.avaliacoes = results;
      this.dataSource = new MatTableDataSource(this.avaliacoes);
    });
  }

  onAdd(): void {
    this.router.navigate(['create'], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onEdit(avaliacao: AvaliacaoFisica): void {
    this.router.navigate(['edit', avaliacao.id], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onRemove(avaliacao: AvaliacaoFisica): void {
    this.service.delete(avaliacao.id).subscribe((deletar) => {
      const index = this.avaliacoes.indexOf(avaliacao);
      this.avaliacoes.splice(index, 1);
      this.dataSource.data = this.avaliacoes;
    });
  }

}
