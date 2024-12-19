<script>
    import { carrinho } from './store.js';
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import axios from "axios";
    import './style.css';
    import './assets/logo.png'
    import './assets/ouvindo.png'
    import Navbar from './Navbar.svelte';
    let totalCarrinho = 0;
    let email = "";
    let senha = "";
    let resultado = null;
    let error = null;
    let usuarioLogado = null;
    const API_BASE_URL = "http://localhost:3000";
  
    const axiosInstance = axios.create({
      withCredentials: true,
      baseURL: API_BASE_URL,
      responseType: "json",
      headers: {
            Accept: "application/json",
        }
    });
    function calcularTotal() {
    totalCarrinho = get(carrinho).reduce((acc, item) => {
      const preco = parseFloat(item.preco); // Garantir que preço seja um número
      const quantidade = parseInt(item.quantidade, 10); // Garantir que quantidade seja um número
      if (!isNaN(preco) && !isNaN(quantidade)) {
        return acc + (preco * quantidade);
      }
      return acc; // Caso contrário, não faz o cálculo para aquele item
    }, 0);
  }
  
  // Função para carregar o carrinho
  function carregarCarrinho() {
  produtosCarrinho = get(carrinho); // Obtém os produtos mais recentes do carrinho
  calcularTotal(); // Recalcula o total após qualquer alteração no carrinho
}

  // Função para adicionar produto ao carrinho
  function adicionarCarrinho(idProduto) {
    axios.post(`${API_BASE_URL}/carrinho/adicionar`, { idProduto })
      .then(response => {
        carrinho.set(response.data.carrinho); // Atualiza o carrinho no frontend
        calcularTotal(response.data.carrinho); // Recalcula o total
      })
      .catch(error => {
        console.error('Erro ao adicionar produto ao carrinho:', error);
      });
  }

  // Função para remover produto do carrinho
  function removerCarrinho(idProduto) {
  // Usando `get(carrinho)` para acessar o carrinho
  const currentCarrinho = get(carrinho);
  let item = currentCarrinho.find(p => p.id_produto === idProduto);

  if (item) {
    if (item.quantidade > 1) {
      // Reduz a quantidade se for maior que 1
      item.quantidade -= 1;
      carrinho.set([...currentCarrinho]); // Atualiza o carrinho com a nova quantidade
      console.log("Quantidade reduzida:", item);
    } else {
      // Remove o produto se a quantidade for 1
      carrinho.set(currentCarrinho.filter(p => p.id_produto !== idProduto));
      console.log("Produto removido do carrinho.");
    }
  } else {
    console.log("Produto não encontrado no carrinho.");
  }
  carregarCarrinho();
  console.log("Carrinho Atual:", get(carrinho));

}
    
    const buscarUsuarioLogado = async () => {
        try {
            const res = await axiosInstance.get(API_BASE_URL + '/usuarios/me');
            console.log(res.data);
            usuarioLogado = res.data.usuario; // Armazena os dados do usuário
            error = null; // Limpa o erro se a requisição for bem-sucedida
            if (!usuarioLogado){
              window.location.href = "/index.html";
            }
        } catch (err) {
            error = err.response?.data?.message || err.message;
            usuarioLogado = null; // Limpa os dados em caso de erro
            if (!usuarioLogado){
              window.location.href = "/index.html";
            }
        }
    };

    
  const carregarUsuarios = async () => {
    try {
      let res = await axiosInstance.get(API_BASE_URL + "/usuarios");
      usuarios = res.data.usuarios;
      colunasUsuarios = Object.keys(usuarios[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
      console.error(err);
      usuarios = null; // Limpa o resultado em caso de erro
    }
  };
  const carregarProdutos = async () => {
    try {
      let res = await axiosInstance.get(API_BASE_URL + "/produtos");
      produtos = res.data.produtos;
      colunas_produtos = Object.keys(produtos[0]);
      error = null;
    } catch (err) {
      console.error(err);
      produtos = null;
    }
  };

  const carregarProdutosCd = async () => {
    try {
      let res = await axiosInstance.get(API_BASE_URL + "/produtos_cd");
      produtos_cd = res.data.produtos;
      colunas_produtos_cd = Object.keys(produtos_cd[0]);
      error = null;
    } catch (err) {
      console.error(err);
      produtos_cd = null;
    }
  };
  
    
  
    onMount(() => {
      calcularTotal();
      buscarUsuarioLogado();
      carregarUsuarios();
    }); 
    
  </script>
  
  <main>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  <Navbar> </Navbar>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">DISCONOW</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <ul class="list-group list-group-flush">
              {#if usuarioLogado}
            <li class="list-group-item"><div class="dropdown">
              <button style="background-color: #7d4a2c;" class="rounded" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#f3e6d8" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </button>
              <ul class="dropdown-menu">
                <li><p class="dropdown-item">{usuarioLogado.nome}</p></li>
                <li><button class="dropdown-item" on:click={logout}>Logout</button></li>
              </ul>
            </div></li>
            <li class="list-group-item"><a href="./carrinho.html">CARRINHO</a></li>
            {:else}
            <li class="list-group-item"><a href="login.html">USUÁRIO</a></li>
            {/if}
            <li class="list-group-item"><a href="./cd.html">CDs</a></li>
            <li class="list-group-item"><a href="./disco.html">VINIL</a></li>
            {#if usuarioLogado}
            <li class="list-group-item"><a href="./suporte.html">SUPORTE</a></li>
            {/if}
            <li class="list-group-item"><a href="administrador.html">Página de administrador</a></li>
            </ul>
          </div>
        </div>
      </div>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
        <h2 class="text-center mb-4"><b>Finalizar Compra</b></h2>
        <form class="form_exemplo">
            <div class="mb-3">
                <label for="text" class="form-label">Nome do comprador</label>
                <input type="text" id="nome" name="nome" class="form-control" placeholder="Digite seu nome">
            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Endereço</label>
                <input type="select" id="nome" name="nome" bind:value={email} class="form-control" placeholder="Digite seu CEP">
            </div>
            <div>
                <select name="Forma de pagamento" id="pagamento">
                    <option value="PIX">PIX</option>
                    <option value="Cartão" disabled>Cartão</option>
                    <option value="Boleto" disabled>Boleto</option>
                  </select>
            </div>
            <b><p>Total: R${totalCarrinho.toFixed(2)}</p></b>
            <div>
              <button type="submit" class="btn-primary w-100 rounded">Finalizar pedido</button>
              {#if error}
                <p style="color: red;">{error}</p>
              {/if}
              {#if resultado && resultado.message}
                <p style="color: green;">{resultado.message}</p>
              {/if} 
        </form>
        <p id="message" class="mt-3 text-center"></p>
        <p class="text-center mt-2">Faltou algo no carrinho? <a href="index.html">Voltar às compras</a></p>
    </div>
  </div>
      
      <footer class="footer mt-auto py-3">
        <div class="container text-center">
            <span class="text-muted">DISCONOW &copy; 2024</span>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </main>
  