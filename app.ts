
import { Dictionary } from "typescript-collections";

interface Produto {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
}


//Criação da Classe
class ControleDeEstoque{
    private produtos: Dictionary<number, Produto>;
    private proximoId: number = 1;

    constructor(){
        this.produtos = new Dictionary<number, Produto>();
        
    }

    //Adicionar um novo produto ao estoque co ID gerado automaticamente
    adicionarProduto(nome: string, valor: number, quantidade: number): Produto {
        const novoProduto: Produto = {
            id: this.proximoId++,
            nome,
            valor,
            quantidade
        };

        this.produtos.setValue(novoProduto.id, novoProduto);
        return novoProduto;
    }
    

    // Remover produto
    removerProduto(id: number): void {
        this.produtos.remove(id)
    }
    
    // Consultar estoque
    listarEstoque(): Produto[] {
        return this.produtos.values();
    }



}


//Testes

// const estoque = new ControleDeEstoque();

// estoque.adicionarProduto(  "Mouse", 50,  10 );
// estoque.adicionarProduto( "Teclado",100, 5 );
// estoque.adicionarProduto( "Minibox",100, 5 );

// Consulta por ID
// console.log("Produto ID 1:", estoque.consultarProduto(1));

// Listar todos
// console.log("Todos os produtos:", estoque.listarEstoque());
