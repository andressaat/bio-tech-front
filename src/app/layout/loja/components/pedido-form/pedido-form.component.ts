import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPedido, Pedido, Produto } from '@app/shared/models';
import { PedidoService, ProdutosService } from '@app/shared/services';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss'],
})
export class PedidoFormComponent implements OnInit {
  pedidoForm: FormGroup;
  itens: ItemPedido[] = [];
  produtos: Produto[] = [];
  dictionaryProdutos: {[key: number]: Produto};
  dataSource: MatTableDataSource<ItemPedido>;
  displayedColumns: string[] = ['nome', 'valor', 'quantidade'];
  tableFooterColumns: string[] = ['nome', 'valor'];
  totalCost = 0;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.produtosService.listAll().subscribe((produtos) => {
      this.produtos = produtos;

      this.dictionaryProdutos = produtos.reduce((entities: { [id: number]: Produto }, produto: Produto) => ({
        ...entities,
        [produto.id]: produto
      }), {});
    });

    this.pedidoForm = this.formBuilder.group({
      itens: this.formBuilder.array(
        [],
        Validators.compose([Validators.required, Validators.minLength(1)])
      ),
    });

    this.formItens.valueChanges.subscribe((change) => {
      const calculateAmount = (itens: any[]): number => {
        return itens.reduce((acc, current) => {
          return (
            acc +
            parseFloat(current.valorUnitario || 0) *
              // tslint:disable-next-line: radix
              parseInt(current.quantidade || 1)
          );
        }, 0);
      };

      this.totalCost = calculateAmount(this.formItens.value);
    });
  }

  get formItens(): FormArray {
    return this.pedidoForm.get('itens') as FormArray;
  }

  addItem(produto: Produto): void {
    if (!produto) {
      return;
    }

    const alreadyExists = this.itens.find((i) => i.produtoId === produto.id);

    if (alreadyExists) {
      return;
    }

    const data = {
      produtoId: produto.id,
      valorUnitario: produto.valor,
      quantidade: 1,
    };

    this.itens.push(data as ItemPedido);
    this.formItens.push(this.formBuilder.group(data));
    this.buildDataSource();
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(): void {
    this.dataSource = new MatTableDataSource(this.itens);
  }

  save(): void {

    if (this.pedidoForm.valid) {

      const pedido: Pedido = {
        valor: this.totalCost,
        itens: [...this.formItens.value]
      };

      this.pedidoService.save(pedido).subscribe((createdPedido) => {
        console.log(createdPedido);
      });

      this.router.navigateByUrl(this.returnUrl);
    }

  }
}
