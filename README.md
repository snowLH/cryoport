# ❄️ Cryo Portfolio • Henry (@snowLH)

> Portfólio pessoal e apresentação futurista no estilo **Bento Grid** com estética **Cryo / Glassmorphism Dark Mode**.

![React](https://img.shields.io/badge/React-19-cyan?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-blue?style=for-the-badge&logo=framer)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages_/_Vercel-success?style=for-the-badge)

---

## ✨ Funcionalidades e Design

- **Estética Cryo & Dark Extremo**: Paleta `zinc-950` com reflexos de gelo, orbes de aurora boreal animados e partículas sutis.
- **Glassmorphism**: Efeito de vidro fosco com `backdrop-blur-xl`, bordas translúcidas de gelo e highlights internos.
- **Animações Fluidas**: Transições de entrada escalonadas (`staggerChildren`) e micro-interações de hover com **Framer Motion**.
- **Bento Grid Responsivo**: Adapta-se perfeitamente de 1 coluna em telas mobile a 3 ou 4 colunas em desktops.
- **Widgets Integrados**:
  - 👤 **Sobre Mim**: Bio completa, anel de gelo neon, status ativo e tags de stack.
  - ⚡ **CryoHive (Destaque)**: Projeto principal com glow neon ciano e descrição de alto impacto.
  - 🎵 **Spotify Widget**: Status "Ouvindo agora..." com equalizador animado, faixas destacadas (*Roller Mobster* e *Cena 0*) e link direto.
  - 🐙 **GitHub Widget**: Métricas de repositórios, streak e mini-heatmap de contribuições interativo.
  - 📱 **Cartões 1x1 & Contato**: Discord, Instagram, E-mail (com botão de cópia rápida e Toast de notificação) e Status Cryo com relógio em tempo real.

---

## 🚀 Como Publicar e Colocar no Ar

Você tem duas formas muito simples e gratuitas de colocar o seu portfólio no ar:

### Opção 1: GitHub Pages (Automatizado via GitHub Actions)

Este projeto já vem com o arquivo `.github/workflows/deploy.yml` configurado.

1. Crie um repositório no seu GitHub:
   - Acesse [github.com/new](https://github.com/new)
   - Nomeie o repositório (ex: `cryo-portfolio` ou `snowLH.github.io`).
   - Deixe como **Public** e não inicialize com README (já temos um).

2. Conecte e envie o código:
   ```bash
   git remote add origin https://github.com/snowLH/cryoport.git
   git branch -M main
   git push -u origin main
   ```

3. Ative o GitHub Pages:
   - No seu repositório no GitHub, vá em **Settings** > **Pages**.
   - Em **Build and deployment** > **Source**, selecione: **GitHub Actions**.
   - Pronto! Em menos de 1 minuto seu site estará no ar em:  
     `https://snowLH.github.io/cryoport/`

---

### Opção 2: Vercel (1 Clique, Recomendado para domínio personalizado)

1. Faça login em [vercel.com](https://vercel.com) com a sua conta do GitHub.
2. Clique em **"Add New..."** > **"Project"**.
3. Selecione o repositório `cryoport` que você subiu para o GitHub.
4. O Vercel detectará automaticamente o Vite. Clique em **"Deploy"**.
5. Seu site receberá uma URL ultra rápida com SSL gratuito (ex: `cryo-portfolio.vercel.app`) e atualizará a cada `git push`!

---

## 💻 Desenvolvimento Local

Para rodar localmente no seu computador:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor local
npm run dev

# 3. Testar compilação para produção
npm run build
```

---

Desenvolvido por **Henry (@snowLH)**.
