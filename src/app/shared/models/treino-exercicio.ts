import { Exercicio } from './exercicio';

export class TreinoExercicio {
  id?: number;
  carga: number;
  repeticao: number;
  serie: number;
  observacoes?: string;
  createdAt?: string;
  updatedAt?: string;
  treinoId?: number;
  exercicioId: number;
  exercicio?: Exercicio;
}

