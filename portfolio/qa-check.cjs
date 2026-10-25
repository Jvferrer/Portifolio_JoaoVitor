const fs = require("fs");
const path = require("path");

const root = __dirname;
const files = {
  html: path.join(root, "index.html"),
  app: path.join(root, "src", "App.tsx"),
  data: path.join(root, "src", "data", "portfolio.ts"),
  css: path.join(root, "src", "styles.css"),
  photo: path.join(root, "public", "assets", "joao-vitor-ferrer.jpg"),
  resume: path.join(root, "public", "assets", "Curriculo_Joao_Vitor_Ferrer_QA.pdf"),
  ctfl: path.join(root, "public", "assets", "certificados", "istqb-ctfl.jpg"),
  scrum: path.join(root, "public", "assets", "certificados", "scrum-fundamentals.jpg"),
  ads: path.join(root, "public", "assets", "certificados", "bacharelado-ads.pdf"),
};

const source = Object.fromEntries(
  Object.entries(files)
    .filter(([, filePath]) => /\.(html|tsx|ts|css)$/.test(filePath))
    .map(([key, filePath]) => [key, fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : ""]),
);

const results = [];
const check = (name, passed, detail) => results.push({ name, passed, detail });
const all = Object.values(source).join("\n");

check("Arquivos essenciais", Object.values(files).every(fs.existsSync), "app, dados, estilos e assets");
check("Layout sidebar + abas", /sidebar/.test(source.app) && /role="tablist"/.test(source.app), "perfil lateral e tabs");
check("Abas principais", ["Skills", "Experiência", "Projetos", "Certificações", "Documentos"].every((t) => source.app.includes(t)), "cinco abas");
check(
  "Ordem das abas",
  /label: "Experiência"[\s\S]*label: "Projetos"[\s\S]*label: "Certificações"[\s\S]*label: "Documentos"[\s\S]*label: "Skills"/.test(source.app),
  "experiência primeiro e skills por último",
);
check(
  "Ordem dos contatos",
  /LinkedIn[\s\S]*GitHub[\s\S]*profile\.email[\s\S]*WhatsApp[\s\S]*Indeed[\s\S]*Instagram/.test(source.app),
  "LinkedIn, GitHub, e-mail, WhatsApp, Indeed e Instagram",
);
check("Tabs ARIA", /aria-controls=\{`panel-\$\{item\.id\}`\}/.test(source.app) && /aria-labelledby=\{`tab-\$\{tab\}`\}/.test(source.app), "controls e labelledby");
check("Credenciais", /ISTQB® Foundation Level 4\.0/.test(source.data) && /Estácio/.test(source.data) && /Unyleya/.test(source.data) && /26-CTFL-15087-BR/.test(source.data), "ISTQB, ADS e pós");
check("Download de certificados", /Baixar certificado/.test(source.app) && /assets\/certificados\/istqb-ctfl\.jpg/.test(source.data) && /assets\/certificados\/scrum-fundamentals\.jpg/.test(source.data) && /assets\/certificados\/bacharelado-ads\.pdf/.test(source.data), "CTFL, Scrum e ADS com arquivo");
check("Skills agrupadas", /title: "Linguagens"/.test(source.data) && /title: "Automação e performance"/.test(source.data) && /title: "API e dados"/.test(source.data) && /title: "IA no ciclo de QA"/.test(source.data) && /TypeScript/.test(source.data) && /"HTML"/.test(source.data) && /"CSS"/.test(source.data), "linguagens, automação, dados e IA");
check("Subtítulo Skills", /Linguagens, ferramentas e práticas/.test(source.app), "não chama linguagem de ferramenta");
check("Sem dashboard/loja", !/dashboard\//.test(all) && !/Quality Gate/.test(all) && !/Jv-Funkos/.test(all), "sem lab antigo");
check("Projetos reais", /nacaopremios\.flamengo\.com\.br/.test(source.data) && /nacao\.flamengo\.com\.br/.test(source.data) && /sociosbsc\.com\.ec/.test(source.data), "Nação, Prêmios e Barcelona SC");
check("Tipografia", /family=Sora/.test(source.html) && /family=Figtree/.test(source.html), "Sora + Figtree");
check("Cargo no perfil", /Analista de Testes\/QA Sênior/.test(source.data) && !/headline:/.test(source.data), "cargo sem repetir a stack");
check("SEO social", /rel="canonical"/.test(source.html) && /og:image/.test(source.html) && /Analista de Testes\/QA Sênior/.test(source.html), "canonical, og:image e cargo");
check("Contraste de CTA", /--accent-fill: #166534/.test(source.css) && /:focus-visible/.test(source.css), "botão AA e foco visível");
check("Links externos", /noopener noreferrer/.test(source.app), "noopener nos target=_blank");
const docNames = ["onboarding-de-qa.html", "automacao-de-qa.html", "manual-de-automacao.html"];
const docPaths = docNames.map((name) => path.join(root, "public", "docs", name));
const docText = docPaths.filter(fs.existsSync).map((filePath) => fs.readFileSync(filePath, "utf8")).join("\n");
check("Docs de QA", docPaths.every(fs.existsSync) && /Onboarding de QA/.test(source.data) && /Manual de Automação/.test(source.data), "três HTML em public/docs");
check("Docs sem infra interna", docText.length > 0 && !/feng\.rocks|Feng-Brasil\/feng-xt|feng-tech|dev_xt/.test(docText), "sem URL de homologação, repo privado ou config de segredo");
check(
  "Ícone dos documentos",
  fs.existsSync(path.join(root, "public", "docs", "favicon.svg")) &&
    docPaths.every((filePath) => /rel="icon" href="favicon\.svg"/.test(fs.readFileSync(filePath, "utf8"))) &&
    !/data:image\/png;base64/.test(docText),
  "símbolo próprio, sem o escudo antigo",
);

for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} | ${result.name} | ${result.detail}`);
const failures = results.filter((result) => !result.passed);
console.log(`\nResumo: ${results.length - failures.length}/${results.length}`);
process.exitCode = failures.length ? 1 : 0;
