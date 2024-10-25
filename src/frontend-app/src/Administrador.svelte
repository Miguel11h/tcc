<script>
    
  import axios from "axios";
  import './style.css';
  import './assets/logo.png'
  import './assets/ouvindo.png'
  import { onMount } from "svelte";
  import Navbar from "./Navbar.svelte";
  let novoNome = "";
  let novoEmail = "";
  let novaSenha = ""; 
  let error = null;
  let resultado = null;
  let usuarios = null;
  let usuarioLogado = null;
  let colunas_usuarios = null;
  const API_BASE_URL= "http://localhost:3000";

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
      let res = await axiosInstance.get(API_BASE_URL + "/usuarios", {
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
      let res = await axios.delete(`${API_BASE_URL}/usuarios/${id}`, {
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
  let res = await axios.post(API_BASE_URL + endpoint, data, {
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

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
