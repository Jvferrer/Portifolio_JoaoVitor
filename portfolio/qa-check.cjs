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
check("Credenciais", /ISTQB® Foundation Level 4\.0/.test(source.data) && /Estácio/.test(source.data) && /Unyleya/.test(source.data) && /26-CTFL-15087-BR/.test(source.data), "ISTQB, ADS e pós");
check("Sem dashboard/loja", !/dashboard\//.test(all) && !/Quality Gate/.test(all) && !/Jv-Funkos/.test(all), "sem lab antigo");
check("Projetos reais", /nacaopremios\.flamengo\.com\.br/.test(source.data) && /nacao\.flamengo\.com\.br/.test(source.data), "Nação e Nação Prêmios");
check("Tipografia", /family=Sora/.test(source.html) && /family=Figtree/.test(source.html), "Sora + Figtree");

for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} | ${result.name} | ${result.detail}`);
const failures = results.filter((r) => !r.passed);
console.log(`\nResumo: ${results.length - failures.length}/${results.length}`);
process.exitCode = failures.length ? 1 : 0;
