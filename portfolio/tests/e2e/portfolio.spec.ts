import { expect, test } from "@playwright/test";

test.describe("Portfólio QA — estilo autor", () => {
  test("@smoke carrega perfil, resumo e abas", async ({ page }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/João Vitor Ferrer/);
    await expect(page.locator(".name")).toHaveText(/João Vitor Ferrer/);
    await expect(page.getByText(/Quality Assurance/i).first()).toBeVisible();
    await expect(page.getByRole("img", { name: /Foto de João Vitor Ferrer/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /QA com foco em automação/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Baixar currículo/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Skills" })).toBeVisible();
  });

  test("abas Skills, Experiência, Projetos e Certificações", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("tab", { name: "Skills" }).click();
    await expect(page.getByRole("heading", { name: /Especialidades/i })).toBeVisible();
    await expect(page.getByText("Playwright")).toBeVisible();
    await expect(page.getByText("Cypress")).toBeVisible();

    await page.getByRole("tab", { name: "Experiência" }).click();
    await expect(page.getByRole("heading", { name: /Trajetória profissional/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Analista de Testes de Software/i }).first()).toBeVisible();
    await expect(page.locator(".company").filter({ hasText: /Feng Brasil/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atividades" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Resultados" }).first()).toBeVisible();

    await page.getByRole("tab", { name: "Projetos" }).click();
    await expect(page.getByRole("heading", { name: /Projetos em destaque/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Nação Prêmios Flamengo/i })).toBeVisible();
    await expect(page.locator('a[href*="dashboard"]')).toHaveCount(0);

    await page.getByRole("tab", { name: "Certificações" }).click();
    await expect(page.getByRole("heading", { name: /Formação e certificações/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /ISTQB.*Foundation Level 4\.0/i })).toBeVisible();
    await expect(page.getByText(/26-CTFL-15087-BR/i)).toBeVisible();
    await expect(page.getByText(/Bacharelado em ADS/i)).toBeVisible();
    await expect(page.getByText(/Unyleya/i).first()).toBeVisible();
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
    await expect(page.getByRole("link", { name: "LinkedIn" }).first()).toBeVisible();
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
  });
});
