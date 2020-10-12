import { User } from '@app/auth/user';
import { Aluno } from './aluno';

export interface Pagamento {
  id?: string;
  valorPago: number;
  formaPagamento: string;
  dataVencimento: string;
  userId: string;
  alunoId: number;
  aluno?: Aluno;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}
