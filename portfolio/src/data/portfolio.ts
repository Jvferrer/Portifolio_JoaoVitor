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

export const portfolio = {
  profile: {
    name: "João Vitor Ferrer",
    role: "Quality Assurance",
    location: "Santo André, SP · Brasil",
    summary: [
      "Sou formado em Análise e Desenvolvimento de Sistemas pela Estácio, com pós-graduação em Testes de Software na Unyleya (em andamento) e certificação ISTQB® Foundation Level 4.0. Com +5 anos de experiência em QA, atuo com testes manuais e automatizados em Web, APIs e Mobile.",
      "Hoje sou Analista de Testes na Feng Brasil, com qualidade em produtos de e-commerce e sócio-torcedor (incluindo Nação Flamengo, Nação Prêmios, SPFC e Botafogo). Antes disso, fui Arquiteto de Testes na Spread (Vivo — Sinfonia CX) e atuei em SaaS e meios de pagamento.",
    ],
    photo: `${import.meta.env.BASE_URL}assets/joao-vitor-ferrer.jpg`,
    resume: `${import.meta.env.BASE_URL}assets/Curriculo_Joao_Vitor_Ferrer_QA.pdf`,
    email: "joao.21ferrer@gmail.com",
    phone: "(11) 94023-6678",
    whatsapp: "https://wa.me/5511940236678",
    linkedin:
      "https://www.linkedin.com/in/jo%C3%A3o-vitor-ferrer-do-nascimento-10bb68226/",
    instagram: "https://www.instagram.com/qa_jvferrer/",
    github: "https://github.com/Jvferrer",
  },
  skills: [
    "Playwright",
    "Cypress",
    "Selenium",
    "Robot Framework",
    "Postman",
    "Swagger",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "Oracle",
    "k6",
    "JMeter",
    "CI/CD (GitHub Actions, Azure DevOps)",
    "TypeScript / JavaScript / Python",
    "Testes Web, API e Mobile",
    "BDD e Shift Left",
    "Jira",
  ],
  experience: [
    {
      period: "2025 — atual",
      role: "Analista de Testes de Software",
      company: "Feng Brasil",
      summary:
        "Qualidade em e-commerce e plataformas de sócio-torcedor multi-clube.",
      activities: [
        "Testes manuais e automação Cypress em jornadas críticas",
        "Validação de APIs, regras de negócio e dados em PostgreSQL",
        "Shift Left com produto e engenharia",
        "Cobertura de planos, prêmios, Matchday e integrações",
      ],
      results: [
        "Contexto multi-produto (Nação, Nação Prêmios, SPFC, Botafogo)",
        "Evidências claras para decisão de release",
        "Redução de risco em fluxos de conversão e engajamento",
      ],
      stack: ["Cypress", "Postman", "PostgreSQL", "Jira", "k6"],
    },
    {
      period: "2022 — 2024",
      role: "Arquiteto de Testes",
      company: "Spread Tecnologia · Vivo Sinfonia CX",
      summary: "Estratégia de testes e homologação em ambiente ágil escalável.",
      activities: [
        "Definição de estratégia e critérios de aceite",
        "Cobertura funcional, refinamento e evidências",
        "Colaboração com times multidisciplinares",
      ],
      results: [
        "Homologação com rastreabilidade",
        "Comunicação clara de risco para stakeholders",
      ],
      stack: ["Selenium", "Octane", "Confluence", "Shift Left"],
    },
    {
      period: "2020 — 2021",
      role: "Analista de Testes de Software",
      company: "AchieveMore",
      summary: "SaaS de performance e recompensas corporativas.",
      activities: [
        "Testes funcionais e de integração",
        "Validação de contratos e consistência de dados",
      ],
      results: ["Foco em regras de negócio e confiabilidade de dados"],
      stack: ["Postman", "Swagger", "MySQL", "Kanban"],
    },
    {
      period: "2019 — 2020",
      role: "Analista de Testes de Software",
      company: "Biz",
      summary: "Meios de pagamento — fluxos Web e Mobile.",
      activities: [
        "Validação de APIs, transações e conciliações",
        "Testes Mobile em jornadas críticas",
      ],
      results: ["Atenção a fluxos financeiros e evidências de release"],
      stack: ["Oracle", "VTS", "Robot Framework", "Azure DevOps"],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "Nação Flamengo",
      kind: "Web · Produto",
      description:
        "Qualidade em plataforma de sócio-torcedor e Matchday — planos, integrações e regras de negócio.",
      href: "https://nacao.flamengo.com.br/",
      cta: "Ver site",
    },
    {
      name: "Nação Prêmios Flamengo",
      kind: "Web · Produto",
      description:
        "Jornadas de prêmios, campanhas e engajamento da Nação, com APIs e dados críticos.",
      href: "https://nacaopremios.flamengo.com.br/",
      cta: "Ver site",
    },
    {
      name: "Sócio Torcedor SPFC",
      kind: "Web · Produto",
      description: "Fluxos de planos, integrações e regras de negócio do clube.",
      href: "https://sociotorcedor.com.br/",
      cta: "Ver site",
    },
    {
      name: "Camisa 7 Botafogo",
      kind: "Web · Produto",
      description: "Relacionamento digital e conversão para o clube.",
      href: "https://camisa7.botafogo.com.br/",
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
