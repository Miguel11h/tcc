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
  
    const axiosInstance = axios.create({
      withCredentials: true,
      baseURL: API_BASE_URL,
      responseType: "json",
      headers: {
            Accept: "application/json",
        }
    });
  
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
        <hr>
        <form>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="validationServer01">Primeiro nome</label>
                <input type="text" class="form-control is-valid" id="validationServer01" placeholder="Nome" value="Mark" required>
                <div class="valid-feedback">
                  Tudo certo!
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationServer02">Sobrenome</label>
                <input type="text" class="form-control is-valid" id="validationServer02" placeholder="Sobrenome" value="Otto" required>
                <div class="valid-feedback">
                  Tudo certo!
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationServerUsername">Usuário</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend3">@</span>
                  </div>
                  <input type="text" class="form-control is-invalid" id="validationServerUsername" placeholder="Usuário" aria-describedby="inputGroupPrepend3" required>
                  <div class="invalid-feedback">
                    Por favor, escolha um nome de usuário.
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationServer03">Cidade</label>
                <input type="text" class="form-control is-invalid" id="validationServer03" placeholder="Cidade" required>
                <div class="invalid-feedback">
                  Por favor, informe uma cidade válida.
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationServer04">Estado</label>
                <input type="text" class="form-control is-invalid" id="validationServer04" placeholder="Estado" required>
                <div class="invalid-feedback">
                  Por favor, informe um estado válido.
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationServer05">CEP</label>
                <input type="text" class="form-control is-invalid" id="validationServer05" placeholder="CEP" required>
                <div class="invalid-feedback">
                  Por favor, informe um CEP válido.
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required>
                <label class="form-check-label" for="invalidCheck3">
                  Concordo com os termos e condições
                </label>
                <div class="invalid-feedback">
                  Você deve concordar, antes de continuar.
                </div>
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Enviar</button>
          </form>
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
  