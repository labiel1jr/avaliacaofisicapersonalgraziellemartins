# Avaliação Física — Grazielle Martins

Site para avaliação física comparativa de alunas, desenvolvido para o **Studio Grazielle Martins — Treino Personalizado para Mulheres**.

Preencha os dados da aluna e até **6 avaliações** ao longo do tempo, acompanhe o relatório técnico completo na tela, visualize a evolução em um modelo 3D e exporte tudo em PDF, JPG ou TXT — sem precisar de servidor, banco de dados ou instalação.

## ✨ Funcionalidades

- **Tela de boas-vindas** com a logo do studio e botão para iniciar a avaliação.
- **Formulário em abas**: Aluno → Anamnese → 1ª → 2ª → 3ª → 4ª → 5ª → 6ª Avaliação → Relatório → Corpo em 3D → Dados (JSON).
- **Data de nascimento com cálculo automático da idade** (em anos completos, atualizada a cada abertura do site). Sem a data, a idade pode ser digitada manualmente.
- **Anamnese com foco em Educação Física**:
  - **PAR-Q** (Questionário de Prontidão para Atividade Física) com as 7 perguntas — respostas "Sim" ficam destacadas;
  - Histórico de saúde: condições diagnosticadas (checkbox), medicamentos, cirurgias, lesões/dores, restrições médicas, histórico familiar, PA e FC de repouso;
  - Atividade física: nível atual, modalidades, frequência, duração, tempo de prática/parado, experiência com musculação e histórico esportivo;
  - Hábitos de vida: sono, tabagismo, álcool, alimentação, acompanhamento nutricional, hidratação, estresse e rotina de trabalho;
  - Disponibilidade e preferências: dias e tempo por sessão, horário, local de treino, atividades preferidas e evitadas, observações.
- **Medidas por avaliação**: peso, circunferências, **dobras cutâneas** (tricipital, subescapular, suprailíaca, abdominal e coxa, em mm) e **diâmetros ósseos** (punho biestiloide e fêmur biepicondiliano, em cm).
- **Botão "Puxar dados"** em cada avaliação, que copia as medidas de uma aba vizinha em ciclo (1ª ← 2ª ← 3ª ← 4ª ← 5ª ← 6ª ← 1ª), agilizando o preenchimento quando os valores mudam pouco entre avaliações.
- **Objetivos em checkbox**, com 15 opções pré-definidas (emagrecer, ganhar massa, tonificar, melhorar condicionamento, etc.), múltipla escolha.
- **Relatório técnico automático**, gerado em tempo real conforme os campos são preenchidos, comparando sempre a primeira e a última avaliação preenchida (mesmo que alguma fique em branco no meio):
  - Resumo da anamnese, com o status do PAR-Q (positivo → recomendação de liberação médica; negativo; incompleto);
  - Situação atual (IMC, RCQ, % de gordura, massa gorda e massa magra);
  - **Composição corporal (dobras cutâneas · Carnaval)**: gráfico de rosca da avaliação atual em 4 componentes (massa gorda, muscular, óssea e residual, em kg e %) e barras empilhadas comparando as avaliações. Sem dobras/diâmetros, o gráfico mostra massa gorda × massa magra e indica quais medidas faltam;
  - Tabela comparativa com uma coluna por avaliação preenchida (2 a 6) e a variação total, incluindo dobras, diâmetros e massas muscular, óssea e residual;
  - **Gráficos de histórico** de peso e de percentual de gordura, com um ponto por avaliação;
  - Interpretação técnica em linguagem profissional;
  - Pontos positivos e pontos de atenção;
  - Estimativa de evolução (ritmo mensal e prazo estimado para metas);
  - Nota geral de evolução (0–10) com barras de progresso;
  - Recomendações individualizadas;
  - Observações importantes e aviso de caráter informativo.
- **Modelo 3D interativo** (three.js), com um boneco proporcional por avaliação — veja isoladamente ou compare até 6 figuras lado a lado, cada avaliação com sua cor (1ª vermelha, 2ª laranja, 3ª roxa, 4ª amarela, 5ª azul, 6ª verde). Arraste para girar, role para aproximar. Figuras femininas exibem cabelo estilizado.
- **Exportação em PDF** (A4, multi-página automática) e **JPG** de alta resolução, incluindo os gráficos, prontos para enviar à aluna.
- **Salvar e carregar dados em .txt** — permite guardar o histórico da aluna e reabrir depois para lançar a próxima avaliação.
- **Identidade visual do studio**: paleta preto/prata/roxo, tipografia elegante, logo embutida.
- Responsivo (funciona em celular, tablet e desktop).

## 🧮 Cálculos utilizados

| Indicador | Método |
|---|---|
| IMC | peso ÷ altura² |
| RCQ | cintura ÷ quadril, com faixas de risco separadas por sexo |
| % de gordura corporal | Por prioridade: (1) **Jackson, Pollock & Ward (1980), 3 dobras para mulheres** (tricipital + suprailíaca + coxa), D = 1,0994921 − 0,0009929·S + 0,0000023·S² − 0,0001392·idade, convertida por **Siri (1961)**: %G = 495/D − 450, com a idade na data da avaliação; (2) **Faulkner (1968)**: %G = 0,153 × (TR + SE + SI + AB) + 5,783, quando as 4 dobras estão preenchidas (para mulheres o relatório avisa que tende a subestimar); (3) método da Marinha dos EUA (fórmula métrica). O relatório avisa quando avaliações comparadas usaram métodos diferentes |
| Massa gorda / massa magra | Derivadas do peso e do % de gordura |
| Massa óssea | Von Döbeln modificada por Rocha (1975): MO = 3,02 × (H² × R × F × 400)^0,712 — H = estatura, R = diâmetro biestiloide, F = diâmetro biepicondiliano do fêmur (em metros) |
| Massa residual | Würch (1974): 24,1% do peso (homens) ou 20,9% (mulheres) |
| Massa muscular | Matiegka: peso − (massa gorda + óssea + residual) — fracionamento em 4 componentes conforme Carnaval (2000) |
| Idade | Anos completos entre a data de nascimento e a data atual |
| Risco cardiometabólico | Circunferência de cintura, com pontos de corte por sexo |

Todos os cálculos são feitos localmente, no navegador — nenhum dado é enviado a servidores externos.

## 🛠️ Tecnologias

- HTML, CSS e JavaScript puros (sem framework, sem build).
- [three.js](https://threejs.org/) (r128) — modelo 3D.
- [html2canvas](https://html2canvas.hertzen.com/) — captura da ficha para imagem.
- [jsPDF](https://github.com/parallax/jsPDF) — geração do PDF.
- Google Fonts (Archivo, Inter, Cormorant Garamond).

As bibliotecas ficam no próprio repositório (`js/vendor/`), então o site não depende de CDN e funciona offline (só as fontes vêm do Google Fonts, com fonte de reserva do sistema).

## 📂 Estrutura do projeto

```
avaliacaofisicapersonalgraziellemartins/
├── index.html              # estrutura da página
├── css/style.css           # estilos (cores da marca nas variáveis :root)
├── js/
│   ├── app.js              # lógica: cálculos, relatório, 3D, exportação
│   └── vendor/             # three.js r128, html2canvas 1.4.1, jsPDF 2.5.1
├── favicon.ico             # ícone da aba do navegador
├── img/
│   ├── logo.webp           # logo do studio
│   ├── favicon-32.png      # favicon em PNG
│   ├── apple-touch-icon.png # ícone para a tela inicial do iPhone/iPad
│   └── og-image.jpg        # imagem de preview ao compartilhar (1200×630)
└── README.md               # este arquivo
```

## 🚀 Como usar

### Localmente
Basta abrir o `index.html` em qualquer navegador — não precisa de servidor.

### Publicado no GitHub Pages
Acesse: `https://labiel1jr.github.io/avaliacaofisicapersonalgraziellemartins/`

### Publicar/atualizar (GitHub Pages)
1. Envie todos os arquivos e pastas (`index.html`, `css/`, `js/`, `img/`, `favicon.ico`) para a raiz do repositório.
2. Em **Settings → Pages**, configure *Source* como **Deploy from a branch**, branch **main**, pasta **/ (root)**.
3. Aguarde 1–3 minutos — o link é atualizado automaticamente a cada novo commit.

## 💾 Onde ficam os dados

- Os dados preenchidos ficam salvos automaticamente no **localStorage** do navegador (só naquele dispositivo/navegador).
- Para levar os dados de uma aluna para outro computador, ou guardar um histórico permanente, use o botão **Salvar dados (.txt)** e depois **Carregar .txt** quando quiser continuar. O arquivo inclui a anamnese, a data de nascimento e todas as medidas; arquivos salvos em versões anteriores continuam abrindo normalmente (os campos novos ficam em branco).
- Enquanto houver alterações que não estão em nenhum .txt salvo ou carregado, o site mostra o aviso **"Dados ainda não salvos em arquivo"** com um botão para salvar, e o navegador pede confirmação ao fechar a aba.
- Nenhum dado é enviado para servidores — tudo roda no navegador de quem está usando o site.

## 🎨 Personalização

- **Logo e cores**: a logo fica em `img/logo.webp`; as cores da marca (preto, prata, roxo) estão centralizadas nas variáveis CSS no início de `css/style.css` (`:root { --accent, --paper, --ink... }`).
- **Lista de objetivos**: editável na constante `OBJETIVOS`, em `js/app.js`.
- **Anamnese**: perguntas do PAR-Q na constante `PARQ`, condições de saúde em `CONDICOES` e demais campos (por seção) em `ANAM_SECTIONS`.
- **Medidas das avaliações** (circunferências, dobras e diâmetros): constante `MEASURES`.
- **Cores do gráfico de composição corporal**: variáveis CSS `--cc-gord`, `--cc-musc`, `--cc-osso` e `--cc-resid` (tela e exportação).
- **Textos da tela de boas-vindas**: no `<div id="welcome">`, no início do `<body>`.

## ⚠️ Aviso

Este site é uma ferramenta de apoio à avaliação física. As análises são baseadas exclusivamente nas medidas informadas e têm caráter informativo — a interpretação clínica e o planejamento de treino ou nutrição devem ser feitos por um profissional habilitado.

---

Desenvolvido para o **Studio Grazielle Martins**.
