export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  activities: string[];
  results: string[];
  stack: string[];
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  href: string;
  cta: string;
};

export type Credential = {
  title: string;
  institution: string;
  period: string;
  detail?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const siteUrl = "https://jvferrer.github.io/Portifolio_JoaoVitor/";

export const skillGroups = [
  {
    title: "Linguagens",
    items: ["JavaScript", "Python"],
  },
  {
    title: "Automação e performance",
    items: ["Cypress", "k6", "Robot Framework", "Selenium", "Playwright (conhecimento)", "JMeter"],
  },
  {
    title: "API e dados",
    items: ["Postman", "Swagger", "SQL", "PostgreSQL", "Triggers e jobs", "MySQL", "Oracle"],
  },
  {
    title: "Práticas e gestão",
    items: [
      "Git / GitLab",
      "GitHub Actions",
      "Jenkins",
      "Jira / Zephyr",
      "Octane / Confluence",
      "Azure DevOps",
      "Scrum / Kanban",
      "BDD / TDD / Shift Left",
    ],
  },
  {
    title: "IA no ciclo de QA",
    items: ["IA generativa", "Agentes LLM", "MCP (conhecimento)"],
  },
] as const satisfies SkillGroup[];

export const portfolio = {
  profile: {
    name: "João Vitor Ferrer",
    role: "Analista de QA | Automação de Testes (Web e API)",
    headline: "Cypress · k6 · IA no ciclo de QA · ISTQB® CTFL",
    location: "Santo André, SP · Brasil",
    summary: [
      "Sou Analista de Testes/QA, com cerca de 6 anos de atuação, foco em qualidade contínua e automação em aplicações Web, API e Mobile.",
      "Tenho experiência com testes manuais e automatizados em Cypress, Robot Framework e Selenium, validação de dados com SQL e testes de performance com k6 e JMeter. Conhecimento em Playwright.",
      "Utilizo IA generativa para apoiar o planejamento de testes, criação de cenários, documentação e investigação de defeitos, e atuei com agentes LLM em jornada de CX. Conhecimento em MCP. ISTQB® CTFL (26-CTFL-15087-BR) e pós-graduando em Testes de Software.",
    ],
    photo: `${import.meta.env.BASE_URL}assets/joao-vitor-ferrer.jpg`,
    resume: `${import.meta.env.BASE_URL}assets/Curriculo_Joao_Vitor_Ferrer_QA.pdf`,
    email: "joao.21ferrer@gmail.com",
    phone: "(11) 94023-6678",
    whatsapp: "https://wa.me/5511940236678",
    linkedin: "https://www.linkedin.com/in/joao-vitor-ferrer-do-nascimento",
    indeed: "https://profile.indeed.com/",
    instagram: "https://www.instagram.com/qa_jvferrer/",
    github: "https://github.com/Jvferrer",
  },
  skillGroups,
  skills: skillGroups.flatMap((group) => [...group.items]),
  experience: [
    {
      period: "Fev/2025 — atual",
      role: "Analista de Testes de Software",
      company: "Feng Brasil",
      summary:
        "7 produtos de e-commerce e sócio-torcedor. Responsável pela automação E2E e testes de carga.",
      activities: [
        "Automação E2E com Cypress nas jornadas de compra, cadastro e sócio-torcedor",
        "Testes de carga com k6 em fluxos críticos",
        "APIs (Postman) e banco PostgreSQL: triggers e jobs do time de database",
        "Scripts versionados em Git/GitLab na regressão de release",
        "Shift Left no Jira (Scrum/Kanban) e IA generativa em cenários e defeitos",
      ],
      results: [
        "Suíte Cypress e k6 na regressão dos 7 produtos",
        "Efeito de trigger/job conferido no banco, ponta a ponta com a API",
      ],
      stack: ["Cypress", "k6", "Postman", "PostgreSQL", "GitLab", "IA generativa"],
    },
    {
      period: "Dez/2022 — Dez/2024",
      role: "Arquiteto de Testes",
      company: "Spread Tecnologia · cliente Vivo – Sinfonia CX",
      summary:
        "Fábrica de software: estratégia de testes, cobertura e homologação. Sem gestão de pessoas.",
      activities: [
        "Definição de cobertura, critérios de aceite e testes ponta a ponta (Shift Left)",
        "Automação com Selenium e homologação com o cliente Vivo",
        "Evidências e homologações no Octane",
        "Qualidade em projetos com agentes LLM, voz, SMS e dados (plataforma Hércules)",
      ],
      results: [
        "Homologação Vivo com evidência rastreável no Octane",
        "Risco de release comunicado a stakeholders, sem gestão de pessoas",
      ],
      stack: ["Selenium", "Agentes LLM", "Octane", "Confluence", "Shift Left", "Jira"],
    },
    {
      period: "Set/2020 — Nov/2021",
      role: "Analista de Testes de Software",
      company: "AchieveMore",
      summary: "SaaS de performance e recompensas corporativas.",
      activities: [
        "Validação de APIs com Postman e Swagger; execução no GitHub Actions",
        "Consistência de dados com SQL (MySQL); casos no Zephyr e defeitos no Trello (Kanban)",
      ],
      results: ["Contratos e dados validados antes do release interno"],
      stack: ["Postman", "Swagger", "MySQL", "Zephyr", "GitHub Actions", "Trello"],
    },
    {
      period: "Jul/2019 — Jul/2020",
      role: "Analista de Testes de Software",
      company: "Biz",
      summary: "Meios de pagamento — fluxos transacionais Web e Mobile.",
      activities: [
        "Automação de API e Web com Robot Framework (Python)",
        "Transações e conciliações com SQL (Oracle)",
        "VTS (Visa Test System) e testes Mobile em dispositivos físicos; Jenkins e Azure DevOps",
      ],
      results: ["Fluxos financeiros cobertos por Robot, SQL e VTS na evidência de release"],
      stack: ["Python", "Robot Framework", "Oracle", "VTS", "Jenkins", "Azure DevOps"],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "Nação Flamengo",
      kind: "Web · Matchday",
      description:
        "Qualidade e automação em sócio-torcedor e Matchday — planos, integrações e regras de negócio.",
      href: "https://nacao.flamengo.com.br/",
      cta: "Ver site",
    },
    {
      name: "Nação Prêmios Flamengo",
      kind: "Web · Campanhas",
      description: "Jornadas de prêmios, campanhas e engajamento, com APIs e dados críticos.",
      href: "https://nacaopremios.flamengo.com.br/",
      cta: "Ver site",
    },
    {
      name: "Sócio Torcedor SPFC",
      kind: "Web · Sócio-torcedor",
      description: "Fluxos de planos, integrações e regras de negócio do clube.",
      href: "https://sociotorcedor.com.br/",
      cta: "Ver site",
    },
    {
      name: "Camisa 7 Botafogo",
      kind: "Web · Relacionamento",
      description: "Relacionamento digital e conversão para o clube.",
      href: "https://camisa7.botafogo.com.br/",
      cta: "Ver site",
    },
    {
      name: "Gigante Vasco",
      kind: "Web · E-commerce",
      description: "Sócio-torcedor e jornadas de e-commerce do Vasco da Gama.",
      href: "https://sociogigante.com/",
      cta: "Ver site",
    },
    {
      name: "Sócio Futebol Fluminense",
      kind: "Web · Ingressos",
      description: "Planos, ingressos e regras de negócio do Fluminense.",
      href: "https://sociofutebol.com.br/",
      cta: "Ver site",
    },
    {
      name: "Barcelona SC (Equador)",
      kind: "Web · Internacional",
      description: "Sócio-torcedor internacional — qualidade em jornadas e integrações.",
      href: "https://sociosbsc.com.ec/",
      cta: "Ver site",
    },
  ] satisfies Project[],
  credentials: [
    {
      title: "ISTQB® Foundation Level 4.0 (CTFL)",
      institution: "ISTQB®",
      period: "2026",
      detail: "Credencial 26-CTFL-15087-BR",
    },
    {
      title: "Scrum Fundamentals Certified",
      institution: "Vabro.ai · VMEdu",
      period: "2025",
    },
    {
      title: "Bacharelado em ADS",
      institution: "Estácio",
      period: "2023 — 2025",
      detail: "Concluído",
    },
    {
      title: "Especialização em Testes de Software",
      institution: "Unyleya",
      period: "2026",
      detail: "Em andamento",
    },
  ] satisfies Credential[],
} as const;

export type TabId = "skills" | "experiencia" | "projetos" | "certificacoes";
