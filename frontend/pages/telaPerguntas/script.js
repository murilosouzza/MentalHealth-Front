const URL_API = "https://localhost:7092/api/Pesquisa";

const opcoes = document.querySelectorAll(".opcao");

opcoes.forEach(opcao => {
  opcao.addEventListener("click", () => {
    const grupo = opcao.parentElement;
    grupo.querySelectorAll(".opcao").forEach(el => el.classList.remove("selecionado"));
    opcao.classList.add("selecionado");
  });
});

document.getElementById("btnEnviar").addEventListener("click", async () => {
  const grupos = document.querySelectorAll("[data-pergunta]");
  const respostas = {};
  let tudoRespondido = true;

  grupos.forEach(grupo => {
    const selecionado = grupo.querySelector(".selecionado");
    if (!selecionado) {
      tudoRespondido = false;
    } else {
      respostas[grupo.getAttribute("data-pergunta")] = selecionado.innerText;
    }
  });

  if (!tudoRespondido) {
    alert("Responda todas as perguntas antes de enviar!");
    return;
  }

  const relato = document.getElementById("campoTexto").value;
  const usuarioId = localStorage.getItem("usuarioId");

  const dados = {
    usuarioId: parseInt(usuarioId) || 0,
    qualidadeSono: parseInt(respostas["sono"]) || 0,
    medicacao: respostas["medicacao"] || "",
    disposicao: parseInt(respostas["disposicao"]) || 0,
    ansiedade: respostas["ansiedade"] || "",
    relato: relato
  };

  try {
    const resposta = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      // Salva localmente também
      localStorage.setItem("respostas", JSON.stringify(dados));

      const notif = document.getElementById("notificacao");
      notif.classList.add("mostrar");

      setTimeout(() => {
        notif.classList.remove("mostrar");
        window.location.href = "../telaHome/index.html";
      }, 2000);
    } else {
      alert("Erro ao enviar: " + resultado.mensagem);
    }
  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar com o servidor.");
  }
});