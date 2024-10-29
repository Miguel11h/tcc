const dotenv = require('dotenv').config()
const { SECRET_ACCESS_TOKEN, NODE_ENV } = process.env;
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const e = require('express');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs")

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Habilita apenas URL do frontend svelte
  credentials: true, 
}));

app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function geraAcessoJWT(idUsuario) {
  let payload = {
    idUsuario: idUsuario
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '20m',
  });
};

function geraConexaoDeBancoDeDados() {
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });
  return db;
}

async function verificaToken(req, res, next) {  
  // se o token (variável SessionID) não estiver presente no cookie o usuário não está logado

  const token = req.cookies.SessionID;
  if (!token) {
    return res.status(401).json({ 
      status: 'failed', 
      message: 'Você não está logado!'
    });
  }

  console.log(`token: ${token}`);
  console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);
  jwt.verify(token, SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'Sessão expirada!',
      });
    } else {
      // o conteúdo decodificado do token é o id do usuário
      let { idUsuario} = decoded;
      console.log(`decoded: ${decoded}`);
      console.log(`idUsuario decoded: ${decoded.idUsuario}`);

      db = geraConexaoDeBancoDeDados();

      // recupera dados do usuário que está tentando fazer login
      db.get('SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ?', [idUsuario], async (error, result) => {
        if (error) {
          console.log(error)
        }
        else if (result) {
          const { id_usuario, nome, email } = result
          req.idUsuario = id_usuario
          req.email = email
          req.nome = nome

          db.close((err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log('Fechou a conexão com o banco de dados.')
          });

          next();
        }
      });
    }   
  });
  

}

app.get('/usuarios', verificaToken, (req, res) => {
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });

  // Seleciona todos os usuários da tabela 'usuario'
  db.all('SELECT * FROM usuario', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retorna os dados dos usuários em formato JSON
    res.status(200).json({
      status: 'success',
      usuarios: rows
    });
  });
});

app.post('/usuarios/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({
      status: 'failed',
      message: 'Por favor, preencha todos os campos!',
    });
  }

  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao conectar ao banco de dados!',
        error: err.message
      });
    }
    console.log('Conectou no banco de dados!');
  });

  db.get('SELECT * FROM usuario WHERE email = ?', [email], async (err, usuario) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    if (!usuario) {
      return res.status(400).json({
        status: 'failed',
        message: 'Usuário não encontrado!',
      });
    }
    let idUsuario = usuario.id_usuario;
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({
        status: 'failed',
        message: 'Login ou senha incorretos!',
      });
    }

    let options = {
      maxAge: 20 * 60 * 1000, // minutos * segundos * milissegundos = total 20 minutos
      httpOnly: true, // restringe acesso de js ao cookie
      secure: NODE_ENV === 'production' ? true : false, // secure ativado de acordo com ambiente (desenvolvimento/produção) para uso do https
      sameSite: "Lax", // habilita compartilhamento de cookie entre páginas
    };

    console.log(`secure: ${options.secure}`);

    const token = geraAcessoJWT(idUsuario); // gera um token de sessão para o usuário

    console.log(`Usuário ${email} logado com sucesso!\nToken: ${token}`);      

    // após realizar login, vá nas ferramentas do desenvolvedor do navegador, na aba Application, em Cookies, e veja o cookie SessionID
    res.cookie("SessionID", token, options); // preenche o token na resposta para ser utilizado pelo cliente nas próximas requisições
      res.status(200).json({
          status: "success",
          message: "Autenticação realizada com sucesso!",
          usuario: {
            id: usuario.id_usuario,
            nome: usuario.nome,
            email: usuario.email
          }
      });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });
  });
});

app.post('/usuarios/novo', (req, res) => {
  const { nome, email, senha, conf_senha } = req.body;
  console.log(req);
  let erro = "";
  if (nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1) {
    erro += 'Por favor, preencha todos os campos corretamente!';
  }
  if (senha != conf_senha) {
    erro += 'As senhas digitadas não são iguais!';
  }
  if (erro) {
    res.status(500).json({
      status: 'failed',
      message: erro,
    });
  }
  else {
    let db = new sqlite3.Database('./users.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou no banco de dados!');
    });
    db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error)
      }
      else if (result) {
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Fechou a conexão com o banco de dados.');
        });
        return res.status(500).json({
          status: 'failed',
          message: 'Este e-mail já está em uso!',
        });
      } else {
        let senha_criptografada = await bcrypt.hash(senha, 8)
        db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome,
          email, senha_criptografada], (error2) => {
            if (error2) {
              console.log(error2)
            } else {
              db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log('Fechou a conexão com o banco de dados.');
              });
              return res.status(200).json({
                status: 'success',
                message: 'Registro feito com sucesso!',
                campos: req.body
              });
            }
          });
      }
    });
  }
});



app.delete('/usuarios/:id_usuario', verificaToken , (req, res) => {
  const { id_usuario } = req.params;

  // Conectar ao banco de dados SQLite
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao conectar ao banco de dados!',
        error: err.message
      });
    }
    console.log('Conectou no banco de dados!');
  });

  // Deletar o usuário pelo ID
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao tentar remover o usuário ${id_usuario}!',
        error: err.message
      });
    }
    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Usuário com id ${id_usuario} removido com sucesso!`
    });
  });
});

app.post('/logout', (req, res) => {
  // Limpa o cookie "SessionID" 
  res.clearCookie("SessionID");

  // Retorna uma resposta de sucesso
  res.status(200).json({
    status: 'success',
    message: 'Logout realizado com sucesso!'
  });
});

app.get('/usuarios/me', verificaToken, (req, res) => {
  // recupera dados do usuário logado
  const usuarioLogado = {
    idUsuario: req.idUsuario,
    nome: req.nome,
    email: req.email
  }
  // Retorna os dados do usuário em formato JSON
  res.status(200).json({
      status: 'success',
      usuario: usuarioLogado // Retorna todos os dados do usuário
  });
});

app.post('/usuarios/nome', (req, res) => {
  const { id_usuario, nome } = req.body;
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE usuario SET nome = ? WHERE id_usuario = ?', [nome, id_usuario], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar o nome!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Nome atualizado com sucesso!' });
  });

  db.close();
});

app.post('/usuarios/senha', async (req, res) => {
  const { id_usuario, senha } = req.body;
  const senha_criptografada = await bcrypt.hash(senha, 8);

  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE usuario SET senha = ? WHERE id_usuario = ?', [senha_criptografada, id_usuario], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar a senha!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Senha atualizada com sucesso!' });
  });

  db.close();
});

app.post('/produtos/novo', (req, res) => {
  const { nome, descricao, preco, imagem} = req.body;

  const db = geraConexaoDeBancoDeDados();
  db.run(
    'INSERT INTO produto(nome_produto, descricao_produto, preco_produto, imagem_produto) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco, imagem],
    (err) => {
      if (err) {
        return res.status(500).json({ status: 'failed', message: 'Erro ao adicionar o produto', error: err.message });
      }
      res.status(200).json({ status: 'success', message: 'Produto adicionado com sucesso!' });
    }
  );
  db.close();
});

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  const db = geraConexaoDeBancoDeDados();
  db.all('SELECT * FROM produto', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao buscar produtos', error: err.message });
    }
    res.status(200).json({ status: 'success', produtos: rows });
  });
  db.close();
});

app.post('/produtos/nome', (req, res) => {
  const { id_produto, nome } = req.body;
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE produto SET nome_produto = ? WHERE id_produto = ?', [nome, id_produto], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar o nome!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Nome atualizado com sucesso!' });
  });

  db.close();
});

app.post('/produtos/descricao', (req, res) => {
  const { id_produto, descricao } = req.body;
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE produto SET descricao_produto = ? WHERE id_produto = ?', [descricao, id_produto], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar a descrição!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Descrição atualizada com sucesso!' });
  });

  db.close();
});

app.post('/produtos/preco', (req, res) => {
  const { id_produto, preco } = req.body;
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE produto SET preco_produto = ? WHERE id_produto = ?', [preco, id_produto], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar o preço!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Preço atualizado com sucesso!' });
  });

  db.close();
});

app.post('/produtos/imagem', (req, res) => {
  const { id_produto, imagem } = req.body;
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao conectar ao banco de dados!', error: err.message });
    }
  });

  db.run('UPDATE produto SET imagem_produto = ? WHERE id_produto = ?', [imagem, id_produto], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar a imagem!', error: err.message });
    }

    res.status(200).json({ status: 'success', message: 'Imagem atualizada com sucesso!' });
  });

  db.close();
});

// Rota para atualizar um produto por ID
app.put('/produtos/:id_produto', (req, res) => {
  const { id_produto } = req.params;
  const { nome_produto, descricao_produto, preco_produto } = req.body;

  const db = geraConexaoDeBancoDeDados();
  db.run(
    'UPDATE produto SET nome_produto = ?, descricao_produto = ?, preco_produto = ? WHERE id_produto = ?',
    [nome_produto, descricao_produto, preco_produto, id_produto],
    function (err) {
      if (err) {
        return res.status(500).json({ status: 'failed', message: 'Erro ao atualizar o produto', error: err.message });
      }
      res.status(200).json({ status: 'success', message: 'Produto atualizado com sucesso!' });
    }
  );
  db.close();
});

// Rota para excluir um produto por ID
app.delete('/produtos/:id_produto', (req, res) => {
  const { id_produto } = req.params;

  const db = geraConexaoDeBancoDeDados();
  db.run('DELETE FROM produto WHERE id_produto = ?', [id_produto], function (err) {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'Erro ao excluir o produto', error: err.message });
    }
    res.status(200).json({ status: 'success', message: 'Produto excluído com sucesso!' });
  });
  db.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

