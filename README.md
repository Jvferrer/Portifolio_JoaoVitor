# João Vitor Ferrer — Portfólio QA

Portfólio de **QA Engineer** focado em automação, APIs e qualidade de release.  
Stack: **React + TypeScript + Vite**, com testes **Playwright** e deploy no **GitHub Pages**.

## Live

https://jvferrer.github.io/Portifolio_JoaoVitor/

## Perfil

| Item | Detalhe |
|---|---|
| Experiência | +5 anos em QA |
| Certificação | ISTQB® Foundation Level 4.0 (CTFL) — `26-CTFL-15087-BR` |
| Graduação | ADS — Estácio (concluído) |
| Pós-graduação | Especialização em Testes de Software — Unyleya (em andamento) |
| Local | Santo André, SP · remoto ou híbrido |

## Stack do site

- React 19 + TypeScript
- Vite
- Playwright (E2E)
- GitHub Actions → GitHub Pages

## Estrutura

```text
portfolio/                 # App do portfólio (fonte)
  src/                     # React + dados e estilos
  public/assets/           # Foto e currículo (PDF)
  tests/e2e/               # Playwright
.github/workflows/         # CI + deploy Pages
```

## Desenvolvimento

```bash
cd portfolio
npm ci
npm run dev
```

## Testes e build

```bash
cd portfolio
npm run test:qa
npm run test:e2e:chromium
npm run build
```

O workflow em `.github/workflows/deploy-pages.yml` roda os testes e publica o `dist/` no GitHub Pages a cada push em `main`.

## Contato

- WhatsApp: https://wa.me/5511940236678
- E-mail: joao.21ferrer@gmail.com
- LinkedIn / Instagram / GitHub: no rodapé do site
