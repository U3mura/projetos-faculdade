import { Categoria } from "./categoria";

export class Produto {
    id?: number;
    nome?: string;
    preco?: number;
    descricao?: string;
    estoque?: number;
    categoria?: Categoria;
}