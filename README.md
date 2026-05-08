# Mental Health - Frontend

## Estrutura do Projeto

```
frontend/
├── index.html                  ← Entrada (redireciona pra telaInicial)
├── assets/
│   ├── images/                 ← Coloque aqui: psicologia.png
│   └── icons/                  ← Coloque aqui: login-icon.png
└── pages/
    ├── telaInicial/            ← Landing page com texto animado
    ├── telaLogin/              ← Login com CPF e senha (conecta à API)
    ├── telaNome/               ← Coleta nome/apelido do usuário
    ├── telaHome/               ← Home com calendário e cards
    ├── telaChecagem/           ← Checagem de humor diária
    ├── telaPerguntas/          ← Relatório diário (5 perguntas)
    ├── telaGrafico/            ← Mapa de humor (gráfico radar)
    └── telaSenha/              ← Tela de privacidade/senha
```

## Fluxo de Navegação

telaInicial → telaLogin → telaNome → telaHome
                                        ├── telaChecagem → telaHome
                                        ├── telaPerguntas → telaHome
                                        └── telaSenha → telaGrafico

## Imagens necessárias

Adicione as imagens nas pastas corretas:
- `assets/images/psicologia.png` — ícone de saúde mental da tela inicial
- `assets/icons/login-icon.png` — ícone de usuário da tela de login

## API

A telaLogin faz POST para: `https://localhost:7205/api/Auth/login`
Configure a URL no arquivo `pages/telaLogin/script.js` se necessário.

## localStorage utilizado

| Chave        | Descrição                        |
|--------------|----------------------------------|
| nomeUsuario  | Nome/apelido escolhido pelo user |
| humorHoje    | Humor selecionado na checagem    |
| humorData    | Data da última checagem          |
| respostas    | Respostas do relatório diário    |
