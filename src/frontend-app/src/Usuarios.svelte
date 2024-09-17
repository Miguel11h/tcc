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

  const cadastrarUsuario = async () => {
    try {
      let res = await axios.post(
        api_base_url + "/usuarios/novo",
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
      error = null; // Limpa o erro se a requisição for bem-sucedida
      // recarrega lista de usuários apresentada
      carregarUsuarios();
    } catch (err) {
      error =
        "Erro ao enviar dados: " + err.response?.data?.message || err.message;
      resultado = null; // Limpa o resultado em caso de erro
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

  carregarUsuarios();
  
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <nav class="navbar navbar-expand-sm custom-navbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
          <img src="/src/assets/logo.png" alt="Logo" style="width:100px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link custom-nav-link" href="index.html"><b>INÍCIO</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link custom-nav-link" href="index.html"><b>CATEGORIAS</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link custom-nav-link" href="index.html"><b>GÊNEROS</b></a>
                </li>
            </ul>
        </div>
    </div>
  </nav>
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
          <a type="button" class="btn" href='login.html'>login</a>
        </div>
      </form>
      </div>
      </div>
      </div>
    {#if usuarios}
      <table>
        <thead>
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
                <button on:click={() => deletarUsuario(linha_usuario.id_usuario)}>Remover</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
    <footer class="footer mt-auto py-3">
      <div class="container text-center">
          <span class="text-muted">DISCONOW &copy; 2024</span>
      </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
</main>
