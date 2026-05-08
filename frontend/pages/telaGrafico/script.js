const URL_API = "https://localhost:7092/api/Pesquisa";
let grafico;

async function carregarDados() {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
        criarGrafico([6, 7, 4, 5, 6]); // dados padrão se não tiver usuário
        return;
    }

    try {
        const resposta = await fetch(`${URL_API}/${usuarioId}`);
        const pesquisas = await resposta.json();

        if (pesquisas.length === 0) {
            criarGrafico([6, 7, 4, 5, 6]);
            return;
        }

        // Calcula médias dos últimos 30 dias
        const media = (campo) => {
            const valores = pesquisas.map(p => p[campo]).filter(v => typeof v === 'number');
            return valores.length > 0
                ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
                : 5;
        };

        // Mapeia medicação e ansiedade (Sim/Não) para números
        const mapearSimNao = (campo) => {
            const valores = pesquisas.map(p => p[campo]);
            const sim = valores.filter(v => v && v.includes("Sim")).length;
            return Math.round((sim / valores.length) * 10);
        };

        const dados = [
            10 - media('qualidadeSono'),   // Ansiedade (invertido)
            mapearSimNao('ansiedade'),      // Estresse
            media('qualidadeSono'),        // Sono
            media('disposicao'),           // Humor
            10 - mapearSimNao('ansiedade') // Foco
        ];

        criarGrafico(dados);

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        criarGrafico([6, 7, 4, 5, 6]);
    }
}

function criarGrafico(dados) {
    const ctx = document.getElementById('grafico');
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Ansiedade', 'Estresse', 'Sono', 'Humor', 'Foco'],
            datasets: [{
                label: 'Nível atual',
                data: dados,
                backgroundColor: 'rgba(231, 185, 179, 0.6)',
                borderColor: '#c97f7a',
                borderWidth: 3,
                pointBackgroundColor: '#4b3f5c',
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        backdropColor: "transparent",
                        color: "#4b3f5c",
                        font: { size: 12 }
                    },
                    grid: { color: "rgba(75,63,92,0.35)" },
                    angleLines: { color: "rgba(75,63,92,0.35)" },
                    pointLabels: {
                        color: "#4b3f5c",
                        font: { size: 14, weight: "bold" }
                    }
                }
            }
        }
    });
}

function gerarNovo() {
    carregarDados();
}

// Inicializa
carregarDados();