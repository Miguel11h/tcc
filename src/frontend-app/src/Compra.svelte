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
        <h2 class="text-center mb-4"><b>Finalizar Compra</b></h2>
        <form on:submit|preventDefault={logarUsuario} class="form_exemplo">
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
                    <option value="Cartão">Cartão</option>
                    <option value="Boleto">Boleto</option>
                  </select>
            </div>
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
  