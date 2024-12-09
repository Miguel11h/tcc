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
    carregarProdutos();
    carregarUsuarios();
    carregarProdutosCd();
  }); 

</script>

<style>
  .maximo {
    max-width: 400px;
  }
</style>

<main>
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
              <button class="buttonUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" fill="#f3e6d8" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </button>
              <ul class="dropdown-menu">
                <li><p class="dropdown-item">{usuarioLogado.nome}</p></li>
                <li><button class="dropdown-item" on:click={logout}>Logout</button></li>
              </ul>
            </div></li>
            <li class="list-group-item"><a href="">CARRINHO</a></li>
            {:else}
            <li class="list-group-item"><a href="login.html">USUÁRIO</a></li>
            {/if}
            <li class="list-group-item"><a href="">CDs</a></li>
            <li class="list-group-item"><a href="">VINIL</a></li>
            <li class="list-group-item"><a href="">SUPORTE</a></li>
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
 <div class="d-flex w-50" id="search-form">
      <input 
        class="form-control me-2" 
        type="search" 
        id="search-input" 
        placeholder="Search..." 
        aria-label="Search" 
        bind:value={searchQuery}/> <!-- Captura a entrada do usuário -->
      <button class="btn-primary sidebar rounded-5" type="submit" on:click={searchProdutos}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </button>
    </div>



    <div class="container cardcarousel">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators btn-carousel">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active bg-dark" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="bg-dark" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/src/assets/slide1.png" class="d-block w-100" alt="Imagem de boas-vindas">
          </div>
          <div class="carousel-item">
            <img src="/src/assets/slide2.png" class="d-block w-100" alt="Imagem de oferta">
          </div>
        </div>
      </div>
<div class="container cardcarousel">

  {#if searchQuery}
  <h1 class="subtitulo">DISCOS</h1>
  <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      {#each filteredProdutos.slice(0, Math.ceil(filteredProdutos.length / 3)) as _, index}
        <div class="carousel-item {index === 0 ? 'active' : ''}">
          <div class="container">
            <div class="row">
              {#each filteredProdutos.slice(index * 3, index * 3 + 3) as linha_produto}
                <div class="col">
                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter{linha_produto.id_produto}">
                    <img src="{linha_produto.imagem_produto}" alt="" class="d-block w-100">
                  </button>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {:else}
  
    <hr>
    {#if produtos}
    <h1 class="subtitulo">DISCOS</h1>
    <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        {#each Object.values(produtos).slice(0, Math.ceil(Object.values(produtos).length / 3)) as _, index}
          <div class="carousel-item {index === 0 ? 'active' : ''}">
            <div class="container">
              <div class="row">
                {#each Object.values(produtos).slice(index * 3, index * 3 + 3) as linha_produto}
                  <div class="col">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter{linha_produto.id_produto}">
                      <img src="{linha_produto.imagem_produto}" alt="" class="maximo d-block w-100">
                    </button>
  
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalCenter{linha_produto.id_produto}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle{linha_produto.id_produto}" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <img src="{linha_produto.imagem_produto}" alt="" class="d-block w-100">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <p><b>{linha_produto.nome_produto}</b></p>
                            <p><i>{linha_produto.descricao_produto}</i></p>
                            <p>R${linha_produto.preco_produto}</p>


                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">COMPRAR</button>
                            <button type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f3e6d8" class="bi bi-cart4" viewBox="0 0 16 16">
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                            </svg></button>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  
      
      <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      
      <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próxima</span>
      </button> 
  {/if}
    <hr>
    {#if produtos_cd}
    <h1 class="subtitulo">CDs</h1>
    <div id="imageCarousel2" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        {#each Object.values(produtos_cd).slice(0, Math.ceil(Object.values(produtos_cd).length / 3)) as _, index}
          <div class="carousel-item {index === 0 ? 'active' : ''}">
            <div class="container">
              <div class="row">
                {#each Object.values(produtos_cd).slice(index * 3, index * 3 + 3) as linha_produto_cd}
                <div class="col">
                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter{linha_produto_cd.id_produto_cd}">
                    <img src="{linha_produto_cd.imagem_produto_cd}" alt="{linha_produto_cd.imagem_produto_cd}" class="maximo d-block w-100">
                  </button>

                  <!-- Modal -->
                  <div class="modal fade" id="exampleModalCenter{linha_produto_cd.id_produto_cd}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle{linha_produto_cd.id_produto_cd}" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <img src="{linha_produto_cd.imagem_produto_cd}" alt="" class="d-block w-100">
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p><b>{linha_produto_cd.nome_produto_cd}</b></p>
                          <p><i>{linha_produto_cd.descricao_produto_cd}</i></p>
                          <p>R${linha_produto_cd.preco_produto_cd}</p>


                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">COMPRAR</button>
                          <button type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f3e6d8" class="bi bi-cart4" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                          </svg></button>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel2" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      
      <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel2" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próxima</span>
      </button>
    </div>
  {/if}
  {/if}
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
