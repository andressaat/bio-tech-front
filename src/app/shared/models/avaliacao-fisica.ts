import { Aluno } from './aluno';
import { User } from './user';

export interface AvaliacaoFisica  {
  id?: number;
  metaPeso: number;
  peso: number;
  altura: number;
  imc: number;
  ombro: number;
  peitoral: number;
  cintura: number;
  abdomen: number;
  quadril: number;
  panturrilhaDireita: number;
  panturrilhaEsquerda: number;
  pescoco: number;
  punho: number;
  coxaDireita: number;
  coxaEsquerda: number;
  coxaProximalDireita: number;
  coxaProximalEsquerda: number;
  bracoRelaxadoDireito: number;
  bracoRelaxadoEsquerdo: number;
  bracoContraidoDireito: number;
  bracoContraidoEsquerdo: number;
  antebraco: number;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  user?: User;
  alunoId: number;
  aluno?: Aluno;
}

