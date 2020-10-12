import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno, Pagamento } from '@app/shared/models';
import { PagamentosService } from '@app/shared/services';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss']
})
export class PagamentosComponent implements OnInit {
  pagamentos: Pagamento[] = [];
  displayedColumns: string[] = ['aluno', 'formaPagamento', 'valorPago', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Pagamento>;

  constructor(
    private service: PagamentosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.pagamentos = results;
      this.dataSource = new MatTableDataSource(this.pagamentos);
    });
  }

  onAdd(): void {
    this.router.navigate(['create'], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onEdit(aluno: Aluno): void {
    this.router.navigate(['edit', aluno.id], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onRemove(pagamento: Pagamento): void {
    this.service.delete(pagamento.id).subscribe((deletar) => {
      const index = this.pagamentos.indexOf(pagamento);
      this.pagamentos.splice(index, 1);
      this.dataSource.data = this.pagamentos;
    });
  }
}
