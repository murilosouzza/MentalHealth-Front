document.getElementById("btn-continuar").addEventListener("click", () => {
  const nome = document.getElementById("campo-nome").value.trim();

  if (!nome) {
    alert("Digite seu nome ou apelido!");
    return;
  }

  localStorage.setItem("nomeUsuario", nome);
  window.location.href = "../telaHome/index.html";
});
