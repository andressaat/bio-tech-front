import { Pedido } from './pedido';
import { Produto } from './produto';


export interface ItemPedido  {

  id?: number;
  valorUnitario: number;
  quantidade: number;
  createdAt?: string;
  updatedAt?: string;
  produtoId: number;
  pedidoId: number;
  produto?: Produto;
  pedido?: Pedido;

}
