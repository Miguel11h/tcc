<script>
  
  import { onMount } from 'svelte';
  import axios from "axios";
  import './style.css';
  import './assets/logo.png'
  import './assets/ouvindo.png'
  import Navbar from './Navbar.svelte';
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
  
  const buscarUsuarioLogado = async () => {
      try {
          const res = await axiosInstance.get(API_BASE_URL + '/usuarios/me');
          console.log(res.data);
          usuarioLogado = res.data.usuario; // Armazena os dados do usuário
          error = null; // Limpa o erro se a requisição for bem-sucedida
          if (usuarioLogado){
            window.location.href = "/index.html";
          }
      } catch (err) {
          error = err.response?.data?.message || err.message;
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
<Navbar> </Navbar>
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
            <li class="list-group-item"><a href="login.html">USUÁRIO</a></li>
            <li class="list-group-item"><a href="">CARRINHO</a></li>
            <li class="list-group-item"><a href="">CDs</a></li>
            <li class="list-group-item"><a href="">VINIL</a></li>
            <li class="list-group-item"><a href="">SUPORTE</a></li>
            <li class="list-group-item"><a href="index.html">Voltar para a página principal</a></li>
            <li class="list-group-item"><a href="administrador.html">Página de Administrador</a></li>
            <br>
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
