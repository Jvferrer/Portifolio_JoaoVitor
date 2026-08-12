export type CaseStudy = {
  domain: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export type FeaturedProject = {
  name: string;
  blurb: string;
  href: string;
  kind: string;
};

export const portfolio = {
  profile: {
    name: "João Vitor Ferrer",
    role: "QA Engineer · Automação · APIs",
    headline: "Qualidade que sustenta release com confiança.",
    summary:
      "Analista de Testes com atuação em Web, APIs e Mobile — do risco à evidência, com automação, dados e colaboração próxima de produto e engenharia.",
    location: "Santo André, SP · remoto ou híbrido",
    certification: "ISTQB® CTFL",
    photo: `${import.meta.env.BASE_URL}assets/joao-vitor-ferrer.jpg`,
    resume: `${import.meta.env.BASE_URL}assets/Curriculo_Joao_Vitor_Ferrer_QA.pdf`,
    linkedin:
      "https://www.linkedin.com/in/jo%C3%A3o-vitor-ferrer-do-nascimento-10bb68226/",
    instagram: "https://www.instagram.com/qa_jvferrer/",
    github: "https://github.com/Jvferrer",
    whatsapp: "https://wa.me/5511940236678",
    email: "joao.21ferrer@gmail.com",
    phone: "(11) 94023-6678",
    phoneUri: "tel:+5511940236678",
  },
  highlights: [
    "Automação E2E com Cypress e Playwright",
    "APIs, SQL e validação de contratos",
    "Shift-left em times ágeis e CI/CD",
  ],
  capabilities: [
    {
      title: "Automação",
      description: "Jornadas E2E, regressão e gates de qualidade no pipeline.",
      items: ["Cypress", "Playwright", "Robot Framework", "Selenium"],
    },
    {
      title: "APIs e dados",
      description: "Contratos, payloads, status codes e consistência em banco.",
      items: ["Postman", "Swagger", "SQL", "PostgreSQL", "MySQL", "Oracle"],
    },
    {
      title: "Estratégia",
      description: "Risco, critérios de aceite, evidências e homologação.",
      items: ["BDD", "Shift Left", "Jira", "Azure DevOps", "GitHub Actions"],
    },
    {
      title: "Performance",
      description: "Carga e estabilidade para apoiar decisão de release.",
      items: ["k6", "JMeter"],
    },
    {
      title: "Engenharia",
      description: "Leitura de código e automação em stacks modernas.",
      items: ["TypeScript", "JavaScript", "Angular", "React", "Python"],
    },
  ],
  featured: [
    {
      name: "Jv-Funkos",
      blurb: "Loja Angular + TypeScript com Playwright, CI e GitHub Pages.",
      href: "https://jvferrer.github.io/Loja-FunkoPop/",
      kind: "Projeto pessoal",
    },
    {
      name: "Nação Flamengo",
      blurb: "Contexto de qualidade em plataforma de sócio-torcedor e Matchday.",
      href: "https://nacao.flamengo.com.br/",
      kind: "Produto em produção",
    },
    {
      name: "Sócio Torcedor SPFC",
      blurb: "Jornadas de planos, integrações e regras de negócio críticas.",
      href: "https://sociotorcedor.com.br/",
      kind: "Produto em produção",
    },
    {
      name: "Camisa 7 Botafogo",
      blurb: "Fluxos digitais de relacionamento e conversão para o clube.",
      href: "https://camisa7.botafogo.com.br/",
      kind: "Produto em produção",
    },
  ] satisfies FeaturedProject[],
  cases: [
    {
      domain: "E-commerce esportivo",
      title: "Sócio-torcedor e Matchday",
      description:
        "Qualidade em jornadas de planos e produtos para clubes, cobrindo regras de negócio, integrações, APIs e dados.",
      impact: "Contexto multi-clube com alto volume de regras e integrações.",
      tags: ["Cypress", "Postman", "PostgreSQL", "Jira", "k6"],
    },
    {
      domain: "Telecom / CX",
      title: "Vivo — Sinfonia CX",
      description:
        "Estratégia de testes, cobertura funcional, refinamento, evidências e homologação em ambiente ágil escalável.",
      impact: "Homologação com rastreabilidade e comunicação clara de risco.",
      tags: ["Octane", "Confluence", "Selenium", "Shift Left"],
    },
    {
      domain: "SaaS",
      title: "Performance e recompensas",
      description:
        "Testes funcionais, integrações e validações de dados em plataforma corporativa de gestão.",
      impact: "Foco em regras de negócio e consistência de dados.",
      tags: ["Postman", "Swagger", "MySQL", "Kanban"],
    },
    {
      domain: "Meios de pagamento",
      title: "Fluxos transacionais Web e Mobile",
      description:
        "Validação de contratos de API, transações, conciliações e jornadas em dispositivos.",
      impact: "Atenção a fluxos críticos e evidências para release.",
      tags: ["Oracle", "VTS", "Robot Framework", "Azure DevOps"],
    },
  ] satisfies CaseStudy[],
  experience: [
    {
      period: "2025 — atual",
      role: "Analista de Testes de Software",
      company: "Feng Brasil",
      description:
        "E-commerce e sócio-torcedor: testes manuais, automação Cypress, APIs, PostgreSQL e Shift Left.",
    },
    {
      period: "2022 — 2024",
      role: "Arquiteto de Testes",
      company: "Spread Tecnologia",
      description:
        "Projeto Vivo – Sinfonia CX: estratégia, homologação, evidências e colaboração em ambiente ágil escalável.",
    },
    {
      period: "2020 — 2021",
      role: "Analista de Testes de Software",
      company: "AchieveMore",
      description: "SaaS de performance e recompensas: testes funcionais, APIs, MySQL e Kanban.",
    },
    {
      period: "2019 — 2020",
      role: "Analista de Testes de Software",
      company: "Biz",
      description: "Meios de pagamento: APIs, Oracle, VTS e testes Mobile em fluxos transacionais.",
    },
  ] satisfies Experience[],
  workflow: [
    ["01", "Risco", "Refino requisitos, regras de negócio e critérios de aceite."],
    ["02", "Cenários", "Cobertura funcional, exploratória, regressiva e de integrações."],
    ["03", "Camadas", "UI, APIs, banco, massa de dados e performance quando necessário."],
    ["04", "Release", "Evidências, antecipação de riscos e decisão com clareza."],
  ] as const,
  ai: {
    description:
      "Uso IA generativa como acelerador do ciclo de QA — com revisão humana, contexto de negócio e cuidado com dados.",
    applications: [
      ["Planejamento", "Riscos, critérios de aceite e estratégias iniciais."],
      ["Cenários", "Positivos, negativos, bordas e combinações de regras."],
      ["Documentação", "Casos, evidências e comunicação com o time."],
      ["Investigação", "Hipóteses de causa raiz e triagem inicial."],
    ],
    principles: [
      "Revisão humana antes de decisões de qualidade.",
      "Contexto de negócio e proteção de dados sensíveis.",
      "IA para velocidade e cobertura — nunca para mascarar risco.",
    ],
  },
} as const;
