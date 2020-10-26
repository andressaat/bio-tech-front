import { ItemPedido } from './item-pedido';

export interface Pedido {

  id?: number;
  valor: number;
  createdAt?: string;
  updatedAt?: string;
  itens: ItemPedido[];
}
