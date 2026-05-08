// NOME DO USUÁRIO
const nome = localStorage.getItem("nomeUsuario") || "Fulana";
document.getElementById("nomeUsuario").textContent = nome;

// FOTO DE PERFIL
const foto = localStorage.getItem("fotoPerfil");
const avatar = document.querySelector(".avatar");
if (foto) {
    avatar.style.backgroundImage = `url('${foto}')`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center";
}

// CALENDÁRIO DINÂMICO
const hoje = new Date();
const diaSemana = hoje.getDay();

const diasParaSeg = diaSemana === 0 ? 6 : diaSemana - 1;
const seg = new Date(hoje);
seg.setDate(hoje.getDate() - diasParaSeg);

const ids = ["cal-seg", "cal-ter", "cal-qua", "cal-qui", "cal-sex", "cal-sab", "cal-dom"];

ids.forEach((id, i) => {
    const dia = new Date(seg);
    dia.setDate(seg.getDate() + i);
    const el = document.getElementById(id);
    if (el) {
        el.querySelector(".numero").textContent = dia.getDate();
    }
});

document.querySelectorAll(".dia").forEach(d => d.classList.remove("ativo"));
const idHoje = ids[diasParaSeg === 6 ? 6 : diaSemana - 1];
if (document.getElementById(idHoje)) {
    document.getElementById(idHoje).classList.add("ativo");
}

// MENSAGEM ALEATÓRIA DO DIA
const mensagens = [
    "💜 Cuidar da sua mente é um ato de amor próprio.",
    "🌤️ Cada dia é uma nova chance de recomeçar.",
    "🌱 Pequenos passos também são progresso.",
    "✨ Você não precisa estar bem o tempo todo. Isso é humano.",
    "🫶 Sua jornada importa. Continue.",
    "🌈 Sentir é parte de ser. Acolha seus sentimentos.",
    "🕊️ Respire fundo. Você está fazendo o melhor que pode."
];

const indiceAleatorio = Math.floor(Math.random() * mensagens.length);
document.getElementById("mensagem-dia").textContent = mensagens[indiceAleatorio];