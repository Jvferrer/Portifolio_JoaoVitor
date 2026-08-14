const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const root = __dirname;
const siteRoot = path.join(root, "dist");
const artifacts = path.join(root, "qa-artifacts");
fs.mkdirSync(artifacts, { recursive: true });

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

function serveFile(request, response) {
  const relativeUrl = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const requested = relativeUrl === "/" ? "index.html" : relativeUrl.replace(/^\/+/, "");
  const safePath = path.normalize(path.join(siteRoot, requested));
  if (!safePath.startsWith(siteRoot) || !fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[path.extname(safePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(safePath).pipe(response);
}

function test(name, passed, evidence = "") {
  return { name, status: passed ? "PASS" : "FAIL", evidence };
}

async function run() {
  if (!fs.existsSync(siteRoot)) {
    throw new Error("Build de produção ausente. Execute `npm run build` antes da auditoria E2E.");
  }

  const server = http.createServer(serveFile);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const consoleErrors = [];
  const failedRequests = [];

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText}`);
    });

    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(artifacts, "desktop-home.png"), fullPage: true });

    results.push(test("Página carrega", (await page.title()) === "João Vitor Ferrer | Analista de QA", `Título: ${await page.title()}`));
    results.push(test("Idioma pt-BR", await page.locator("html").getAttribute("lang") === "pt-BR", "lang no documento"));
    results.push(test("Skip link presente", await page.getByRole("link", { name: /Pular para o conteúdo/i }).count() === 1, "acesso por teclado"));
    results.push(test("H1 é o nome", (await page.locator("h1").innerText()) === "João Vitor Ferrer", "heading principal"));
    results.push(
      test(
        "Posicionamento no resumo",
        await page.getByRole("heading", { name: /Qualidade contínua e automação em Web, API e Mobile/i }).isVisible(),
        "H2 de posicionamento",
      ),
    );
    results.push(
      test(
        "Foto pessoal renderiza",
        await page.getByRole("img", { name: /Foto de João Vitor Ferrer/i }).evaluate((image) => image.complete && image.naturalWidth > 0),
        "Imagem carregada sem quebra",
      ),
    );
    results.push(test("Quatro abas", await page.getByRole("tab").count() === 4, "Skills, Experiência, Projetos, Certificações"));
    results.push(
      test(
        "Tab Skills com ARIA",
        (await page.getByRole("tab", { name: "Skills" }).getAttribute("aria-controls")) === "panel-skills",
        "aria-controls no tab",
      ),
    );

    await page.getByRole("tab", { name: "Skills" }).click();
    results.push(test("Skills agrupadas", await page.getByRole("heading", { name: "Linguagens" }).isVisible(), "grupo Linguagens visível"));
    results.push(test("Playwright como conhecimento", await page.getByText("Playwright (conhecimento)").isVisible(), "sem inflar stack"));
    results.push(test("MCP como conhecimento", await page.getByText("MCP (conhecimento)").isVisible(), "MCP sem vender como entrega"));

    await page.getByRole("tab", { name: "Experiência" }).click();
    results.push(test("Quatro experiências", await page.locator(".timeline article").count() === 4, "Feng, Spread, AchieveMore, Biz"));
    results.push(test("Feng primeiro", await page.locator(".company").first().innerText().then((text) => text.includes("Feng")), "ordem cronológica"));

    await page.getByRole("tab", { name: "Projetos" }).click();
    results.push(test("Sete produtos", await page.locator(".project-link").count() === 7, "clubes públicos"));

    await page.getByRole("tab", { name: "Certificações" }).click();
    results.push(test("ISTQB 4.0 com ID", await page.locator(".cred-meta").filter({ hasText: /26-CTFL-15087-BR/ }).isVisible(), "credencial visível"));

    results.push(test("Sem barra horizontal em desktop", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Layout desktop sem overflow"));

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator(".sidebar a[download='Curriculo_Joao_Vitor_Ferrer_QA.pdf']").click(),
    ]);
    const downloadPath = path.join(artifacts, await download.suggestedFilename());
    await download.saveAs(downloadPath);
    results.push(test("Download do currículo", fs.existsSync(downloadPath) && fs.statSync(downloadPath).size > 1000, `Arquivo: ${path.basename(downloadPath)}`));

    const buttonColor = await page.locator(".button").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    results.push(test("CTA com verde de contraste", buttonColor === "rgb(22, 101, 52)", `background: ${buttonColor}`));

    results.push(test("Sem erros de console", consoleErrors.length === 0, consoleErrors.join(" | ") || "Nenhum erro"));
    results.push(
      test(
        "Sem recursos quebrados",
        failedRequests.filter((item) => !item.includes("fonts.googleapis") && !item.includes("fonts.gstatic")).length === 0,
        failedRequests.join(" | ") || "Nenhuma falha de recurso",
      ),
    );

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(url, { waitUntil: "networkidle" });
    await mobile.screenshot({ path: path.join(artifacts, "mobile-home.png"), fullPage: true });
    results.push(test("Sem barra horizontal em mobile", await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Viewport 390px"));
    results.push(test("CTA de currículo visível em mobile", await mobile.locator(".topbar a[download]").isVisible(), "Botão de download no topo"));
    await mobile.locator(".menu-toggle").click();
    results.push(test("Menu mobile abre o perfil", await mobile.locator(".sidebar-wrap.is-open").isVisible(), "drawer do perfil"));
    await mobile.close();

    const tablet = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await tablet.goto(url, { waitUntil: "networkidle" });
    results.push(test("Sem barra horizontal em tablet", await tablet.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "Viewport 768px"));
    await tablet.close();
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const report = {
    standard: "Processo de testes inspirado no ISTQB CTFL 4.0",
    timestamp: new Date().toISOString(),
    scope: ["estrutura", "funcional", "navegação", "download", "responsividade", "acessibilidade", "regressão"],
    environment: { browser: "Chromium headless", desktop: "1440x960", mobile: "390x844", tablet: "768x1024" },
    results,
  };
  fs.writeFileSync(path.join(artifacts, "istqb-e2e-results.json"), JSON.stringify(report, null, 2));

  for (const result of results) console.log(`${result.status} | ${result.name} | ${result.evidence}`);
  const failures = results.filter((result) => result.status === "FAIL");
  console.log(`\nResumo: ${results.length - failures.length}/${results.length} verificações aprovadas.`);
  process.exitCode = failures.length ? 1 : 0;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
