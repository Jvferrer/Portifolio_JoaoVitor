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
check("Abas principais", ["Skills", "Experiência", "Projetos", "Certificações"].every((t) => source.app.includes(t)), "quatro abas");
check("Tabs ARIA", /aria-controls=\{`panel-\$\{item\.id\}`\}/.test(source.app) && /aria-labelledby=\{`tab-\$\{tab\}`\}/.test(source.app), "controls e labelledby");
check("Credenciais", /ISTQB® Foundation Level 4\.0/.test(source.data) && /Estácio/.test(source.data) && /Unyleya/.test(source.data) && /26-CTFL-15087-BR/.test(source.data), "ISTQB, ADS e pós");
check("Skills agrupadas", /title: "Linguagens"/.test(source.data) && /title: "Automação e performance"/.test(source.data) && /title: "API e dados"/.test(source.data) && /title: "IA no ciclo de QA"/.test(source.data), "linguagens, automação, dados e IA");
check("Subtítulo Skills", /Linguagens, ferramentas e práticas/.test(source.app), "não chama linguagem de ferramenta");
check("Sem dashboard/loja", !/dashboard\//.test(all) && !/Quality Gate/.test(all) && !/Jv-Funkos/.test(all), "sem lab antigo");
check("Projetos reais", /nacaopremios\.flamengo\.com\.br/.test(source.data) && /nacao\.flamengo\.com\.br/.test(source.data) && /sociosbsc\.com\.ec/.test(source.data), "Nação, Prêmios e Barcelona SC");
check("Tipografia", /family=Sora/.test(source.html) && /family=Figtree/.test(source.html), "Sora + Figtree");
check("Headline LinkedIn", /Analista de QA \| Automação de Testes \(Web e API\)/.test(source.data) && /Cypress · k6 · IA no ciclo de QA · ISTQB® CTFL/.test(source.data), "role e headline");
check("SEO social", /rel="canonical"/.test(source.html) && /og:image/.test(source.html) && /Cypress · k6/.test(source.html), "canonical, og:image e headline");
check("Contraste de CTA", /--accent-fill: #166534/.test(source.css) && /:focus-visible/.test(source.css), "botão AA e foco visível");
check("Links externos", /noopener noreferrer/.test(source.app), "noopener nos target=_blank");

for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} | ${result.name} | ${result.detail}`);
const failures = results.filter((result) => !result.passed);
console.log(`\nResumo: ${results.length - failures.length}/${results.length}`);
process.exitCode = failures.length ? 1 : 0;
