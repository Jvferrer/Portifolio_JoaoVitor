const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("C:\\Users\\joao.ferrer\\AppData\\Local\\Temp\\portfolio-qa-tools\\node_modules\\playwright");

const root = __dirname;
const siteRoot = path.join(root, "dist");
const artifacts = path.join(root, "qa-artifacts");
const axePath = "C:\\Users\\joao.ferrer\\AppData\\Local\\Temp\\portfolio-qa-tools\\node_modules\\axe-core\\axe.min.js";
const axeSource = fs.readFileSync(axePath, "utf8");
fs.mkdirSync(artifacts, { recursive: true });

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
};

function serveFile(request, response) {
  const relativeUrl = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safePath = path.normalize(path.join(siteRoot, relativeUrl === "/" ? "index.html" : relativeUrl));
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
    page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText}`));

    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(artifacts, "desktop-home.png"), fullPage: true });

    results.push(test("Página carrega", await page.title() === "João Vitor Ferrer | QA Engineer", `Título: ${await page.title()}`));
    results.push(
      test(
        "Hero apresenta posicionamento profissional",
        await page.locator("h1").innerText() === "Qualidade que gera\nconfiança no produto.",
        "H1 de posicionamento renderizado"
      )
    );
    results.push(
      test(
        "Status profissional visível",
        await page.locator(".recruiter-note").innerText().then((text) => text.includes("Aberto a oportunidades")),
        "Disponibilidade para oportunidades exibida"
      )
    );
    results.push(
      test(
        "Contato direto para recrutador",
        await page.locator('a[href^="mailto:"][href*="Oportunidade"]').isVisible(),
        "CTA de e-mail com assunto pré-preenchido disponível"
      )
    );
    results.push(test("Foto pessoal renderiza", await page.locator(".profile-card img").evaluate((image) => image.complete && image.naturalWidth > 0), "Imagem carregada sem quebra"));
    results.push(test("Seção de IA/LLMs renderiza", await page.locator("#ia").innerText().then((text) => text.includes("IA e LLMs aplicados ao ciclo de QA")), "Seção de IA presente"));
    results.push(test("Conteúdo de experiências renderiza", await page.locator(".timeline-item").count() === 4, "4 experiências exibidas"));
    results.push(test("Sem barra horizontal em desktop", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Layout desktop sem overflow horizontal"));

    for (const target of ["sobre", "experiencia", "projetos", "ia", "contato"]) {
      await page.locator(`a[href="#${target}"]`).first().click();
      await page.waitForTimeout(150);
      results.push(test(`Navegação para #${target}`, page.url().endsWith(`#${target}`), `URL atual: ${page.url()}`));
    }

    const downloadPromise = page.waitForEvent("download");
    await page.locator('a[download="Curriculo_Joao_Vitor_Ferrer_QA.pdf"]').click();
    const download = await downloadPromise;
    const downloadPath = path.join(artifacts, await download.suggestedFilename());
    await download.saveAs(downloadPath);
    results.push(test("Download do currículo", fs.existsSync(downloadPath) && fs.statSync(downloadPath).size > 1000, `Arquivo: ${path.basename(downloadPath)}`));

    await page.addScriptTag({ content: axeSource });
    const axeResults = await page.evaluate(async () => await axe.run());
    const significantViolations = axeResults.violations.filter((violation) => ["critical", "serious"].includes(violation.impact));
    results.push(
      test(
        "Acessibilidade sem violações críticas/sérias",
        significantViolations.length === 0,
        significantViolations.length
          ? significantViolations
              .map((item) => `${item.id}: ${item.nodes.map((node) => node.target.join(" ")).join(", ")}`)
              .join(" | ")
          : "axe-core sem achados críticos/sérios"
      )
    );
    results.push(test("Sem erros de console", consoleErrors.length === 0, consoleErrors.join(" | ") || "Nenhum erro"));
    results.push(test("Sem recursos quebrados", failedRequests.length === 0, failedRequests.join(" | ") || "Nenhuma falha de recurso"));

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(url, { waitUntil: "networkidle" });
    await mobile.screenshot({ path: path.join(artifacts, "mobile-home.png"), fullPage: true });
    results.push(test("Sem barra horizontal em mobile", await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Viewport 390px"));
    results.push(test("CTA de currículo visível em mobile", await mobile.locator('a[download="Curriculo_Joao_Vitor_Ferrer_QA.pdf"]').isVisible(), "Botão de download disponível"));
    await mobile.close();

    const tablet = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await tablet.goto(url, { waitUntil: "networkidle" });
    results.push(test("Sem barra horizontal em tablet", await tablet.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Viewport 768px"));
    results.push(test("Card profissional visível em tablet", await tablet.locator(".profile-card").isVisible(), "Foto, disponibilidade e certificação disponíveis no hero"));
    await tablet.close();

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const report = {
    standard: "Processo de testes inspirado no ISTQB CTFL",
    timestamp: new Date().toISOString(),
    scope: ["estrutura", "funcional", "navegação", "download", "responsividade", "acessibilidade", "regressão"],
    environment: { browser: "Chromium headless", desktop: "1440x960", mobile: "390x844" },
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
