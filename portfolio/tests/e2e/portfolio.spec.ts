import { expect, test } from "@playwright/test";

test.describe("Portfólio QA — estilo autor", () => {
  test("@smoke carrega perfil, resumo e abas", async ({ page }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/João Vitor Ferrer/);
    await expect(page.locator(".name")).toHaveText(/João Vitor Ferrer/);
    await expect(page.getByText(/Analista de QA \| Automação de Testes \(Web e API\)/i).first()).toBeVisible();
    await expect(page.locator(".headline")).toHaveCount(0);
    await expect(page.locator(".location")).toHaveText("Santo André, SP · Brasil");
    await expect(page.getByRole("img", { name: /Foto de João Vitor Ferrer/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Qualidade contínua e automação/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Baixar currículo/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Pular para o conteúdo/i })).toBeAttached();
  });

  test("abas Skills, Experiência, Projetos e Certificações", async ({ page }) => {
    await page.goto("./");

    const skillsTab = page.getByRole("tab", { name: "Skills" });
    await expect(skillsTab).toHaveAttribute("aria-controls", "panel-skills");
    await expect(page.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", "tab-skills");

    await skillsTab.click();
    await expect(page.getByRole("heading", { name: /Especialidades/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Linguagens" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Automação e performance" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "API e dados" })).toBeVisible();
    await expect(page.getByText("Playwright (conhecimento)")).toBeVisible();
    await expect(page.getByRole("heading", { name: "IA no ciclo de QA" })).toBeVisible();
    await expect(page.getByText("MCP (conhecimento)")).toBeVisible();
    await expect(page.getByText("Agentes LLM", { exact: true })).toBeVisible();
    await expect(page.getByText("Cypress", { exact: true })).toBeVisible();
    await expect(page.getByText("JavaScript", { exact: true })).toBeVisible();

    await page.getByRole("tab", { name: "Experiência" }).click();
    await expect(page.getByRole("heading", { name: /Trajetória profissional/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Analista de Testes de Software/i }).first()).toBeVisible();
    await expect(page.locator(".company").filter({ hasText: /Feng Brasil/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Analista de teste/QA" })).toBeVisible();
    await expect(page.getByText("Fev/2025 — Out/2026")).toBeVisible();
    await expect(page.getByText(/Liderança do time de QA/i)).toBeVisible();
    await expect(page.getByText(/Homologação Vivo com evidência rastreável no Octane/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atividades" })).toHaveCount(0);

    await page.getByRole("tab", { name: "Projetos" }).click();
    await expect(page.getByRole("heading", { name: /Projetos em destaque/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Nação Prêmios Flamengo/i })).toBeVisible();
    await expect(page.getByText("Web · Internacional")).toBeVisible();
    await expect(page.locator('a[href*="dashboard"]')).toHaveCount(0);

    await page.getByRole("tab", { name: "Certificações" }).click();
    await expect(page.getByRole("heading", { name: /Formação e certificações/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /ISTQB.*Foundation Level 4\.0/i })).toBeVisible();
    await expect(page.locator(".cred-meta").filter({ hasText: /26-CTFL-15087-BR/i })).toBeVisible();
    await expect(page.getByText(/Bacharelado em ADS/i)).toBeVisible();
    await expect(page.getByText(/Unyleya/i).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Baixar certificado" })).toHaveCount(3);
    await expect(page.locator("article").filter({ hasText: "Bacharelado em ADS" }).getByRole("link", { name: "Baixar certificado" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "Unyleya" }).getByRole("link")).toHaveCount(0);
  });

  test("navegação por teclado nas abas", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("tab", { name: "Skills" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Experiência" })).toBeFocused();
    await expect(page.getByRole("heading", { name: /Trajetória profissional/i })).toBeVisible();
  });

  test("tipografia Sora + Figtree", async ({ page }) => {
    await page.goto("./");
    const nameFont = await page.locator(".name").evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
    const bodyFont = await page.locator(".summary p").first().evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
    expect(nameFont).toContain("sora");
    expect(bodyFont).toContain("figtree");
  });

  test("contatos e currículo", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("link", { name: "WhatsApp" }).first()).toHaveAttribute(
      "href",
      /wa\.me\/5511940236678/,
    );
    await expect(page.getByRole("link", { name: /Baixar currículo/i })).toHaveAttribute(
      "href",
      /Curriculo_Joao_Vitor_Ferrer_QA\.pdf$/,
    );
    await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toHaveAttribute(
      "href",
      /linkedin\.com\/in\/joao-vitor-ferrer-do-nascimento/,
    );
    await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toHaveAttribute("rel", /noopener/);
    await expect(page.getByRole("link", { name: "Indeed" }).first()).toHaveAttribute("href", /profile\.indeed\.com/);
    await expect(page.getByRole("link", { name: "Indeed" }).first()).toHaveAttribute("rel", /noopener/);
    await expect(page.getByRole("link", { name: "GitHub" }).first()).toBeVisible();
  });

  test("assets respondem 200", async ({ page, request }) => {
    await page.goto("./");
    const photo = await page.getByRole("img", { name: /Foto de João Vitor Ferrer/i }).getAttribute("src");
    const photoRes = await request.get(new URL(photo!, page.url()).toString());
    expect(photoRes.status()).toBe(200);
    const resume = await page.getByRole("link", { name: /Baixar currículo/i }).getAttribute("href");
    const resumeRes = await request.get(new URL(resume!, page.url()).toString());
    expect(resumeRes.status()).toBe(200);

    await page.getByRole("tab", { name: "Certificações" }).click();
    const certificates = page.getByRole("link", { name: "Baixar certificado" });
    await expect(certificates).toHaveCount(3);
    const ads = page.locator("article").filter({ hasText: "Bacharelado em ADS" }).getByRole("link", { name: "Baixar certificado" });
    await expect(ads).toHaveAttribute("href", /bacharelado-ads\.pdf$/);
    for (const link of await certificates.all()) {
      const href = await link.getAttribute("href");
      const file = await request.get(new URL(href!, page.url()).toString());
      expect(file.status()).toBe(200);
      const type = file.headers()["content-type"] ?? "";
      expect(type.includes("image/jpeg") || type.includes("application/pdf")).toBe(true);
    }
  });

  test("documentos de QA abrem em páginas separadas", async ({ page, request }) => {
    await page.goto("./");
    await page.getByRole("tab", { name: "Documentos" }).click();

    const panel = page.getByRole("tabpanel", { name: "Documentos" });
    await expect(panel.getByRole("heading", { name: "Documentos de QA" })).toBeVisible();

    const documents = [
      { name: "Onboarding de QA", file: "onboarding-de-qa.html" },
      { name: "Automação de QA", file: "automacao-de-qa.html" },
      { name: "Manual de Automação", file: "manual-de-automacao.html" },
    ] as const;

    await expect(panel.getByRole("link")).toHaveCount(documents.length);

    for (const doc of documents) {
      const link = panel.getByRole("link", { name: doc.name });
      const filePattern = new RegExp(`(?:^|/)docs/${doc.file.replace(/\./g, "\\.")}$`);

      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", filePattern);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);

      const href = await link.getAttribute("href");
      const response = await request.get(new URL(href!, page.url()).toString());
      expect(response.status()).toBe(200);
      expect(response.url()).toMatch(filePattern);

      const body = await response.text();
      expect(body).not.toMatch(/feng\.rocks|feng-brasil\/feng-xt|dev_xt/i);
      const documentTitle = body.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
      const documentH1 = body.match(/<h1>([^<]*)<\/h1>/i)?.[1]?.trim() ?? "";
      expect(documentTitle).toMatch(new RegExp(`^${doc.name}(?:\\s|$)`));
      expect(documentH1).toBe(doc.name);
    }
  });
});
