<script>
    // import { onMount } from 'svelte';
    import axios from "axios";
    import './style.css';
    import './assets/logo.png'
    import './assets/ouvindo.png'
    let nome = "";
    let email = "";
    let senha = "";
    let conf_senha = "";
    let novoNome = "";
    let novoEmail = "";
    let novaSenha = ""; 
    let error = null;
    let resultado = null;
    let usuarios = null;
    let colunas_usuarios = null;
    const api_base_url = "http://localhost:3000";
  
    const carregarUsuarios = async () => {
      try {
        let res = await axios.get(api_base_url + "/usuarios", {
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
    // Função para deletar o usuário pelo ID
    const deletarUsuario = async (id) => {
      try {
        let res = await axios.delete(`${api_base_url}/usuarios/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        resultado = res.data;
        error = null;
        // recarrega lista de usuários apresentada
        carregarUsuarios();
      } catch (err) {
        error =
          "Erro ao deletar usuário: " +
          (err.response?.data?.message || err.message);
        resultado = null;
      }
    };
const editarUsuario = async (endpoint, data) => {
  try {
    let res = await axios.post(api_base_url + endpoint, data, {
      headers: { Accept: "application/json" },
    });
    resultado = res.data;
    error = null; // Limpa o erro se a requisição for bem-sucedida
  } catch (err) {
    error = "Erro ao enviar dados: " + (err.response?.data?.message || err.message);
    resultado = null; // Limpa o resultado em caso de erro
  }
};

const editarNome = async (id_usuario, novoNome) => {
  await editarUsuario("/usuarios/nome", { id_usuario, nome: novoNome });
  carregarUsuarios();
};

const editarEmail = async (id_usuario, novoEmail) => {
  await editarUsuario("/usuarios/email", { id_usuario, senha: novoEmail });
  carregarUsuarios();
};

const editarSenha = async (id_usuario, novaSenha) => {
  await editarUsuario("/usuarios/senha", { id_usuario, senha: novaSenha });
  carregarUsuarios();
};

    carregarUsuarios();

  </script>
  
  <main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
              <input class="form-control me-2" type="search" id="search-input" placeholder="Pesquise aqui" aria-label="Search">              <button class="btn-primary sidebar" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
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

      {#if usuarios}
      <div>
        <table class="table table-hover table-bordered text-center rounded">
          <thead>
            <tr>
              <th  colspan={colunas_usuarios.length + 2}>Atualização: {#if error}
                <p style="color: red;">{error}</p>
              {/if}
              {#if resultado && resultado.message}
                <p style="color: green;">{resultado.message}</p>
              {/if}<p id="message"></p></th>
            </tr>
            <tr>
              {#each colunas_usuarios as nome_coluna}
                <th>{nome_coluna}</th>
              {/each}
              <th></th>
            </tr><tr/>
          </thead>
          <tbody>
            {#each Object.values(usuarios) as linha_usuario}
              <tr>
                {#each colunas_usuarios as atributo}
                  <td>{linha_usuario[atributo]}</td>
                {/each}
                <td>
                  <button on:click={() => deletarUsuario(linha_usuario.id_usuario)} class="rounded">Remover</button>
                </td>
                <td>
                  <div class="dropdown  dropend">
                    <button type="button" class="dropdown-toggle rounded" data-bs-toggle="dropdown">
                      Editar
                    </button>
                    <ul class="dropdown-menu">
                      <label for="edit_nome">Editar Nome:</label>
                      <input type="text" bind:value ={novoNome} id="edit_nome" class="form-control">
                      <button on:click={() => editarNome(linha_usuario.id_usuario, novoNome)} class="btn btn-primary">Salvar</button>

                      <label for="edit_email">Editar Email:</label>
                      <input type="text" bind:value ={novoEmail} id="edit_email" class="form-control">
                      <button on:click={() => editarEmail(linha_usuario.id_usuario, novoEmail)} class="btn btn-primary">Salvar</button>
        
                      <label for="edit_senha">Editar Senha:</label>
                      <input type="text" bind:value ={novaSenha} id="edit_senha" class="form-control">
                      <button on:click={() => editarSenha(linha_usuario.id_usuario, novaSenha)} class="btn btn-primary">Salvar</button>
                    </ul>
                  </div> 
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {/if}
      <footer class="footer mt-auto py-3">
        <div class="container text-center">
            <span class="text-muted">DISCONOW &copy; 2024</span>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
  </main>
  