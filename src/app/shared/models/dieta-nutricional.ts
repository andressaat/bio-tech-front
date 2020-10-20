import { Aluno } from './aluno';
import { User } from './user';

export interface DietaNutricional  {

  id?: number;
  refeicao: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  domingo: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  user?: User;
  alunoId: number;
  aluno?: Aluno;
}

