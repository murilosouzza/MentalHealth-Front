const texto = `
A saúde mental é um aspecto fundamental para o bem-estar das pessoas, principalmente em um mundo cada vez mais acelerado 
e cheio de desafios.

Muitas pessoas já realizam acompanhamento psicológico, mas nem sempre conseguem registrar ou refletir sobre seus sentimentos no 
dia a dia entre uma sessão e outra.

Pensando nisso, foi idealizado um site de acompanhamento de saúde
mental voltado para pessoas que já estão em processo de terapia.  O aplicativo funcionará como um suporte diário, ajudando o usuário a
acompanhar seu humor, emoções e pensamentos por meio de perguntas simples respondidas todos os dias.
`;

let index = 0;
let intervalo;
let finalizado = false;

function escrever() {
  intervalo = setInterval(() => {
    if (index < texto.length) {
      document.getElementById("texto-digitando").innerHTML += texto.charAt(index);
      index++;
    } else {
      clearInterval(intervalo);
      finalizado = true;
      document.querySelector(".btn").classList.add("mostrar");
    }
  }, 25);
}

window.onload = escrever;

document.addEventListener("click", () => {
  if (!finalizado) {
    clearInterval(intervalo);
    document.getElementById("texto-digitando").innerHTML = texto;
    document.querySelector(".btn").classList.add("mostrar");
    finalizado = true;
  }
});
