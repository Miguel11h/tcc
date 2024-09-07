const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.post('/send-information', (req, res) => {
    const {nome, email, senha, conf_senha} = req.body;
    // console.log(nome, email, senha, conf_senha);
    if(nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1){
        res.status(200).json({
            status: 'failed',
            message:'Por favor, preencha todos os campos corretamente!'
        })
    }
    else if(senha != conf_senha){
        res.status(200).json({
            status: 'failed',
            message:'As senhas digitadas não são iguais'
        })
    }
    else{
        const db = new sqlite3.Database('./db/banco.db', (err) => {
            if(err){
                return console.error(err.message);
            }
                console.log("Conectou com o banco de dados!");
        });
        db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
            if(error){
                console.log(error)
            }
            else if(result) {
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
            } else{
                let senha_criptografada = await bcrypt.hash(senha, 8)
                db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha_criptografada], (error2) => {
                    if(error2) {
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

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta 8080');
});
