<script>
    import { onMount } from 'svelte';
    import axios from "axios";
    import './style.css';
    import './assets/logo.png'
    import './assets/ouvindo.png'
    import Navbar from './Navbar.svelte';
    let colunasUsuarios = "";
    let nome = "";
    let email = "";
    let senha = "";
    let conf_senha = "";
    let error = null;
    let resultado = null;
    let usuarios = null;
    let usuarioLogado = null;
    let produtos = null;
    let novoProduto = { nome: "", descricao: "", preco: 0,  imagem: null };
    
    const API_BASE_URL = "http://localhost:3000";
  
    const axiosInstance = axios.create({
      withCredentials: true,
      baseURL: API_BASE_URL,
      responseType: "json",
      headers: {
            Accept: "application/json",
        }
    });
    const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    novoProduto.imagem = file;
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
  
    const cadastrarUsuario = async () => {
      try {
        let res = await axios.post(
          API_BASE_URL + "/usuarios/novo",
          {
            nome,
            email,
            senha,
            conf_senha,
          },
          {
            headers: {
              Accept: "application/json",
            },
          },
        );
        resultado = res.data;
        if (resultado && resultado.status === "success") { 
              window.location.href = "/index.html";  
          }
        error = null; // Limpa o erro se a requisição for bem-sucedida
        // recarrega lista de usuários apresentada
        carregarUsuarios();
      } catch (err) {
        error =
          "Erro ao enviar dados: " + err.response?.data?.message || err.message;
        resultado = null; // Limpa o resultado em caso de erro
      }
      
    };
  
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
  
    const logout = async () => {
      try {
        let res = await axiosInstance.post("/logout");
        resultado = res.data;
  
        // Redirecionar para página de logon após logout
        if (resultado && resultado.status === "success") { 
              window.location.href = "/login.html";  
        }
        error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
        error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;
        console.error(err);
        resultado = null; // Limpa o resultado em caso de erro
      }
    };
  
    const carregarProdutos = async () => {
    try {
      let res = await axiosInstance.get(API_BASE_URL + "/produtos");
      produtos = res.data.produtos;
      error = null;
    } catch (err) {
      console.error(err);
      produtos = null;
    }
  };

  const deletarProduto = async (id) => {
    try {
      let res = await axios.delete(`${API_BASE_URL}/produtos/${id}`);
      resultado = res.data;
      carregarProdutos();
      error = null;
    } catch (err) {
      error = "Erro ao deletar produto: " + (err.response?.data?.message || err.message);
      resultado = null;
    }
  };

  const adicionarProduto = async () => {
    try {
      let res = await axiosInstance.post(API_BASE_URL + "/produtos/novo", novoProduto);
      resultado = res.data;
      novoProduto = { nome: "", descricao: "", preco: 0, imagem: null };
      carregarProdutos();
      error = null;
    } catch (err) {
      error = "Erro ao adicionar produto: " + (err.response?.data?.message || err.message);
      resultado = null;
    }
  };


onMount(() => {
  buscarUsuarioLogado();
  carregarProdutos();
  carregarUsuarios();
}); 
    
  </script>
  
  <main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <Navbar></Navbar>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">DISCONOW</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><a href="">USUÁRIO</a></li>
          <li class="list-group-item"><a href="">CARRINHO</a></li>
          <li class="list-group-item"><a href="">CDs</a></li>
          <li class="list-group-item"><a href="">VINIL</a></li>
          <li class="list-group-item"><a href="">SUPORTE</a></li>
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
    <div class="container-fluid d-flex align-items-center justify-content-between min-vh-100">
    
      <div class="register-container animated">
          <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
              <h2 class="text-center mb-4"><b>Cadastro de Produto</b></h2>
        <form on:submit|preventDefault={adicionarProduto} class="form_exemplo">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome do Produto:</label>
            <input 
            type="text"
            class="form-control"
            id="nome" 
            bind:value={novoProduto.nome} 
            placeholder="Digite o nome do produto">
          </div>
          <div class="mb-3">
            <label for="descricao" class="form-label">Descrição do Produto:</label>
            <input
              type="text"
              class="form-control"
              id="descricao"
              bind:value={novoProduto.descricao}
              placeholder="Digite a descrição do produto"
              required
            />
          </div>
          <div class="mb-3">
            <label for="preco" class="form-label">Preço do Produto:</label>
            <input
              type="number"
              class="form-control"
              id="preco"
              bind:value={novoProduto.preco}
              placeholder="Insira o preço do produto"
              required
            />
          </div>
          <div class="mb-3">
            <label for="imagem" class="form-label">Imagem do Produto:</label>
            <input
              type="file"
              class="form-control"
              id="imagem"
              accept="image/*"
              on:change={event => handleImageUpload(event)}
            />
          </div>
          <div>
            <button type="submit" class="btn-primary w-100 rounded">Registrar Produto</button>
            {#if error}
              <p style="color: red;">{error}</p>
            {/if}
            {#if resultado && resultado.message}
              <p style="color: green;">{resultado.message}</p>
            {/if}
            <p id="message" class="mt-3 text-center"></p>
          </div>
        </form>
        </div>
        </div>
        </div>
      <footer class="footer mt-auto py-3">
        <div class="container text-center">
            <span class="text-muted">DISCONOW &copy; 2024</span>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
  </main>
  