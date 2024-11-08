CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto TEXT NOT NULL,
    descricao_produto TEXT NOT NULL UNIQUE,
    preco_produto TEXT NOT NULL 
);


CREATE TABLE IF NOT EXISTS produto_cd (
    id_produto_cd INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto_cd TEXT NOT NULL,
    descricao_produto_cd TEXT NOT NULL UNIQUE,
    preco_produto_cd TEXT NOT NULL,
    imagem_produto_cd TEXT NOT NULL
);