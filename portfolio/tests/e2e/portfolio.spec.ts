import { expect, test } from "@playwright/test";

test.describe("Portfólio QA", () => {
  test("@smoke home carrega marca e CTAs", async ({ page }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/João Vitor Ferrer/);
    await expect(page.getByText("João Vitor Ferrer").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "WhatsApp" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Baixar currículo/i })).toBeVisible();
  });

  test("projetos e contato estão acessíveis", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("navigation").getByRole("link", { name: "Projetos" }).click();
    await expect(page.getByRole("heading", { name: /lab pessoal/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Jv-Funkos/i })).toBeVisible();
    await page.getByRole("navigation").getByRole("link", { name: "Contato" }).click();
    await expect(page.getByRole("heading", { name: /Vamos falar sobre qualidade/i })).toBeVisible();
  });

  test("menu mobile abre navegação", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    await page.getByRole("button", { name: /Abrir menu/i }).click();
    await expect(page.getByRole("navigation")).toHaveClass(/is-open/);
    await page.getByRole("navigation").getByRole("link", { name: "Cases" }).click();
    await expect(page.getByRole("heading", { name: /Contexto de produto/i })).toBeVisible();
  });
});
