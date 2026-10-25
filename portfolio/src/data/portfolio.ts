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

export type PortfolioDoc = {
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
  file?: string;
  downloadName?: string;
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
    role: "Analista de QA Sênior",
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
      period: "Out/2026 — atual",
      role: "Analista de teste de software",
      company: "Stefanini Brasil",
      summary: "São Paulo e Região · Híbrido",
      activities: [
        "Implantação e manutenção no sistema de Internet da SAA – Secretaria de Agricultura e Abastecimento – GEDAVE, junto à PRODESP.",
      ],
      results: [],
      stack: [],
    },
    {
      period: "Fev/2025 — Out/2026",
      role: "Analista de teste de software",
      company: "Feng Brasil · Autônomo",
      summary: "Rio de Janeiro, Brasil · Remoto",
      activities: [
        "Liderança do time de QA, reportando-se diretamente ao Head de Engenharia de Software, com definição de prioridades, estratégias e direcionamentos da área.",
        "Desenvolvimento da equipe por meio de 1:1s, acompanhamento de desempenho, definição de objetivos e planos de desenvolvimento.",
        "Estruturação e evolução de processos, padrões e práticas de Qualidade, fortalecendo a estratégia de testes e a melhoria contínua.",
        "Coordenação de QA em projetos estratégicos: Flamengo, Vasco, Fluminense, São Paulo, Barcelona SC, Botafogo e projeto de IA.",
        "Automação de testes com Cypress.",
        "Planejamento e execução de testes funcionais, exploratórios, regressivos e de performance com k6, incluindo criação, preparação e manutenção de massas de teste.",
        "Validação de APIs e integrações com Postman, PostgreSQL e DBeaver.",
        "Gestão de tasks, bugs, riscos e demandas das squads, utilizando Jira, Scrum e Kanban.",
        "Uso de IA generativa para otimização de cenários de teste, análise de defeitos e ampliação da cobertura.",
      ],
      results: [],
      stack: ["Cypress", "k6", "Postman", "PostgreSQL", "DBeaver", "Jira"],
    },
    {
      period: "Dez/2022 — Dez/2024",
      role: "Arquiteto de testes",
      company: "Spread Tecnologia · Tempo integral",
      summary: "São Paulo, Brasil · Remoto",
      activities: [
        "Atuação em fábrica de software para o cliente Vivo, no projeto Sinfonia CX, com foco em estratégia de testes, cobertura, qualidade e homologação.",
        "Definição de estratégia e cobertura de testes, critérios de aceite e cenários ponta a ponta desde o refinamento, aplicando práticas de Shift Left.",
        "Automação de testes utilizando Selenium, com foco na validação de fluxos críticos e jornadas de usuário.",
        "Condução de homologações junto ao cliente Vivo, garantindo aderência aos requisitos e critérios de aceite.",
        "Gestão de evidências, casos e homologações utilizando Octane, além de Jira e Confluence para acompanhamento e documentação.",
        "Atuação em projetos envolvendo agentes LLM, canais de voz e SMS e processamento de dados, incluindo a plataforma Hércules.",
      ],
      results: [],
      stack: ["Selenium", "Shift Left", "Octane", "Jira", "Confluence", "Agentes LLM"],
    },
    {
      period: "Set/2020 — Nov/2021",
      role: "Analista de teste de software",
      company: "AchieveMore · Tempo integral",
      summary: "São Paulo, Brasil · Remoto",
      activities: [
        "Atuação em SaaS de gestão de performance e recompensas corporativas, com foco na qualidade das funcionalidades, integrações e regras de negócio.",
        "Validação de APIs utilizando Postman e Swagger, abrangendo contratos, integrações, endpoints e regras de negócio.",
        "Execução e automação de testes em GitHub Actions, integrados ao fluxo de desenvolvimento.",
        "Validação de consistência e integridade de dados utilizando SQL e MySQL.",
        "Elaboração e execução de testes funcionais e regressivos, garantindo a estabilidade das funcionalidades.",
        "Gestão de casos de teste no Zephyr e registro e acompanhamento de defeitos no Trello, utilizando metodologia Kanban.",
      ],
      results: [],
      stack: ["Postman", "Swagger", "GitHub Actions", "SQL", "MySQL", "Zephyr", "Trello"],
    },
    {
      period: "Jul/2019 — Jul/2020",
      role: "Analista de teste de software",
      company: "Biz · Tempo integral",
      summary: "São Paulo, Brasil · Híbrido",
      activities: [
        "Atuação em meios de pagamento, com foco em fluxos transacionais e integrações financeiras em aplicações Web e Mobile.",
        "Automação de testes de API e Web utilizando Robot Framework e Python.",
        "Validação de transações, consultas e processos de conciliação financeira utilizando SQL e Oracle.",
        "Execução de testes com VTS (Visa Test System) e validações Mobile em dispositivos físicos.",
        "Integração e execução de testes em pipelines utilizando Jenkins.",
      ],
      results: [],
      stack: ["Robot Framework", "Python", "SQL", "Oracle", "VTS", "Jenkins"],
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
      file: `${import.meta.env.BASE_URL}assets/certificados/istqb-ctfl.jpg`,
      downloadName: "ISTQB_CTFL_Joao_Vitor_Ferrer.jpg",
    },
    {
      title: "Scrum Fundamentals Certified",
      institution: "Vabro.ai · VMEdu",
      period: "2025",
      file: `${import.meta.env.BASE_URL}assets/certificados/scrum-fundamentals.jpg`,
      downloadName: "Scrum_Fundamentals_Joao_Vitor_Ferrer.jpg",
    },
    {
      title: "Bacharelado em ADS",
      institution: "Estácio",
      period: "2023 — 2025",
      detail: "Concluído",
      file: `${import.meta.env.BASE_URL}assets/certificados/bacharelado-ads.pdf`,
      downloadName: "Bacharelado_ADS_Joao_Vitor_Ferrer.pdf",
    },
    {
      title: "Especialização em Testes de Software",
      institution: "Unyleya",
      period: "2026",
      detail: "Em andamento",
    },
  ] satisfies Credential[],
  documents: [
    {
      name: "Onboarding de QA",
      kind: "Processo · v1.2",
      description: "Entrada do QA: acessos, casos de teste, evidências e fluxo no Jira.",
      href: `${import.meta.env.BASE_URL}docs/onboarding-de-qa.html`,
      cta: "Abrir documento",
    },
    {
      name: "Automação de QA",
      kind: "Playwright · v1.0",
      description: "Guia da suíte: arquitetura, POM, setup da máquina e comandos do dia a dia.",
      href: `${import.meta.env.BASE_URL}docs/automacao-de-qa.html`,
      cta: "Abrir documento",
    },
    {
      name: "Manual de Automação",
      kind: "Playwright · v1.0",
      description: "Passo a passo da automação: ambiente, estrutura do projeto e pipeline.",
      href: `${import.meta.env.BASE_URL}docs/manual-de-automacao.html`,
      cta: "Abrir documento",
    },
  ] satisfies PortfolioDoc[],
} as const;

export type TabId = "skills" | "experiencia" | "projetos" | "certificacoes" | "documentos";
