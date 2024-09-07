const form = document.querySelector('.form_exemplo');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const conf_senha = document.getElementById('conf_senha');
const messageElement = document.getElementById('message');


const isLoginPage = !nome;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = isLoginPage
        ? { email: email.value, senha: senha.value }
        : { nome: nome.value, email: email.value, senha: senha.value, conf_senha: conf_senha.value };

    try {
        const endpoint = isLoginPage ? '/login' : '/send-information';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        messageElement.innerHTML = result.message;

        if (result.status === 'success') {
            email.value = '';
            senha.value = '';
            window.location.href = '/index.html';
            if (!isLoginPage) {
                nome.value = '';
                conf_senha.value = '';
            }
        }

    } catch (error) {
        console.log('Error: ', error);
    }
});
