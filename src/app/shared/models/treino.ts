import { TreinoExercicio } from './treino-exercicio';
import { Aluno } from './aluno';

export class Treino  {

  id?: number;
  nome: string;
  dataInicio: string;
  dataTermino: string;
  diasDaSemana: string[];
  createdAt?: string;
  updatedAt?: string;
  exercicios?: TreinoExercicio[];
  alunoId: number;
  aluno?: Aluno;
}
