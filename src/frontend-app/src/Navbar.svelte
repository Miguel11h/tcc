<script>
      
  import { onMount } from 'svelte';
  import axios from "axios";
  let error = null;
  let resultado = null;
  let usuarios = null;
  let usuarioLogado = null;
  let colunasUsuarios = null;
  let colunas_produtos = null;
  let produtos = null;
  let colunas_produtos_cd = null;
  let produtos_cd = null;
  import './style.css';
  import './assets/logo.png'
  import './assets/ouvindo.png'
  import Navbar from './Navbar.svelte';
  const API_BASE_URL = "http://localhost:3000";
  let searchQuery = ''; // Variável para armazenar o valor da pesquisa
  let filteredProdutos = []; // Armazena os produtos filtrados

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
          Accept: "application/json",
      }
  });
  const searchProdutos = () => {
    if (searchQuery.trim() === '') {
      filteredProdutos = produtos; // Se não houver pesquisa, mostra todos os produtos
    } else {
      filteredProdutos = produtos.filter(produto => 
        produto.nome_produto.toLowerCase().includes(searchQuery.toLowerCase()) || 
        produto.descricao_produto.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

  const buscarUsuarioLogado = async () => {
      try {
          const res = await axiosInstance.get(API_BASE_URL + '/usuarios/me');
          console.log(res.data);
          usuarioLogado = res.data.usuario; // Armazena os dados do usuário
          error = null; // Limpa o erro se a requisição for bem-sucedida
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
<nav class="navbar navbar-expand-sm custom-navbar">
    <div class="container">
      <button class="btn-primary rounded-5 sidebar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f3e6d8" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      
      
        <a class="navbar-brand" href="index.html">
            <img src="/src/assets/logo.png" alt="Avatar Logo" style="width:100px;">
        </a>
            <ul class="navbar-nav ms-auto">
    
  {#if usuarioLogado}
  <li class="nav-item">
    <a href="carrinho.html">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f3e6d8" class="bi bi-cart4" viewBox="0 0 16 16">
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
      </svg>
    </a>
  </li>  
  <li class="nav-item">
    <div class="dropdown">
    <button class="buttonUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#f3e6d8" class="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
      </svg>
    </button>
    <ul class="dropdown-menu">
      <li><p class="dropdown-item">{usuarioLogado.nome}</p></li>
      <li><button class="dropdown-item" on:click={logout}>Logout</button></li>
    </ul>
  </div>
  </li>

      {:else}
      <a class="btn" style="color: #f3e6d8;"href="login.html">Login</a>
   
                
  {/if} 
            </ul>
        </div>
</nav>
