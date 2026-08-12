# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfólio QA — estilo autor >> abas Skills, Experiência, Projetos e Certificações
- Location: tests/e2e/portfolio.spec.ts:15:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Unyleya/i)
Expected: visible
Error: strict mode violation: getByText(/Unyleya/i) resolved to 2 elements:
    1) <p>Sou formado em Análise e Desenvolvimento de Siste…</p> aka getByText('Sou formado em Análise e')
    2) <p>Unyleya</p> aka getByText('Unyleya', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Unyleya/i)

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Pular para o conteúdo" [ref=e4] [cursor=pointer]:
    - /url: "#conteudo"
  - generic [ref=e5]:
    - complementary [ref=e7]:
      - generic [ref=e8]:
        - img "Foto de João Vitor Ferrer" [ref=e9]
        - heading "João Vitor Ferrer" [level=1] [ref=e10]
        - paragraph [ref=e11]: Quality Assurance
        - paragraph [ref=e12]: Santo André, SP · Brasil
        - list [ref=e13]:
          - listitem [ref=e14]:
            - link "LinkedIn" [ref=e15] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/jo%C3%A3o-vitor-ferrer-do-nascimento-10bb68226/
          - listitem [ref=e16]:
            - link "GitHub" [ref=e17] [cursor=pointer]:
              - /url: https://github.com/Jvferrer
          - listitem [ref=e18]:
            - link "Instagram" [ref=e19] [cursor=pointer]:
              - /url: https://www.instagram.com/qa_jvferrer/
          - listitem [ref=e20]:
            - link "WhatsApp" [ref=e21] [cursor=pointer]:
              - /url: https://wa.me/5511940236678
          - listitem [ref=e22]:
            - button "joao.21ferrer@gmail.com" [ref=e23] [cursor=pointer]
        - generic [ref=e24]:
          - link "Falar no WhatsApp" [ref=e25] [cursor=pointer]:
            - /url: https://wa.me/5511940236678
          - link "Baixar currículo" [ref=e26] [cursor=pointer]:
            - /url: ./assets/Curriculo_Joao_Vitor_Ferrer_QA.pdf
    - main [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Resumo profissional
        - heading "QA com foco em automação, APIs e release." [level=2] [ref=e30]
        - paragraph [ref=e31]: Sou formado em Análise e Desenvolvimento de Sistemas pela Estácio, com pós-graduação em Testes de Software na Unyleya (em andamento) e certificação ISTQB® Foundation Level 4.0. Com +5 anos de experiência em QA, atuo com testes manuais e automatizados em Web, APIs e Mobile.
        - paragraph [ref=e32]: Hoje sou Analista de Testes na Feng Brasil, com qualidade em produtos de e-commerce e sócio-torcedor (incluindo Nação Flamengo, Nação Prêmios, SPFC e Botafogo). Antes disso, fui Arquiteto de Testes na Spread (Vivo — Sinfonia CX) e atuei em SaaS e meios de pagamento.
      - tablist "Seções do portfólio" [ref=e33]:
        - tab "Skills" [ref=e34] [cursor=pointer]
        - tab "Experiência" [ref=e35] [cursor=pointer]
        - tab "Projetos" [ref=e36] [cursor=pointer]
        - tab "Certificações" [active] [selected] [ref=e37] [cursor=pointer]
      - tabpanel [ref=e38]:
        - generic [ref=e39]:
          - heading "Formação e certificações" [level=2] [ref=e40]
          - paragraph [ref=e41]: Base acadêmica e credenciais de QA.
          - generic [ref=e42]:
            - article [ref=e43]:
              - heading "ISTQB® Foundation Level 4.0 (CTFL)" [level=3] [ref=e44]
              - paragraph [ref=e45]: ISTQB®
              - paragraph [ref=e46]: 2026 · Credencial 26-CTFL-15087-BR
            - article [ref=e47]:
              - heading "Scrum Fundamentals Certified" [level=3] [ref=e48]
              - paragraph [ref=e49]: Vabro.ai · VMEdu
              - paragraph [ref=e50]: "2025"
            - article [ref=e51]:
              - heading "Bacharelado em ADS" [level=3] [ref=e52]
              - paragraph [ref=e53]: Estácio
              - paragraph [ref=e54]: 2023 — 2025 · Concluído
            - article [ref=e55]:
              - heading "Especialização em Testes de Software" [level=3] [ref=e56]
              - paragraph [ref=e57]: Unyleya
              - paragraph [ref=e58]: 2026 · Em andamento
  - contentinfo [ref=e59]:
    - paragraph [ref=e60]: © 2026 João Vitor Ferrer
    - paragraph [ref=e61]:
      - link "joao.21ferrer@gmail.com" [ref=e62] [cursor=pointer]:
        - /url: mailto:joao.21ferrer@gmail.com
      - text: · (11) 94023-6678
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe("Portfólio QA — estilo autor", () => {
  4  |   test("@smoke carrega perfil, resumo e abas", async ({ page }) => {
  5  |     await page.goto("./");
  6  |     await expect(page).toHaveTitle(/João Vitor Ferrer/);
  7  |     await expect(page.locator(".name")).toHaveText(/João Vitor Ferrer/);
  8  |     await expect(page.getByText(/Quality Assurance/i).first()).toBeVisible();
  9  |     await expect(page.getByRole("img", { name: /Foto de João Vitor Ferrer/i })).toBeVisible();
  10 |     await expect(page.getByRole("heading", { name: /QA com foco em automação/i })).toBeVisible();
  11 |     await expect(page.getByRole("link", { name: /Baixar currículo/i })).toBeVisible();
  12 |     await expect(page.getByRole("tab", { name: "Skills" })).toBeVisible();
  13 |   });
  14 | 
  15 |   test("abas Skills, Experiência, Projetos e Certificações", async ({ page }) => {
  16 |     await page.goto("./");
  17 | 
  18 |     await page.getByRole("tab", { name: "Skills" }).click();
  19 |     await expect(page.getByRole("heading", { name: /Especialidades/i })).toBeVisible();
  20 |     await expect(page.getByText("Playwright")).toBeVisible();
  21 |     await expect(page.getByText("Cypress")).toBeVisible();
  22 | 
  23 |     await page.getByRole("tab", { name: "Experiência" }).click();
  24 |     await expect(page.getByRole("heading", { name: /Trajetória profissional/i })).toBeVisible();
  25 |     await expect(page.getByRole("heading", { name: /Analista de Testes de Software/i }).first()).toBeVisible();
  26 |     await expect(page.locator(".company").filter({ hasText: /Feng Brasil/i })).toBeVisible();
  27 |     await expect(page.getByRole("heading", { name: "Atividades" }).first()).toBeVisible();
  28 |     await expect(page.getByRole("heading", { name: "Resultados" }).first()).toBeVisible();
  29 | 
  30 |     await page.getByRole("tab", { name: "Projetos" }).click();
  31 |     await expect(page.getByRole("heading", { name: /Projetos em destaque/i })).toBeVisible();
  32 |     await expect(page.getByRole("link", { name: /Nação Prêmios Flamengo/i })).toBeVisible();
  33 |     await expect(page.locator('a[href*="dashboard"]')).toHaveCount(0);
  34 | 
  35 |     await page.getByRole("tab", { name: "Certificações" }).click();
  36 |     await expect(page.getByRole("heading", { name: /Formação e certificações/i })).toBeVisible();
  37 |     await expect(page.getByRole("heading", { name: /ISTQB.*Foundation Level 4\.0/i })).toBeVisible();
  38 |     await expect(page.getByText(/26-CTFL-15087-BR/i)).toBeVisible();
  39 |     await expect(page.getByText(/Bacharelado em ADS/i)).toBeVisible();
> 40 |     await expect(page.getByText(/Unyleya/i)).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  41 |   });
  42 | 
  43 |   test("tipografia Sora + Figtree", async ({ page }) => {
  44 |     await page.goto("./");
  45 |     const nameFont = await page.locator(".name").evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
  46 |     const bodyFont = await page.locator(".summary p").first().evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
  47 |     expect(nameFont).toContain("sora");
  48 |     expect(bodyFont).toContain("figtree");
  49 |   });
  50 | 
  51 |   test("contatos e currículo", async ({ page }) => {
  52 |     await page.goto("./");
  53 |     await expect(page.getByRole("link", { name: "WhatsApp" }).first()).toHaveAttribute(
  54 |       "href",
  55 |       /wa\.me\/5511940236678/,
  56 |     );
  57 |     await expect(page.getByRole("link", { name: /Baixar currículo/i })).toHaveAttribute(
  58 |       "href",
  59 |       /Curriculo_Joao_Vitor_Ferrer_QA\.pdf$/,
  60 |     );
  61 |     await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toBeVisible();
  62 |     await expect(page.getByRole("link", { name: "GitHub" }).first()).toBeVisible();
  63 |   });
  64 | 
  65 |   test("assets respondem 200", async ({ page, request }) => {
  66 |     await page.goto("./");
  67 |     const photo = await page.getByRole("img", { name: /Foto de João Vitor Ferrer/i }).getAttribute("src");
  68 |     const photoRes = await request.get(new URL(photo!, page.url()).toString());
  69 |     expect(photoRes.status()).toBe(200);
  70 |     const resume = await page.getByRole("link", { name: /Baixar currículo/i }).getAttribute("href");
  71 |     const resumeRes = await request.get(new URL(resume!, page.url()).toString());
  72 |     expect(resumeRes.status()).toBe(200);
  73 |   });
  74 | });
  75 | 
```