const URL_API = "https://localhost:7092/api/Auth/cadastro";

document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const dados = {
        nome: document.getElementById("campo-nome").value,
        cpf: document.getElementById("campo-cpf").value,
        email: document.getElementById("campo-email").value,
        senha: document.getElementById("campo-senha").value,
        senhaGrafico: document.getElementById("campo-senha-grafico").value,
        fotoPerfil: document.getElementById("campo-foto").value || null
    };

    if (!dados.nome || !dados.cpf || !dados.email || !dados.senha || !dados.senhaGrafico) {
        alert("Preencha todos os campos obrigatórios!");
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
            alert("Paciente cadastrado com sucesso!");
            // Limpa os campos
            document.getElementById("campo-nome").value = "";
            document.getElementById("campo-cpf").value = "";
            document.getElementById("campo-email").value = "";
            document.getElementById("campo-senha").value = "";
            document.getElementById("campo-senha-grafico").value = "";
            document.getElementById("campo-foto").value = "";
        } else {
            alert(resultado.mensagem);
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});