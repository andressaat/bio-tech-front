import { Exercicio } from './exercicio';

export interface GrupoMuscular {
  id?: number;
  nome: string;
  exercicios?: Exercicio[];
  createdAt?: string;
  updatedAt?: string;
}
