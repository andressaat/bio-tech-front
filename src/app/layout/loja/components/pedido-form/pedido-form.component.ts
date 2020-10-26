import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ItemPedido, Produto } from '@app/shared/models';
import { ProdutosService } from '@app/shared/services';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {
  pedidoForm: FormGroup;
  itens: ItemPedido[] = [];
  produtos: Produto[] = [];
  dataSource: MatTableDataSource<ItemPedido>

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
  ) { }

  ngOnInit(): void {
    this.produtosService.listAll().subscribe((produtos) => {
      this.produtos = produtos;
    });

    this.pedidoForm = this.formBuilder.group({
      itens: this.formBuilder.array(
        [],
        Validators.compose([Validators.required, Validators.minLength(1)])
      ),
    });
  }

  get formItens() {
    return this.pedidoForm.get('itens') as FormArray;
  }

  addItem(item: ItemPedido): void {
    if (!item) {
      return;
    }

    const alreadyExists = this.itens.find(
      (i) => i.pedidoId === item.produtoId
    );

    if (alreadyExists) {
      return;
    }


    this.itens.push(item);
    this.formItens.push(
      this.formBuilder.group(item)
    );
    this.buildDataSource();
  }


    /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource(): void {
    this.dataSource = new MatTableDataSource(this.itens);
  }

}
