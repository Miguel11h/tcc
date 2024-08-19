# Documento de Casos de Uso

## Lista dos Casos de Uso

 - [CDU 01](#CDU-01): Cadastro de Usuários.
 - [CDU 02](#CDU-02): Login.
 - [CDU 03](#CDU-03): Pesquisa de produtos.
 - [CDU 04](#CDU-04): Visualização por categoria.
 - [CDU 05](#CDU-05): Visualização por gênero musical.
 - [CDU 06](#CDU-06): Adicionar produto ao carrinho.
 - [CDU 07](#CDU-07): Finalizar compra.
 - [CDU 08](#CDU-08): Gerenciar produtos


## Lista dos Atores

 - Cliente
 - Administradores
 - Sistema

### CDU 01 - Cadastro de usuários
## Atores
 - Cliente
 - Sistema

**Fluxo Principal**
1. Cliente informa nome, email, senha e confirmação de senha.
2. Sistema valida os dados e realiza o cadastro no banco de dados.
3. Cliente é redirecionado para a página principal já logado.

### CDU 02 - Login
## Atores
 - Cliente
 - Sistema

**Fluxo Principal**
1. Usuário irá informar email e senha.
2. Sistema valida as credenciais e autentica o usuário.                                       
3. Cliente é redirecionado para a página principal logado.

### CDU 03 - Pesquisa de Produtos
## Atores
- Cliente
- Sistema
  
**Fluxo Principal**
1. Cliente insere uma palavra-chave no campo de busca.
2. Sistema exibe a lista de produtos relacionados à palavra-chave.
3. Cliente visualiza os produtos.

### CDU 04 - Visualização por Categoria
## Atores
- Cliente
- Sistema

**Fluxo Principal**
1. Cliente acessa a aba de categorias.
2. Sistema exibe as categorias disponíveis, como CD e LP.
3. Cliente seleciona uma categoria e visualiza os produtos correspondentes.
  
### CDU 05 - Visualização por Gênero Musical
## Atores
- Cliente
- Sistema

**Fluxo Principal**
1. Cliente acessa a aba de gênero musical.
2. Sistema exibe os gêneros disponíveis.
3. Cliente seleciona um gênero e visualiza os produtos relacionados.

### CDU 06 - Adicionar Produto ao Carrinho
## Atores
- Cliente
- Sistema

**Fluxo Principal**
1. Cliente seleciona um produto e pressiona o botão "Adicionar ao Carrinho".
2. Sistema adiciona o produto ao carrinho e atualiza o total da compra.
3. Cliente visualiza o carrinho com o produto adicionado.

### CDU 07 - Finalizar Compra
## Atores
- Cliente
- Sistema

**Fluxo Principal**
1. Cliente acessa o carrinho e pressiona o botão "Finalizar Compra".
2. Sistema solicita confirmação de login, endereço e método de pagamento.
3. Sistema processa o pagamento e exibe a confirmação da compra.

### CDU 08 - Gerenciar Produtos
## Atores
- Administradores
- Sistema

**Fluxo Principal**
1. Administrador acessa a base de dados.
2. Administrador pode adicionar, editar ou excluir produtos.
3. Sistema atualiza a base de dados com as mudanças realizadas.
