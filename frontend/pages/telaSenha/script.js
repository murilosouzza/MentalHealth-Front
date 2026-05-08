const URL_API = "https://localhost:7092/api/Auth/verificarSenhaGrafico";

const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

toggleSenha.addEventListener("click", () => {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
});

async function acessar() {
    const senha = senhaInput.value;

    if (senha === "") {
        alert("Digite a senha!");
        return;
    }

    const usuarioId = localStorage.getItem("usuarioId");

    try {
        const resposta = await fetch(URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuarioId: parseInt(usuarioId),
                senha: senha
            })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            window.location.href = "../telaGrafico/index.html";
        } else {
            alert(resultado.mensagem);
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
}