const URL_API = "https://localhost:7092/api/Avaliacao";

function selecionar(btn, humor) {
  document.querySelectorAll(".opcao").forEach(el => el.classList.remove("selecionado"));
  btn.classList.add("selecionado");

  if (humor === "Preciso de ajuda") {
    document.getElementById("notif-ajuda").style.display = "block";
    return;
  }

  // Salva localmente
  localStorage.setItem("humorHoje", humor);
  localStorage.setItem("humorData", new Date().toLocaleDateString("pt-br"));

  // Envia pra API
  const usuarioId = localStorage.getItem("usuarioId");

  if (usuarioId) {
    fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuarioId: parseInt(usuarioId),
        humor: humor
      })
    })
    .then(res => res.json())
    .then(data => console.log("Avaliação salva:", data))
    .catch(err => console.error("Erro:", err));
  }

  // Redireciona após 600ms
  setTimeout(() => {
    window.location.href = "../telaHome/index.html";
  }, 600);
}

function fecharNotif() {
  document.getElementById("notif-ajuda").style.display = "none";
  document.querySelectorAll(".opcao").forEach(el => el.classList.remove("selecionado"));
}