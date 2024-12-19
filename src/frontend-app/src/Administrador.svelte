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
  let novoNomeProduto = "";
  let novaDescricao = "";
  let novoPreco = "";
  let novaImagem = null;
  let novoNomeProduto_cd = "";
  let novaDescricao_cd = "";
  let novoPreco_cd = "";
  let novaImagem_cd = null;
  let error = null;
  let resultado = null;
  let usuarios = null;
  let usuarioLogado = null;
  let colunas_usuarios = null;
  let produtos = null;
  let colunas_produtos = null;
  let produtos_cd = null;
  let colunas_produtos_cd = null;
  let novoProduto = { nome: "", descricao: "", preco: 0,  imagem: null };
  let novoProduto_cd = { nome_cd: "", descricao_cd: "", preco_cd: 0,  imagem_cd: null };

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
await editarUsuario("/usuarios/email", { id_usuario, email: novoEmail });
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
        if (!usuarioLogado){
            window.location.href = '/index.html';
          }
        error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
        error = err.response?.data?.message || err.message;
        usuarioLogado = null; // Limpa os dados em caso de erro
        if (err.response && err.response.status === 401) {
            window.location.href = '/index.html';
        }
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

const deletarProduto = async (id) => {
  try {
    let res = await axios.delete(`${API_BASE_URL}/produtos/${id}`);
    resultado = res.data;
    carregarProdutos();
    error = null;
  } catch (err) {
    error = "Erro ao deletar produto: " + (err.response?.data?.message || err.message);
    resultado = null;
  }
};

const editarProduto = async (endpoint, data) => {
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
const adicionarProduto = async () => {
    try {
      let res = await axiosInstance.post(API_BASE_URL + "/produtos/novo", novoProduto);
      resultado = res.data;
      novoProduto = { nome: "", descricao: "", preco: 0, imagem: null };
      carregarProdutos();
      error = null;
    } catch (err) {
      error = "Erro ao adicionar produto: " + (err.response?.data?.message || err.message);
      resultado = null;
    }
  };

const editarNomeProduto = async (id_produto, novoNomeProduto) => {
await editarProduto("/produtos/nome", { id_produto, nome: novoNomeProduto });
carregarProdutos();
};

const editarDescricao = async (id_produto, novaDescricao) => {
await editarProduto("/produtos/descricao", { id_produto, descricao: novaDescricao });
carregarProdutos();
};

const editarPreco = async (id_produto, novoPreco) => {
await editarProduto("/produtos/preco", { id_produto, preco: novoPreco });
carregarProdutos();
};

const editarImagem = async (id_produto, novaImagem) => {
await editarProduto("/produtos/imagem", { id_produto, imagem: novaImagem });
carregarProdutos();
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

const deletarProdutoCd = async (id) => {
  try {
    let res = await axios.delete(`${API_BASE_URL}/produtos_cd/${id}`);
    resultado = res.data;
    carregarProdutosCd();
    error = null;
  } catch (err) {
    error = "Erro ao deletar produto: " + (err.response?.data?.message || err.message);
    resultado = null;
  }
};

const editarProdutoCd = async (endpoint, data) => {
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

const adicionarProdutoCd = async () => {
    try {
      let res = await axiosInstance.post(API_BASE_URL + "/produtos_cd/novo", novoProduto_cd);
      resultado = res.data;
      novoProduto_cd = { nome_cd: "", descricao_cd: "", preco_cd: 0, imagem_cd: null };
      carregarProdutosCd();
      error = null;
    } catch (err) {
      error = "Erro ao adicionar produto: " + (err.response?.data?.message || err.message);
      resultado = null;
    }
  };

const editarNomeProdutoCd = async (id_produto_cd, novoNomeProduto_cd) => {
  await editarProdutoCd("/produtos_cd/nome", { id_produto_cd, nome_cd: novoNomeProduto_cd });
  carregarProdutosCd();
};

const editarDescricaoCd = async (id_produto_cd, novaDescricao_cd) => {
  await editarProdutoCd("/produtos_cd/descricao", { id_produto_cd, descricao_cd: novaDescricao_cd });
  carregarProdutosCd();
};

const editarPrecoCd = async (id_produto_cd, novoPreco_cd) => {
  await editarProdutoCd("/produtos_cd/preco", { id_produto_cd, preco_cd: novoPreco_cd });
  carregarProdutosCd();
};

const editarImagemCd = async (id_produto_cd, novaImagem_cd) => {
  await editarProdutoCd("/produtos_cd/imagem", { id_produto_cd, imagem_cd: novaImagem_cd });
  carregarProdutosCd();
};


onMount(() => {
  buscarUsuarioLogado();
  carregarProdutos();
  carregarProdutosCd();
  carregarUsuarios();
}); 

</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
        <li class="list-group-item"><a href="./suporte.html">SUPORTE</a></li>
        <li class="list-group-item"><a href="administrador.html">Página de administrador</a></li>

        <br>

      </ul>
    </div>
  </div>
</div>

    {#if usuarios}
    <div>
      <h2 class="mt-4"><b>Gerenciamento de Usuários</b></h2>
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
                <button on:click={() => deletarUsuario(linha_usuario.id_usuario)} class="rounded btn-primary">Remover</button>
              </td>
              <td>
                <div class="dropdown dropend">
                  <button type="button" class="dropdown-toggle rounded btn-primary" data-bs-toggle="dropdown">Editar</button>
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
    <h2 class="mt-4"><b>Gerenciamento de Produtos</b></h2>
                      <button type="button" class="rounded btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter1">
                       Adicionar Discos
                      </button>
    
                      <!-- Modal -->
                      <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-body">
                              <div class="register-container animated">
                                <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
                                  <h2 class="text-center mb-4"><b>Cadastro de Discos</b></h2>
                                  <form on:submit|preventDefault={adicionarProduto} class="form_exemplo">
                                    <div class="mb-3">
                                      <label for="nome" class="form-label">Nome do Produto:</label>
                                      <input 
                                        type="text"
                                        class="form-control"
                                        id="nome" 
                                        bind:value={novoProduto.nome} 
                                        placeholder="Digite o nome do produto">
                                    </div>
                                    <div class="mb-3">
                                      <label for="descricao" class="form-label">Descrição do Produto:</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="descricao"
                                        bind:value={novoProduto.descricao}
                                        placeholder="Digite a descrição do produto"
                                        required
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label for="preco" class="form-label">Preço do Produto:</label>
                                      <input
                                        type="number"
                                        class="form-control"
                                        id="preco"
                                        bind:value={novoProduto.preco}
                                        placeholder="Insira o preço do produto"
                                        required
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label for="imagem" class="form-label">Imagem do Produto:</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="imagem"
                                        bind:value={novoProduto.imagem}
                                        placeholder="Insira a imagem do produto"
                                      />
                                    </div>
                                    <div>
                                      <button type="submit" class="btn-primary w-100 rounded">Registrar Produto</button>
                                      {#if error}
                                        <p style="color: red;">{error}</p>
                                      {/if}
                                      {#if resultado && resultado.message}
                                        <p style="color: green;">{resultado.message}</p>
                                      {/if}
                                      <p id="message" class="mt-3 text-center"></p>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>  
                      <button type="button" class="rounded btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                        Adicionar CDs
                      </button>
    
                      <!-- Modal -->
                      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-body">
                              <div class="register-container animated">
                                <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
                                  <h2 class="text-center mb-4"><b>Cadastro de CDs</b></h2>
                                  <form on:submit|preventDefault={adicionarProdutoCd} class="form_exemplo">
                                    <div class="mb-3">
                                      <label for="nome" class="form-label">Nome do Produto:</label>
                                      <input 
                                        type="text"
                                        class="form-control"
                                        id="nome" 
                                        bind:value={novoProduto_cd.nome_cd} 
                                        placeholder="Digite o nome do produto">
                                    </div>
                                    <div class="mb-3">
                                      <label for="descricao" class="form-label">Descrição do Produto:</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="descricao"
                                        bind:value={novoProduto_cd.descricao_cd}
                                        placeholder="Digite a descrição do produto"
                                        required
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label for="preco" class="form-label">Preço do Produto:</label>
                                      <input
                                        type="number"
                                        class="form-control"
                                        id="preco"
                                        bind:value={novoProduto_cd.preco_cd}
                                        placeholder="Insira o preço do produto"
                                        required
                                      />
                                    </div>
                                    <div class="mb-3">
                                      <label for="imagem" class="form-label">Imagem do Produto:</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="imagem"
                                        bind:value={novoProduto_cd.imagem_cd}
                                        placeholder="Insira a imagem do produto"
                                      />
                                    </div>
                                    <div>
                                      <button type="submit" class="btn-primary w-100 rounded">Registrar Produto</button>
                                      {#if error}
                                        <p style="color: red;">{error}</p>
                                      {/if}
                                      {#if resultado && resultado.message}
                                        <p style="color: green;">{resultado.message}</p>
                                      {/if}
                                      <p id="message" class="mt-3 text-center"></p>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  {#if produtos}
    <div>
      <table class="table table-hover table-bordered text-center rounded">
        <thead>
          {#each colunas_produtos as nome_coluna_produto}
              <th>{nome_coluna_produto}</th>
            {/each}
            <th></th>
        </thead>
          <tr>
            <tbody>
            {#each Object.values(produtos) as linha_produto}
            <tr>
              {#each colunas_produtos as atributo_produto}
                <td>{linha_produto[atributo_produto]}</td>
              {/each}
              <td>
                <button on:click={() => deletarProduto(linha_produto.id_produto)} class="rounded btn-primary">Remover</button>
              </td>
              <td>
                <div class="dropdown  dropend">
                  <button type="button" class="dropdown-toggle rounded btn-primary" data-bs-toggle="dropdown">Editar</button>
                  <ul class="dropdown-menu">
                    <label for="edit_nome_produto">Editar Nome:</label>
                    <input type="text" bind:value ={novoNomeProduto} id="edit_nome" class="form-control">
                    <button on:click={() => editarNomeProduto(linha_produto.id_produto, novoNomeProduto)} class="btn btn-primary">Salvar</button>

                    <label for="edit_descricao">Editar Descrição:</label>
                    <input type="text" bind:value ={novaDescricao} id="edit_descricao" class="form-control">
                    <button on:click={() => editarDescricao(linha_produto.id_produto, novaDescricao)} class="btn btn-primary">Salvar</button>
      
                    <label for="edit_preco">Editar Preço:</label>
                    <input type="text" bind:value ={novoPreco} id="edit_preco" class="form-control">
                    <button on:click={() => editarPreco(linha_produto.id_produto, novoPreco)} class="btn btn-primary">Salvar</button>

                    <label for="edit_imagem">Editar Imagem:</label>
                    <input type="text" bind:value ={novaImagem} id="edit_imagem" class="form-control">
                    <button on:click={() => editarImagem(linha_produto.id_produto, novaImagem)} class="btn btn-primary">Salvar</button>
                  </ul>
                </div> 
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if produtos_cd}
    <div>
      <table class="table table-hover table-bordered text-center rounded">
        <thead>
          {#each colunas_produtos_cd as nome_coluna_produto_cd}
              <th>{nome_coluna_produto_cd}</th>
            {/each}
            <th></th>
        </thead>
          <tr>
            <tbody>
            {#each Object.values(produtos_cd) as linha_produto_cd}
            <tr>
              {#each colunas_produtos_cd as atributo_produto_cd}
                <td>{linha_produto_cd[atributo_produto_cd]}</td>
              {/each}
              <td>
                <button on:click={() => deletarProdutoCd(linha_produto_cd.id_produto_cd)} class="rounded btn-primary">Remover</button>
              </td>
              <td>
                <div class="dropdown  dropend">
                  <button type="button" class="dropdown-toggle rounded btn-primary" data-bs-toggle="dropdown">
                    Editar
                  </button>
                  <ul class="dropdown-menu">
                    <label for="edit_nome_produto">Editar Nome:</label>
                    <input type="text" bind:value={novoNomeProduto_cd} id="edit_nome" class="form-control">
                    <button on:click={() => editarNomeProdutoCd(linha_produto_cd.id_produto_cd, novoNomeProduto_cd)} class="btn btn-primary">Salvar</button>

                    <label for="edit_descricao">Editar Descrição:</label>
                    <input type="text" bind:value={novaDescricao_cd} id="edit_descricao" class="form-control">
                    <button on:click={() => editarDescricaoCd(linha_produto_cd.id_produto_cd, novaDescricao_cd)} class="btn btn-primary">Salvar</button>
      
                    <label for="edit_preco">Editar Preço:</label>
                    <input type="text" bind:value={novoPreco_cd} id="edit_preco" class="form-control">
                    <button on:click={() => editarPrecoCd(linha_produto_cd.id_produto_cd, novoPreco_cd)} class="btn btn-primary">Salvar</button>

                    <label for="edit_imagem">Editar Imagem:</label>
                    <input type="text" bind:value={novaImagem_cd} id="edit_imagem" class="form-control">
                    <button on:click={() => editarImagemCd(linha_produto_cd.id_produto_cd, novaImagem_cd)} class="btn btn-primary">Salvar</button>
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

