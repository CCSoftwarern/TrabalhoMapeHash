// Interface que define a estrutura de um produto
interface Produto {
  id: number;             // Identificador único do produto (gerado automaticamente)
  nome: string;           // Nome do produto
  preco: number;          // Preço em reais
  quantidade: number;     // Quantidade em estoque
  descricao: string;      // Descrição do produto
}

// Classe que gerencia o estoque usando um Map
class GerenciadorDeEstoque {
  private produtos: Map<number, Produto> = new Map();  // Armazena os produtos com ID como chave
  private proximoId: number = 1;                       // Controla o próximo ID a ser atribuído

  // Adiciona um novo produto ao estoque
  adicionar(nome: string, preco: number, quantidade: number, descricao: string): void {
    const produto: Produto = {
      id: this.proximoId++, // Gera ID automaticamente
      nome,
      preco,
      quantidade,
      descricao
    };

    this.produtos.set(produto.id, produto); // Armazena o produto no Map
    this.renderizarTabela();                // Atualiza a tabela exibida na tela
  }

  // Remove um produto do Map com base no ID
  removerProduto(id: number): void {
    this.produtos.delete(id);
  }

  // Filtra produtos pelo nome (usado no campo de busca)
  buscarPorNome(filtro: string): Produto[] {
    const termo = filtro.toLowerCase(); // Torna a busca case-insensitive = sem diferenciação entre maiúsculas e minúsculas
    return Array.from(this.produtos.values()).filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
  }

  // Busca um produto pelo ID (chave)
  buscarPorId(id: number): Produto[] {
    const produto = this.produtos.get(id);
    return produto ? [produto] : [];
  }



  // Atualiza a tabela HTML com os produtos cadastrados (e aplica filtro, se houver)
  renderizarTabela(filtro: string = ""): void {
    const corpoTabela = document.querySelector("#tabelaProdutos tbody")!; // Seleciona o <tbody>
    corpoTabela.innerHTML = ""; // Limpa o conteúdo atual da tabela

    let lista: Produto[];

    if (filtro === "") {
      lista = Array.from(this.produtos.values());
    } else if (!isNaN(Number(filtro))) {
      // Se o filtro for um número, busca por ID
      lista = this.buscarPorId(Number(filtro));
    } else {
      // Caso contrário, busca por nome
      lista = this.buscarPorNome(filtro);
    }



    // Percorre a lista de produtos para renderizar as linhas da tabela
    lista.forEach(produto => {
      const tr = document.createElement("tr");

      // Cria o conteúdo HTML da linha (produto)
      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.descricao}</td>
      `;

      // Cria célula e botão de exclusão
      const tdBotao = document.createElement("td");
      const botao = document.createElement("button");
      botao.textContent = "Excluir";

      // Evento de clique no botão de exclusão
      botao.addEventListener("click", () => {
        this.removerProduto(produto.id);         // Remove o produto
        this.renderizarTabela(filtro);           // Atualiza a tabela
      });

      // Adiciona o botão à linha
      tdBotao.appendChild(botao);
      tr.appendChild(tdBotao);
      corpoTabela.appendChild(tr);
    });
  }
}

// Cria uma instância global do gerenciador de estoque
const gerenciador = new GerenciadorDeEstoque();

// Captura o formulário de cadastro
const form = document.getElementById("produtoForm") as HTMLFormElement;

// Evento de envio do formulário (cadastrar produto)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o recarregamento da página

  // Captura os valores dos campos
  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const preco = parseFloat((document.getElementById("preco") as HTMLInputElement).value);
  const quantidade = parseInt((document.getElementById("quantidade") as HTMLInputElement).value);
  const descricao = (document.getElementById("descricao") as HTMLTextAreaElement).value;

  // Adiciona o novo produto ao estoque
  gerenciador.adicionar(nome, preco, quantidade, descricao);

  form.reset(); // Limpa o formulário
});

// Captura o campo de busca
const campoBusca = document.getElementById("busca") as HTMLInputElement;

// Evento de digitação no campo de busca (filtra a tabela dinamicamente)
campoBusca.addEventListener("input", () => {
  gerenciador.renderizarTabela(campoBusca.value);
});
