// Classe que gerencia o estoque usando um Map
var GerenciadorDeEstoque = /** @class */ (function () {
    function GerenciadorDeEstoque() {
        this.produtos = new Map(); // Armazena os produtos com ID como chave
        this.proximoId = 1; // Controla o próximo ID a ser atribuído
    }
    // Adiciona um novo produto ao estoque
    GerenciadorDeEstoque.prototype.adicionar = function (nome, preco, quantidade, descricao) {
        var produto = {
            id: this.proximoId++, // Gera ID automaticamente
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            descricao: descricao
        };
        this.produtos.set(produto.id, produto); // Armazena o produto no Map
        this.renderizarTabela(); // Atualiza a tabela exibida na tela
    };
    // Remove um produto do Map com base no ID
    GerenciadorDeEstoque.prototype.removerProduto = function (id) {
        this.produtos.delete(id);
    };
    // Filtra produtos pelo nome (usado no campo de busca)
    GerenciadorDeEstoque.prototype.buscarPorNome = function (filtro) {
        var termo = filtro.toLowerCase(); // Torna a busca case-insensitive
        return Array.from(this.produtos.values()).filter(function (p) {
            return p.nome.toLowerCase().includes(termo);
        });
    };
    // Busca um produto pelo ID
    GerenciadorDeEstoque.prototype.buscarPorId = function (id) {
        var produto = this.produtos.get(id);
        return produto ? [produto] : [];
    };
    // Atualiza a tabela HTML com os produtos cadastrados (e aplica filtro, se houver)
    GerenciadorDeEstoque.prototype.renderizarTabela = function (filtro) {
        var _this = this;
        if (filtro === void 0) { filtro = ""; }
        var corpoTabela = document.querySelector("#tabelaProdutos tbody"); // Seleciona o <tbody>
        corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela
        var lista;
        if (filtro === "") {
            lista = Array.from(this.produtos.values());
        }
        else if (!isNaN(Number(filtro))) {
            // Se o filtro for um número, busca por ID
            lista = this.buscarPorId(Number(filtro));
        }
        else {
            // Caso contrário, busca por nome
            lista = this.buscarPorNome(filtro);
        }
        // Percorre a lista de produtos para renderizar as linhas da tabela
        lista.forEach(function (produto) {
            var tr = document.createElement("tr");
            // Cria o conteúdo HTML da linha (produto)
            tr.innerHTML = "\n        <td>".concat(produto.id, "</td>\n        <td>").concat(produto.nome, "</td>\n        <td>R$ ").concat(produto.preco.toFixed(2), "</td>\n        <td>").concat(produto.quantidade, "</td>\n        <td>").concat(produto.descricao, "</td>\n      ");
            // Cria célula e botão de exclusão
            var tdBotao = document.createElement("td");
            var botao = document.createElement("button");
            botao.textContent = "Excluir";
            // Evento de clique no botão de exclusão
            botao.addEventListener("click", function () {
                _this.removerProduto(produto.id); // Remove o produto
                _this.renderizarTabela(filtro); // Atualiza a tabela
            });
            // Adiciona o botão à linha
            tdBotao.appendChild(botao);
            tr.appendChild(tdBotao);
            corpoTabela.appendChild(tr);
        });
    };
    return GerenciadorDeEstoque;
}());
// Cria uma instância global do gerenciador de estoque
var gerenciador = new GerenciadorDeEstoque();
// Captura o formulário de cadastro
var form = document.getElementById("produtoForm");
// Evento de envio do formulário (cadastrar produto)
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o recarregamento da página
    // Captura os valores dos campos
    var nome = document.getElementById("nome").value;
    var preco = parseFloat(document.getElementById("preco").value);
    var quantidade = parseInt(document.getElementById("quantidade").value);
    var descricao = document.getElementById("descricao").value;
    // Adiciona o novo produto ao estoque
    gerenciador.adicionar(nome, preco, quantidade, descricao);
    form.reset(); // Limpa o formulário
});
// Captura o campo de busca
var campoBusca = document.getElementById("busca");
// Evento de digitação no campo de busca (filtra a tabela dinamicamente)
campoBusca.addEventListener("input", function () {
    gerenciador.renderizarTabela(campoBusca.value);
});
