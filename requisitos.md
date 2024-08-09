# Documento de Requisitos Funcionais

- [RF 01](#RF-01)
- [RF 02](#RF-02)
- [RF 03](#RF-03)
- [RF 04](#RF-04)
- [RF 05](#RF-05)
- [RF 06](#RF-06)
- [RF 07](#RF-07)
- [RF 08](#RF-08)
- [RF 09](#RF-09)
- [RF 10](#RF-10)
- [RF 11](#RF-11)

### RF 01
O sistema permitirá pesquisa por palavra-chave.
  - Haverá uma barra de pesquisa na página principal
  - O usuário poderá pesquisar por palavras chave como: "Djavan"
  - O sistema irá relacionar a palavra chave no banco de dados
  - O sistema retornará uma página com relação a palavra chave

### RF 02
O sistema terá registro e login.
  - Haverá dois botões, um de registro e outro de login
    - Registro:
      - O registro irá solicitar um nome, email e senha
      - O sistema vai lançar os dados do registro no banco de dados
      - O Sistema retornará o usuário logado para a página principal
    - Login:
      - O login irá solicitar um nome e senha
      - O sistema vai verificar se o nome e a senha existem e se conferem no banco de dados
      - O sistema retornará o usuário logado para a página principal

### RF 03
O sistema terá usuários diferentes para administradores e clientes.
  - Haverá dois tipos de usuários diferentes com permissões diferentes
  - Os clientes terão apenas acesso ao site principal
  - Os admnistradores terão acesso ao banco de dados do site

### RF 04 
O sistema deverá ter uma função de carrinho com visualização de preço total.
  - Haverá um botão com o ícone de um carrinho na página principal que quando clicada redirecionará o usuário para a página "Carrinho"
  - A página "Carrinho" irá mostrar todos os produtos que o usuário adicionar no carrinho e a soma do valor de todos os produtos
  - Haverá um botão de compra que quando clicado irá redirecionar o usuário para a página de compra com o valor de todos os produtos

### RF 05
Os produtos terão nome, descrição, preço e categoria.

### RF 06
O sistema terá um sistema de pesquisa de produtos.

### RF 07
O sistema terá um sistema de compra.

### RF 08
O sistema deverá exigir cadastro para a compra.

### RF 09
O sistema deverá ter uma função de carrinho com visualização de preço total.

### RF 10
O sistema terá categorias de produto, como CD e LP.

### RF 11
O sistema terá uma aba para pesquisa por gênero musical.

# Documento de Requisitos Não Funcionais

### RNF01
O site deverá ser responsivo

### RNF02
Deverá ser multiplataforma via web

### RNF03
O frontend deverá ser feito com react 

### RNF04
O backend deverá ser feito com Nodejs

### RNF05
O sistema terá marrom como cor principal

### RNF 06
O sistema terá uma imagem de boas vindas

### RNF 07
O sistema terá um rodapé com contato e suporte
