export interface Aluno {
    id?: number;
    nome: string;
    dataInicio: string;
    cpf: string;
    rg: string;
    endereco: string;
    dataNascimento: string;
    telefone: string;
    observacaoes?: string;
    objetivo?: string;
    createdAt?: string;
    updatedAt?: string;
    pacoteId: number;
}