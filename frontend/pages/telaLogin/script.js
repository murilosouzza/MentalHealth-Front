const URL_API = "https://localhost:7092/api/Auth/login";

const form = document.getElementById('formulario-login');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = {
        cpf: document.getElementById('campo-cpf').value,
        senha: document.getElementById('campo-senha').value,
        email: ""
    };

    fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(resposta => {
        if (!resposta.ok) {
            return resposta.json().then(err => { throw new Error(err.mensagem || "Erro ao logar") });
        }
        return resposta.json();
    })
    .then(resultado => {
        localStorage.setItem("usuarioId", resultado.usuarioId);
        localStorage.setItem("nomeUsuario", resultado.apelido);
        localStorage.setItem("fotoPerfil", resultado.fotoPerfil || "");

        alert(resultado.mensagem);
        window.location.href = resultado.proximaTela;
    })
    .catch(erro => {
        console.error("Erro detalhado:", erro);
        alert(erro.message);
    });
});