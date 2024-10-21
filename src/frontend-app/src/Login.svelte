<script>
  // import { onMount } from 'svelte';
  import axios from "axios";
  import './style.css';
  import './assets/logo.png'
  import './assets/ouvindo.png'
  let email = "";
  let senha = "";
  let resultado = null;
  let error = null;
  let usuarios = null;
  let colunas_usuarios = null;
  const API_BASE_URL = "http://localhost:3000";

  const carregarUsuarios = async () => {
    try {
      let res = await axios.get(API_BASE_URL + "/usuarios", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      usuarios = res.data.usuarios;
      colunas_usuarios = Object.keys(usuarios[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      console.error(err);
      usuarios = null; // Limpa o resultado em caso de erro
    }
  };

  const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: API_BASE_URL,
        responseType: "json",
        headers: {
                Accept: "application/json",
            }
    });
    

  const logarUsuario = async () => {
    try {
      let res = await axiosInstance.post("/usuarios/login",
          {
            email,
            senha
          });
      resultado = res.data;
      if (resultado && resultado.status === "success") { 
            window.location.href = "/index.html";  
        }
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao enviar dados: " + (err.response?.data?.message || err.message);
      resultado = null; // Limpa o resultado em caso de erro
    }
  };

  carregarUsuarios();
  
</script>

<main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <nav class="navbar navbar-expand-sm custom-navbar">
        <div class="container">
          <button class="btn-primary rounded-5 sidebar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" href="index.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f3e6d8" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </button>
          
          
            <a class="navbar-brand" href="index.html">
                <img src="/src/assets/logo.png" alt="Avatar Logo" style="width:100px;">
            </a>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <div class="d-flex w-50 navbar-nav ms-auto" id="search-form">
                <input class="form-control me-2" type="search" id="search-input" placeholder="Pesquise aqui" aria-label="Search">
                <button class="btn-primary sidebar" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg></button>
      </div>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                      <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f3e6d8" class="bi bi-cart4" viewBox="0 0 16 16">
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                        </svg>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#f3e6d8" class="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">DISCONOW</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><a href="login.html">USUÁRIO</a></li>
            <li class="list-group-item"><a href="">CARRINHO</a></li>
            <li class="list-group-item"><a href="">CDs</a></li>
            <li class="list-group-item"><a href="">VINIL</a></li>
            <li class="list-group-item"><a href="">SUPORTE</a></li>
            <li class="list-group-item"><a href="index.html">Voltar para a página principal</a></li>
            <li class="list-group-item"><a href="administrador.html">Página de Administrador</a></li>
            <br>
            <div class="d-flex w-50" id="search-form">
              <input class="form-control me-2" type="search" id="search-input" placeholder="Pesquise aqui" aria-label="Search">
              <button class="btn-primary sidebar rounded-5" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
      </svg></button>
    </div>
          </ul>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
            <h2 class="text-center mb-4"><b>Login</b></h2>
            <form on:submit|preventDefault={logarUsuario} class="form_exemplo">
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" id="email" name="email" bind:value={email} class="form-control" placeholder="Digite seu e-mail">
                </div>
                <div class="mb-3">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" id="senha" name="senha" bind:value={senha} class="form-control" placeholder="Digite sua senha">
                </div>
                <div>
                  <button type="submit" class="btn-primary w-100 rounded">Entrar</button>
                  {#if error}
                    <p style="color: red;">{error}</p>
                  {/if}
                  {#if resultado && resultado.message}
                    <p style="color: green;">{resultado.message}</p>
                  {/if} 
            </form>
            <p id="message" class="mt-3 text-center"></p>
            <p class="text-center mt-2">Não tem uma conta? <a href="usuarios.html">Registre-se aqui</a></p>
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
