## Lista dos Casos de Uso

 - [CDU 01](#CDU-01): Cadastro de Usuários 
 - [CDU 02](#CDU-02): Login
 - [CDU 03](#CDU-03): Logout 
 - [CDU 04](#CDU-04): Pesquisa de produtos 
 - [CDU 05](#CDU-05): Visualização por categoria
 - [CDU 06](#CDU-06): Visualização por gênero musical 
 - [CDU 07](#CDU-07): Adicionar produto ao carrinho
 - [CDU 08](#CDU-08): Finalizar compra
 - [CDU 09](#CDU-09): Gerenciar produtos
 - [CDU 10](#CDU-10): Gerenciar usuários 
 - [CDU 11](#CDU-11): Gerenciar categorias
 - [CDU 12](#CDU-12) Gerenciar gênero musical 

## Lista dos Atores 
 - Cliente
 - Administradores

### CDU-01 - Cadastro de usuários
## Atores
 - Cliente

**Fluxo Principal**
1. Cliente informa nome, email, senha e confirmação de senha
2. Sistema valida os dados e realiza o cadastro no banco de dados
3. Sistema retorna que o cadastro foi realizado com sucesso
4. Cliente é redirecionado para a página principal já logado

**Fluxo Alternativo A - Senha incorreta**
1. Cliente informa nome, email, senha e confirmação de senha
2. Sistema verifica que a senha e a confirmação da senha não conferem
3. Sistema retorna que as senhas não conferem
4. Cliente digita uma senha que confere com confirmar senha
5. Sistema valida os dados e realiza o cadastro no banco de dados
6. Sistema retorna que o cadastro foi realizado com sucesso
7. Cliente é redirecionado para a página principal já logado

**Fluxo Alternativo B - Email incorreto**
1. Cliente informa nome, email, senha e confirmação de senha
2. Sistema verifica que o email não consta no banco de dados
3. Sistema retorna um aviso dizendo que o email é inválido
4. Cliente digita um email válido
5. Sistema valida os dados e realiza o cadastro no banco de dados
6. Sistema retorna que o cadastro foi realizado com sucesso
7. Cliente é redirecionado para a página principal já logado

### CDU 02 - Login 
## Atores
 - Cliente

**Fluxo Principal**
1. Cliente irá informar email e senha
2. Sistema valida as credenciais e autentica o usuário
3. Sistema retorna que o login foi realizado com sucesso                           
4. Cliente é redirecionado para a página principal logado

**Fluxo Alternativo - Dados não conferem**
1. Cliente irá informar email e senha
2. Sistema verifica que informações não conferem na base de dados
3. Sistema retorna que os dados não conferem
4. Cliente digita um email e senha que conferem
5. Sistema valida os dados e autentica o usuário
6. Sistema retorna que o login foi realizado com sucesso  
7. Cliente é redirecionado para a página principal logado

### CDU 03 - Logout 
## Atores
 - Cliente
 - Administrador

**Fluxo Principal**
1. Usuário pressiona o botão "Logout"
2. Usuário é deslogado da conta
3. Sistema retorna que o logout foi realizado com sucesso
4. Usuário é redirecionado para a página principal deslogado

### CDU 04 - Pesquisa de Produtos 
## Atores
- Cliente
 
**Fluxo Principal**
1. Cliente insere uma palavra-chave no campo de busca
2. Sistema exibe a lista de produtos relacionados à palavra-chave
3. Cliente visualiza os produtos

**Fluxo Alternativo - Nenhum Produto Encontrado**
1. Cliente insere uma palavra-chave no campo de busca
2. Sistema não encontra produtos relacionados à palavra-chave
3. Sistema informa que não foram encontrados produtos relacionados
4. Cliente pode tentar uma nova busca com uma palavra-chave diferente

### CDU 05 - Visualização por Categoria
## Atores
- Cliente

**Fluxo Principal**
1. Cliente acessa a aba de categorias
2. Sistema exibe as categorias disponíveis, como CD e LP
3. Cliente seleciona uma categoria
4. Cliente é redirecionado para a página dos produtos correspondentes

**Fluxo Alternativo - Nenhum Produto na Categoria**
1. Cliente acessa a aba de categorias
2. Sistema exibe as categorias disponíveis, como CD e LP
3. Cliente seleciona uma categoria
4. Sistema não encontra produtos na categoria selecionada
5. Sistema informa que não há produtos disponíveis nessa categoria
6. Cliente pode voltar e escolher outra categoria
 
### CDU 06 - Visualização por Gênero Musical
## Atores
- Cliente

**Fluxo Principal**
1. Cliente acessa a aba de gênero musical
2. Sistema exibe os gêneros disponíveis
3. Cliente seleciona um gênero
4. Cliente é redirecionado para a página dos produtos correspondentes

**Fluxo Alternativo - Nenhum Produto no Gênero Musical**
1. Cliente acessa a aba de gênero musical
2. Sistema exibe os gêneros disponíveis
3. Cliente seleciona um gênero musical
4. Sistema não encontra produtos no gênero musical selecionado
5. Sistema informa que não há produtos disponíveis nesse gênero
6. Cliente pode voltar e escolher outro gênero musical

### CDU 07 - Adicionar Produto ao Carrinho 
## Atores
- Cliente

**Fluxo Principal**
1. Cliente seleciona um produto e pressiona o botão "Adicionar ao Carrinho"
2. Sistema adiciona o produto ao carrinho e atualiza o total da compra
3. Cliente visualiza o carrinho com o produto adicionado

**Fluxo Alternativo A - Produto Esgotado**
1. Cliente seleciona um produto e pressiona o botão "Adicionar ao Carrinho"
2. Sistema verifica que o produto está esgotado
3. Sistema informa que o produto está indisponível
4. Cliente pode procurar um produto alternativo

**Fluxo Alternativo B - Limite de Produto no Carrinho Atingido**
1. Cliente seleciona um produto e pressiona o botão "Adicionar ao Carrinho"
2. Sistema verifica que o cliente já atingiu o limite de unidades permitido para aquele produto no carrinho
3. Sistema informa que o limite de unidades foi atingido
4. Cliente pode ajustar a quantidade no carrinho ou não adicionar mais unidades

### CDU 08 - Finalizar Compra
## Atores
- Cliente

**Fluxo Principal**
1. Cliente acessa o carrinho e pressiona o botão "Finalizar Compra"
2. Sistema solicita confirmação de login e endereço
3. Sistema solicita informe do método de pagamento
3. Sistema processa o pagamento e exibe a confirmação da compra

**Fluxo Alternativo A - Cliente Não Logado**
1. Cliente acessa o carrinho e pressiona o botão "Finalizar Compra"
2. Sistema detecta que o cliente não está logado
3. Sistema solicita o login
4. Cliente informa as credenciais e realiza o login
5. Sistema redireciona o cliente de volta ao carrinho para finalizar a compra

**Fluxo Alternativo B - Pagamento Não Autorizado**
1. Cliente acessa o carrinho e pressiona o botão "Finalizar Compra"
2. Sistema solicita confirmação de login e endereço
3. Sistema solicita informe do método de pagamento
4. Sistema processa o pagamento, mas ele não é autorizado
5. Sistema exibe uma mensagem informando que o pagamento foi recusado
6. Cliente pode tentar mudar a forma de pagamento ou corrigir as informações
7. Sistema processa o pagamento e exibe a confirmação da compra

**Fluxo Alternativo C - Produto Indisponível Durante Finalização**
1. Cliente acessa o carrinho e pressiona o botão "Finalizar Compra"
2. Sistema detecta que um dos produtos no carrinho ficou indisponível
3. Sistema exibe uma mensagem informando que o produto está esgotado
4. Cliente pode remover o produto indisponível e continuar a compra ou cancelar a operação

### CDU 09 - Gerenciar Produtos
## Atores
- Administradores
 
**Fluxo Principal**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de incluir produto
3. Administrador inclui nome, descrição, categoria e gênero musical do produto
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o produto foi incluído no banco de dados

**Fluxo Alternativo A - Editar produto**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de editar produto
3. Administrador edita nome, descrição, categoria e/ou gênero musical do produto
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o produto foi editado no banco de dados

**Fluxo Alternativo B - Excluir produto**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de excluir produto
3. Administrador exclui o produto
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o produto foi excluído do banco de dados

**Fluxo Alternativo - Produto não encontrado**
1. Administrador acessa a base de dados
2. Administrador tenta editar ou excluir um produto
3. Sistema não encontra o produto informado para edição ou exclusão
4. Sistema informa que o produto não foi encontrado
5. Administrador pode tentar novamente com um produto válido

### CDU 10 - Gerenciar Usuários
## Atores
- Administradores
 
**Fluxo Principal**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de incluir usuário
3. Administrador inclui nome, email e senha
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o usuário foi incluído no banco de dados

**Fluxo Alternativo A - Editar usuário**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de editar usuário
3. Administrador editar nome, email e/ou senha
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o usuário foi editado no banco de dados

**Fluxo Alternativo B - Excluir usuário**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de excluir usuário
3. Administrador exclui usuário
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o usuário foi excluído do banco de dados

**Fluxo Alternativo - Usuário não encontrado**
1. Administrador acessa a base de dados
2. Administrador tenta editar ou excluir um usuário
3. Sistema não encontra o usuário informado para edição ou exclusão
4. Sistema informa que o usuário não foi encontrado
5. Administrador pode tentar novamente com um usuário válido

### CDU 11 - Gerenciar categorias 
## Atores
- Administradores
 
**Fluxo Principal**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de incluir categoria
3. Administrador inclui nome da categoria
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que a categoria foi incluída no banco de dados

**Fluxo Alternativo A - Editar categoria**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de editar categoria
3. Administrador editar nome da categoria
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que a categoria foi editada no banco de dados

**Fluxo Alternativo B - Excluir categoria**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de excluir categoria
3. Administrador exclui categoria
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que a categoria foi excluída do banco de dados

**Fluxo Alternativo - Categoria não encontrada**
1. Administrador acessa a base de dados
2. Administrador tenta editar ou excluir uma categoria
3. Sistema não encontra a categoria informada para edição ou exclusão
4. Sistema informa que a categoria não foi encontrada
5. Administrador pode tentar novamente com uma categoria válida

### CDU 12 - Gerenciar Gênero Musical
## Atores
- Administradores
 
**Fluxo Principal**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de incluir gênero musical
3. Administrador inclui nome do gênero musical
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o gênero musical foi incluído no banco de dados

**Fluxo Alternativo A - Editar gênero musical**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de editar gênero musical
3. Administrador editar nome do gênero musical
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o gênero musical foi editada no banco de dados

**Fluxo Alternativo B - Excluir gênero musical**
1. Administrador acessa a base de dados
2. Administrador seleciona opção de excluir gênero musical
3. Administrador exclui gênero musical
4. Administrador confirma o envio dos dados
5. Sistema atualiza a base de dados com as mudanças realizadas
6. Sistema informa que o gênero musical foi excluído do banco de dados

**Fluxo Alternativo - Gênero musical não encontrado**
1. Administrador acessa a base de dados
2. Administrador tenta editar ou excluir um gênero musical
3. Sistema não encontra o gênero musical informado para edição ou exclusão
4. Sistema informa que o gênero musical não foi encontrado
5. Administrador pode tentar novamente com um gênero musical válido
