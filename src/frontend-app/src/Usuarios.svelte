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
  
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
          Accept: "application/json",
      }
  });


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
            window.location.href = "/login.html";  
        }
      error = null; // Limpa o erro se a requisição for bem-sucedida
      // recarrega lista de usuários apresentada
      buscarUsuarioLogado();
    } catch (err) {
  if (err.response) {
    // Se a resposta foi retornada, mostra a mensagem do servidor
    error = "Erro ao enviar dados: " + err.response.data.message || "Erro desconhecido";
  } else if (err.request) {
    // Se não houver resposta (ex: problema de rede)
    error = "Erro ao enviar dados: Problema de rede";
  } else {
    // Se o erro foi gerado durante a configuração da requisição
    error = "Erro ao enviar dados: " + err.message || "Erro desconhecido";
  }
  resultado = null; // Limpa o resultado em caso de erro
}

    
  };

  const buscarUsuarioLogado = async () => {
    try {
        const res = await axiosInstance.get(API_BASE_URL + '/usuarios/me');
        console.log(res.data);
        usuarioLogado = res.data.usuario; // Armazena os dados do usuário
        error = null; // Limpa o erro se a requisição for bem-sucedida
        if (usuarioLogado) {
            window.location.href = "/index.html";
        }
    } catch (err) {
        const message = err.response?.data?.message || err.message;
        // Filtra explicitamente a mensagem "Você não está logado!"
        if (message !== "Você não está logado!") {
            error = message;
        } else {
            error = null;
        }
        usuarioLogado = null; // Limpa os dados em caso de erro
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

  
  onMount(() => {
    buscarUsuarioLogado();
    carregarUsuarios();
  }); 
  
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <Navbar></Navbar>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <a href="index.html">
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
        {#if usuarioLogado}
        <li class="list-group-item"><a href="./suporte.html">SUPORTE</a></li>
        {/if}
        <li class="list-group-item"><a href="administrador.html">Página de administrador</a></li>
        <br>
      </ul>
    </div>
  </div>
</div>
  <div class="container-fluid d-flex align-items-center justify-content-between min-vh-100">
    <div class="image-container animated">
        <img src="src/assets/ouvindo.png" alt="Imagem de destaque" class="img-fluid">
    </div>
    <div class="register-container animated">
        <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
            <h2 class="text-center mb-4"><b>Registre-se</b></h2>
      <form on:submit|preventDefault={cadastrarUsuario} class="form_exemplo">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome de Usuário</label>
          <input 
          type="text"
          class="form-control"
          id="nome" 
          bind:value={nome} 
          placeholder="Digite seu nome">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            bind:value={email}
            placeholder="Digite o email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="senha" class="form-label">Senha:</label>
          <input
            type="password"
            class="form-control"
            id="senha"
            bind:value={senha}
            placeholder="Digite a senha"
            required
          />
        </div>
        <div class="mb-3">
          <label for="conf_senha" class="form-label">Confirme a Senha:</label>
          <input
            type="password"
            class="form-control"
            id="conf_senha"
            bind:value={conf_senha}
            placeholder="Confirme a senha"
            required
          />
        </div>
        <div>
          <button type="submit" class="btn-primary w-100 rounded">Cadastrar</button>
          {#if error}
            <p style="color: red;">{error}</p>
          {/if}
          {#if resultado && resultado.message}
            <p style="color: green;">{resultado.message}</p>
          {/if}
          <p id="message" class="mt-3 text-center"></p>
          <p class="text-center mt-2">Já tem uma conta? <a href="login.html">Faça login aqui</a></p>
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
