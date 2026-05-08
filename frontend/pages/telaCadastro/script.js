const URL_API = "https://localhost:7092/api/Auth/cadastro";

document.getElementById("botao-cadastrar").addEventListener("click", async () => {
    const dados = {
        nome: document.getElementById("campo-nome").value,
        email: document.getElementById("campo-email").value,
        cpf: document.getElementById("campo-cpf").value,
        senha: document.getElementById("campo-senha").value
    };

    if (!dados.nome || !dados.email || !dados.cpf || !dados.senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(resultado.mensagem);
            window.location.href = "../telaLogin/index.html";
        } else {
            alert(resultado.mensagem);
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});