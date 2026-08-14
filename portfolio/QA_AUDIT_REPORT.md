# Relatório de Auditoria de QA — Portfólio

**Data:** 30/07/2026  
**Referência:** Processo de testes inspirado no ISTQB CTFL  
**Sistema avaliado:** Portfólio pessoal React + Vite de João Vitor Ferrer  
**Ambiente:** Chromium headless · Desktop 1440×960 · Mobile 390×844

---

## 1. Planejamento e análise de risco

| Risco | Impacto | Cobertura aplicada |
|---|---:|---|
| Página não carregar ou apresentar erro JavaScript | Alto | Smoke E2E, console e recursos |
| Navegação interna quebrada | Médio | Teste de todos os links âncora |
| Currículo indisponível para download | Alto | Download real e validação do arquivo |
| Foto pessoal quebrada | Médio | Validação de carregamento da imagem |
| Conteúdo não responsivo | Alto | Viewports desktop e mobile, checagem de overflow |
| Baixa acessibilidade | Alto | Auditoria axe-core |
| Regressão na arquitetura componentizada | Médio | Testes estruturais de React, TypeScript, Vite e assets |

---

## 2. Casos de teste executados

### Smoke, funcional e integração

- Carregamento da página e título do navegador
- Renderização do hero, foto pessoal e seção de IA/LLMs
- Exibição de disponibilidade profissional e CTA direto de e-mail para recrutadores
- Renderização das quatro experiências profissionais
- Navegação para Perfil, Experiência, IA e Contato
- Download real do PDF do currículo
- Verificação de ausência de erros de console e recursos quebrados

### Responsividade

- Desktop: 1440×960
- Tablet: 768×1024
- Mobile: 390×844
- Verificação de ausência de barra de rolagem horizontal
- CTA de download do currículo visível em mobile

### Acessibilidade

- Auditoria automatizada com axe-core
- Verificação de violações críticas e sérias
- Idioma da página, title, meta description e viewport
- Link de pular para o conteúdo

### Regressão estrutural

- Componentes React, TypeScript, estilos e dados desacoplados
- Links internos, IDs e arquivos de mídia
- Foto e currículo presentes no pacote publicável
- Seção de IA/LLMs e princípios de uso responsável presentes

---

## 3. Evolução de arquitetura

| ID | Severidade | Situação | Descrição | Correção |
|---|---|---|---|---|
| ARQ-001 | Melhoria | Concluído | A página usava JavaScript global para conteúdo e renderização. | Migração para React + Vite + TypeScript, com componentes, dados tipados, build de produção e assets em `public/`. |
| ARQ-002 | Decisão técnica | Concluído | Projetos Vite são aplicações compiladas e não devem ser abertos via `file://`. | O fluxo oficial é `npm run dev` para desenvolvimento e publicação do diretório `dist/` após `npm run build`. |

---

## 4. Resultado final

- **Auditoria E2E:** 21/21 aprovada
- **Regressão estrutural:** 15/15 aprovada
- **Violações críticas/sérias de acessibilidade:** 0
- **Erros de console:** 0
- **Recursos quebrados:** 0

O portfólio está aprovado para desenvolvimento local e publicação como site estático.

---

## 5. Evidências

Os artefatos da execução ficam em `qa-artifacts/`:

- `desktop-home.png`
- `mobile-home.png`
- `Curriculo_Joao_Vitor_Ferrer_QA.pdf`
- `istqb-e2e-results.json`

Para repetir a auditoria:

```powershell
cd "C:\Users\joao.ferrer\Agente-de-QA\portfolio"
npm run build
npm run test:qa
npm run test:e2e
```
