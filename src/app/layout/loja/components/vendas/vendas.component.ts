import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '@app/shared/models';
import { PedidoService } from '@app/shared/services';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['id', 'valor', 'itens', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Pedido>;

  constructor(
    private service: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      console.log(results);
      this.pedidos = results;
      this.dataSource = new MatTableDataSource(this.pedidos);
    });
  }
  onAdd(): void {
    this.router.navigate(['create'], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }
}
