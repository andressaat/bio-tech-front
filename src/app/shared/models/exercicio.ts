import { GrupoMuscular } from './grupo-muscular';

export interface Exercicio {
  id?: number;
  nome: string;
  grupoId: number;
  grupo?: GrupoMuscular;
  createdAt?: string;
  updatedAt?: string;
}
