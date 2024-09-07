const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para receber as informações do registro
app.post('/send-information', (req, res) => {
    const { nome, email, senha, conf_senha } = req.body;

    if (nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1) {
        return res.status(200).json({
            status: 'failed',
            message: 'Por favor, preencha todos os campos corretamente!'
        });
    } else if (senha !== conf_senha) {
        return res.status(200).json({
            status: 'failed',
            message: 'As senhas digitadas não são iguais'
        });
    } else {
        const db = new sqlite3.Database('./db/banco.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Conectou com o banco de dados!");
        });

        db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
            if (error) {
                console.log(error);
            } else if (result) {
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Fechou a conexão com o banco de dados.');
                });
                return res.status(200).json({
                    status: 'failed',
                    message: 'Este e-mail já está em uso!',
                });
            } else {
                let senha_criptografada = await bcrypt.hash(senha, 8);
                db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha_criptografada], (error2) => {
                    if (error2) {
                        console.log(error2);
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

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(200).json({
            status: 'failed',
            message: 'Por favor, preencha todos os campos corretamente!'
        });
    }

    const db = new sqlite3.Database('./db/banco.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Conectou com o banco de dados!");
    });

    db.get('SELECT * FROM usuario WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        } else if (!result) {
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Fechou a conexão com o banco de dados.');
            });
            return res.status(200).json({
                status: 'failed',
                message: 'Usuário não encontrado!',
            });
        } else {
            const senhaValida = await bcrypt.compare(senha, result.senha);
            if (!senhaValida) {
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Fechou a conexão com o banco de dados.');
                });
                return res.status(200).json({
                    status: 'failed',
                    message: 'Senha incorreta!',
                });
            } else {
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Fechou a conexão com o banco de dados.');
                });
                return res.status(200).json({
                    status: 'success',
                    message: 'Login realizado com sucesso!',
                });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
