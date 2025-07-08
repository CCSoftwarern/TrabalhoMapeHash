"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_collections_1 = require("typescript-collections");
// const estoque = new Dictionary<number, Produto>();
// estoque.setValue(1, { id: 1, nome: "Mouse", valor: 50, quantidade: 10 });
// estoque.setValue(1,{id:1, nome:'Panela', valor:50, quantidade:2})
//Criação da Classe
var ControleDeEstoque = /** @class */ (function () {
    function ControleDeEstoque() {
        this.proximoId = 1;
        this.produtos = new typescript_collections_1.Dictionary();
    }
    // //Adiciona um novo produto ao dicionário
    // adicionarProduto(produto: Produto): void{
    //     this.produtos.setValue(produto.id, produto);  
    // }
    ControleDeEstoque.prototype.adicionarProduto = function (nome, valor, quantidade) {
        var novoProduto = {
            id: this.proximoId++,
            nome: nome,
            valor: valor,
            quantidade: quantidade
        };
        this.produtos.setValue(novoProduto.id, novoProduto);
        return novoProduto;
    };
    // Remover produto
    ControleDeEstoque.prototype.removerProduto = function (id) {
        this.produtos.remove(id);
    };
    // Consultar estoque
    ControleDeEstoque.prototype.consultarEstoque = function () {
        return this.produtos.values();
    };
    return ControleDeEstoque;
}());
//Testes
var estoque = new ControleDeEstoque();
estoque.adicionarProduto("Mouse", 50, 10);
estoque.adicionarProduto("Teclado", 100, 5);
estoque.adicionarProduto("Minibox", 100, 5);
// Consulta por ID
// console.log("Produto ID 1:", estoque.consultarProduto(1));
// Listar todos
console.log("Todos os produtos:", estoque.consultarEstoque());
