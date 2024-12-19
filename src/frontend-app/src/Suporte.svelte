<script>
    import { carrinho } from './store.js';
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import axios from "axios";
    import './style.css';
    import './assets/logo.png';
    import './assets/ouvindo.png';
    import Navbar from './Navbar.svelte';
    
    const API_BASE_URL = "http://localhost:3000";
    let usuarios = null;
    let colunasUsuarios = null;
    let usuarioLogado = null;
    let produtosCarrinho = get(carrinho); // Obtendo os produtos do carrinho
    let totalCarrinho = 0; // Variável para armazenar o total do carrinho
    let error = null;

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
  
    // Função para carregar os produtos
  
    // Função para carregar produtos do catálogo
    // Função para carregar os usuários
    const carregarUsuarios = async () => {
      try {
        const res = await axios.get(API_BASE_URL + "/usuarios");
        usuarios = res.data.usuarios;
        colunasUsuarios = Object.keys(usuarios[0]);
      } catch (err) {
        console.error(err);
        usuarios = null;
      }
    };
  
    // Função para buscar usuário logado
    const buscarUsuarioLogado = async () => {
          try {
              const res = await axiosInstance.get(API_BASE_URL + '/usuarios/me');
              console.log(res.data);
              usuarioLogado = res.data.usuario; // Armazena os dados do usuário
              if (!usuarioLogado){
                window.location.href = '/index.html';
              }
              error = null; // Limpa o erro se a requisição for bem-sucedida
          } catch (err) {
              error = err.response?.data?.message || err.message;
              usuarioLogado = null; // Limpa os dados em caso de erro
              if (err.response && err.response.status === 401) {
              window.location.href = '/index.html';
          }
          }
      };
  
    // Função para fazer logout
    const logout = async () => {
      try {
        const res = await axios.post("/logout");
        if (res.data.status === "success") {
          window.location.href = "/login.html";
        }
      } catch (err) {
        console.error(err);
      }
    };
  
  
    // Função para carregar todos os dados
    onMount(() => {
      calcularTotal();
      buscarUsuarioLogado();
      carregarUsuarios();
  
    });
  </script>
  
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <Navbar></Navbar>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <a class="navbar-brand" href="index.html">
              <img src="/src/assets/logo2.png" alt="Avatar Logo" style="width:100px;">
          </a>
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
                <li class="list-group-item"><a href="./suporte.html">SUPORTE</a></li>
                <li class="list-group-item"><a href="administrador.html">Página de administrador</a></li>
    
    
                <br>
                <div class="d-flex w-50" id="search-form">
                  <input class="form-control me-2" type="search" id="search-input" placeholder="Search..." aria-label="Search">
                  <button class="btn-primary sidebar rounded-5" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg></button>
        </div>
              </ul>
            </div>
          </div>
        </div>
        
        <main>

                  <div class="d-flex justify-content-center align-items-center min-vh-100">
                    <div class="card p-4 shadow-lg" style="max-width: 800px; width: 100%;">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Título do Ticket</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Atraso na minha entrega...">
                          </div>
                          <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Mensagem ao Suporte</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                          <button class="btn-primary rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Enviar
                          </button> 
                          <a href="index.html">
                          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="exampleModalLabel">Aviso</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  Em breve você receberá um email de resposta!
                                </div>
                                <div class="modal-footer">
                                  <a href="index.html">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  </a>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </a>
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
    