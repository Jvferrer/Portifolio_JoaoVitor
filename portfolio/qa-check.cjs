const fs = require("fs");
const path = require("path");

const root = __dirname;
const files = {
  html: path.join(root, "index.html"),
  app: path.join(root, "src", "App.tsx"),
  data: path.join(root, "src", "data", "portfolio.ts"),
  css: path.join(root, "src", "styles.css"),
  entry: path.join(root, "src", "main.tsx"),
  config: path.join(root, "vite.config.ts"),
  photo: path.join(root, "public", "assets", "joao-vitor-ferrer.jpg"),
  resume: path.join(root, "public", "assets", "Curriculo_Joao_Vitor_Ferrer_QA.pdf"),
};

const source = Object.fromEntries(
  Object.entries(files)
    .filter(([, filePath]) => /\.(html|tsx|ts|css)$/.test(filePath))
    .map(([key, filePath]) => [key, fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : ""])
);
const results = [];
const check = (name, passed, detail) => results.push({ name, passed, detail });
const allSource = Object.values(source).join("\n");

check("Arquivos da aplicação", Object.values(files).every(fs.existsSync), "React, TypeScript, estilos, assets e configuração presentes");
check("Documento HTML5", /^<!doctype html>/i.test(source.html), "DOCTYPE presente");
check("Idioma e SEO", /<html lang="pt-BR">/i.test(source.html) && /meta\s+name="description"/i.test(source.html), "lang e description presentes");
check("Viewport responsivo", /<meta\s+name="viewport"/i.test(source.html), "meta viewport presente");
check("Arquitetura React escalável", /createRoot/.test(source.entry) && /function Header/.test(source.app) && /function Hero/.test(source.app) && /portfolio/.test(source.data), "componentes, ponto de entrada e fonte de dados separados");
check("Vite configurado", /@vitejs\/plugin-react/.test(source.config), "build otimizado com Vite e plugin React");
check("TypeScript estrito", /"strict": true/.test(fs.readFileSync(path.join(root, "tsconfig.app.json"), "utf8")), "checagem de tipos habilitada");
check("Layout responsivo", /@media \(max-width: 1024px\)/.test(source.css) && /@media \(max-width: 700px\)/.test(source.css) && /@media \(max-width: 520px\)/.test(source.css), "breakpoints laptop compacto, tablet e mobile presentes");
check("Sem conteúdo de rascunho", !/(lorem ipsum|todo|placeholder|em breve)/i.test(allSource), "nenhum texto de rascunho encontrado");
check("Navegação interna", ["sobre", "experiencia", "projetos", "ia", "contato"].every((id) => source.app.includes(`id="${id}"`) && source.app.includes(`href="#${id}"`)), "alvos e links principais presentes");
check("Foto pessoal", fs.existsSync(files.photo) && /joao-vitor-ferrer\.jpg/.test(source.data), "foto está em public/assets");
check("Download do currículo", fs.existsSync(files.resume) && /download="Curriculo_Joao_Vitor_Ferrer_QA\.pdf"/.test(source.app), "PDF local com atributo download");
check("Contato e LinkedIn", /joao\.21ferrer@gmail\.com/.test(source.data) && /linkedin\.com\/in\/joao-vitor-ferrer-do-nascimento/.test(source.data), "canais configurados na fonte de dados");
check("IA aplicada com guardrails", /IA e LLMs aplicados ao ciclo de QA/.test(allSource) && /Revisão humana/.test(source.data) && /dados sensíveis/.test(source.data), "uso responsável de IA descrito");
check("Conteúdo profissional", ["Feng Brasil", "Spread Tecnologia", "AchieveMore", "Biz"].every((company) => source.data.includes(company)), "quatro experiências incluídas");

for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} | ${result.name} | ${result.detail}`);
const failures = results.filter((result) => !result.passed);
console.log(`\nResumo: ${results.length - failures.length}/${results.length} verificações aprovadas.`);
process.exitCode = failures.length ? 1 : 0;
