# Avaliação Física — Grazielle Martins

Site para avaliação física comparativa de alunas, desenvolvido para o **Studio Grazielle Martins — Treino Personalizado para Mulheres**.

Preencha os dados da aluna e até **6 avaliações** ao longo do tempo, acompanhe o relatório técnico completo na tela, visualize a evolução em um modelo 3D e exporte tudo em PDF, JPG ou TXT — sem precisar de servidor, banco de dados ou instalação.

## ✨ Funcionalidades

- **Tela de boas-vindas** com a logo do studio e botão para iniciar a avaliação.
- **Formulário em abas**: Aluno → 1ª → 2ª → 3ª → 4ª → 5ª → 6ª Avaliação → Relatório → Corpo em 3D → Dados (JSON).
- **Botão "Puxar dados"** em cada avaliação, que copia as medidas de uma aba vizinha em ciclo (1ª ← 2ª ← 3ª ← 4ª ← 5ª ← 6ª ← 1ª), agilizando o preenchimento quando os valores mudam pouco entre avaliações.
- **Objetivos em checkbox**, com 15 opções pré-definidas (emagrecer, ganhar massa, tonificar, melhorar condicionamento, etc.), múltipla escolha.
- **Relatório técnico automático**, gerado em tempo real conforme os campos são preenchidos, comparando sempre a primeira e a última avaliação preenchida (mesmo que alguma fique em branco no meio):
  - Situação atual (IMC, RCQ, % de gordura, massa gorda e massa magra);
  - Tabela comparativa com uma coluna por avaliação preenchida (2 a 6) e a variação total;
  - **Gráficos de histórico** de peso e de percentual de gordura, com um ponto por avaliação;
  - Interpretação técnica em linguagem profissional;
  - Pontos positivos e pontos de atenção;
  - Estimativa de evolução (ritmo mensal e prazo estimado para metas);
  - Nota geral de evolução (0–10) com barras de progresso;
  - Recomendações individualizadas;
  - Observações importantes e aviso de caráter informativo.
- **Modelo 3D interativo** (three.js), com um boneco proporcional por avaliação — veja isoladamente ou compare até 6 figuras lado a lado, em gradiente de cor prata → roxo. Arraste para girar, role para aproximar. Figuras femininas exibem cabelo estilizado.
- **Exportação em PDF** (A4, multi-página automática) e **JPG** de alta resolução, incluindo os gráficos, prontos para enviar à aluna.
- **Salvar e carregar dados em .txt** — permite guardar o histórico da aluna e reabrir depois para lançar a próxima avaliação.
- **Identidade visual do studio**: paleta preto/prata/roxo, tipografia elegante, logo embutida.
- Responsivo (funciona em celular, tablet e desktop).

## 🧮 Cálculos utilizados

| Indicador | Método |
|---|---|
| IMC | peso ÷ altura² |
| RCQ | cintura ÷ quadril, com faixas de risco separadas por sexo |
| % de gordura corporal | Método da Marinha dos EUA (fórmula métrica), a partir de pescoço, cintura, quadril (mulheres) e altura |
| Massa gorda / massa magra | Derivadas do peso e do % de gordura |
| Risco cardiometabólico | Circunferência de cintura, com pontos de corte por sexo |

Todos os cálculos são feitos localmente, no navegador — nenhum dado é enviado a servidores externos.

## 🛠️ Tecnologias

- HTML, CSS e JavaScript puros (sem framework, sem build).
- [three.js](https://threejs.org/) (r128) — modelo 3D.
- [html2canvas](https://html2canvas.hertzen.com/) — captura da ficha para imagem.
- [jsPDF](https://github.com/parallax/jsPDF) — geração do PDF.
- Google Fonts (Archivo, Inter, Cormorant Garamond).

Todas as bibliotecas são carregadas via CDN; o restante do site é um único arquivo autocontido.

## 📂 Estrutura do projeto

```
avaliacaofisicapersonalgraziellemartins/
├── index.html      # site completo (HTML + CSS + JS em um único arquivo)
└── README.md        # este arquivo
```

## 🚀 Como usar

### Localmente
Basta abrir o `index.html` em qualquer navegador — não precisa de servidor.

### Publicado no GitHub Pages
Acesse: `https://labiel1jr.github.io/avaliacaofisicapersonalgraziellemartins/`

### Publicar/atualizar (GitHub Pages)
1. Faça upload do `index.html` para a raiz do repositório (substituindo o existente, se houver).
2. Em **Settings → Pages**, configure *Source* como **Deploy from a branch**, branch **main**, pasta **/ (root)**.
3. Aguarde 1–3 minutos — o link é atualizado automaticamente a cada novo commit.

## 💾 Onde ficam os dados

- Os dados preenchidos ficam salvos automaticamente no **localStorage** do navegador (só naquele dispositivo/navegador).
- Para levar os dados de uma aluna para outro computador, ou guardar um histórico permanente, use o botão **Salvar dados (.txt)** e depois **Carregar .txt** quando quiser continuar.
- Nenhum dado é enviado para servidores — tudo roda no navegador de quem está usando o site.

## 🎨 Personalização

- **Logo e cores**: a logo está embutida como imagem no próprio `index.html`; as cores da marca (preto, prata, roxo) estão centralizadas nas variáveis CSS no início do arquivo (`:root { --accent, --paper, --ink... }`).
- **Lista de objetivos**: editável na constante `OBJETIVOS`, no bloco `<script>`.
- **Textos da tela de boas-vindas**: no `<div id="welcome">`, no início do `<body>`.

## ⚠️ Aviso

Este site é uma ferramenta de apoio à avaliação física. As análises são baseadas exclusivamente nas medidas informadas e têm caráter informativo — a interpretação clínica e o planejamento de treino ou nutrição devem ser feitos por um profissional habilitado.

---

Desenvolvido para o **Studio Grazielle Martins**.
