export type CaseStudy = {
  domain: string;
  title: string;
  description: string;
  tags: string[];
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export const portfolio = {
  profile: {
    name: "João Vitor Ferrer",
    role: "Analista de Testes / QA",
    summary:
      "Qualidade de software para produtos Web, APIs e Mobile. Atuo da descoberta do risco à decisão de release, combinando testes manuais, automação, dados e colaboração com produto e engenharia.",
    recruiterNote: "Aberto a oportunidades em QA, automação de testes e qualidade de software.",
    quickFacts: ["QA manual, automação e APIs", "Inglês intermediário", "Remoto ou híbrido em São Paulo"],
    location: "Santo André, SP · remoto ou híbrido",
    certification: "ISTQB® CTFL",
    photo: "/assets/joao-vitor-ferrer.jpg",
    resume: "/assets/Curriculo_Joao_Vitor_Ferrer_QA.pdf",
    linkedin: "https://www.linkedin.com/in/joao-vitor-ferrer-do-nascimento/",
    email: "joao.21ferrer@gmail.com",
    phone: "+55 (11) 94023-6678",
    phoneUri: "tel:+5511940236678",
  },
  capabilities: [
    {
      title: "Automação",
      description: "Cypress, Playwright e Robot Framework para jornadas E2E e regressão.",
      items: ["Cypress", "Playwright", "Robot Framework", "Selenium"],
    },
    {
      title: "APIs e dados",
      description: "Validação de contratos, payloads, status codes e consistência de dados.",
      items: ["Postman", "Swagger", "SQL", "PostgreSQL", "MySQL", "Oracle"],
    },
    {
      title: "Estratégia de qualidade",
      description: "Cobertura orientada a risco, critérios de aceite, evidências, homologação e qualidade integrada ao CI/CD.",
      items: ["BDD", "TDD", "Shift Left", "Jira", "Azure DevOps", "GitHub Actions", "Jenkins", "Azure Pipelines", "Octane"],
    },
    {
      title: "Performance",
      description: "Avaliação de comportamento sob carga para apoiar estabilidade e decisões de release.",
      items: ["k6", "JMeter"],
    },
    {
      title: "Tecnologias de desenvolvimento",
      description: "Leitura, validação e apoio à automação em aplicações Web e scripts.",
      items: ["HTML", "CSS", "JavaScript", "Python"],
    },
  ],
  cases: [
    {
      domain: "E-commerce esportivo",
      title: "Sócio-torcedor e Matchday",
      description:
        "Qualidade em jornadas de produtos e planos para clubes, cobrindo regras de negócio, integrações, APIs e dados.",
      tags: ["Cypress", "Postman", "PostgreSQL", "DBeaver", "Jira", "k6"],
    },
    {
      domain: "Telecom / CX",
      title: "Estratégia de testes e homologação",
      description:
        "Atuação no projeto Vivo – Sinfonia CX, com cobertura funcional, refinamento, evidências e homologação em ambiente ágil escalável.",
      tags: ["Octane", "Confluence", "Selenium", "Shift Left", "LLMs"],
    },
    {
      domain: "SaaS",
      title: "Regras de negócio e dados corporativos",
      description:
        "Testes funcionais, integrações e validações de dados para uma plataforma de gestão de performance e recompensas.",
      tags: ["Postman", "Swagger", "MySQL", "Trello", "Kanban"],
    },
    {
      domain: "Meios de pagamento",
      title: "Fluxos transacionais Web e Mobile",
      description:
        "Validação de contratos de API, transações, conciliações e jornadas em dispositivos físicos.",
      tags: ["Oracle", "VTS", "Robot Framework", "Azure DevOps", "Mobile"],
    },
  ] satisfies CaseStudy[],
  experience: [
    {
      period: "2025 — atual",
      role: "Analista de Testes de Software",
      company: "Feng Brasil",
      description: "E-commerce e sócio-torcedor: testes manuais, automação com Cypress, APIs, PostgreSQL e Shift Left.",
    },
    {
      period: "2022 — 2024",
      role: "Arquiteto de Testes",
      company: "Spread Tecnologia",
      description: "Projeto Vivo – Sinfonia CX: estratégia, homologação, evidências e colaboração em ambiente ágil escalável.",
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
    ["01", "Entendo o risco", "Refino requisitos, regras de negócio e critérios de aceite com o time."],
    ["02", "Modelo cenários", "Estruturo cobertura funcional, exploratória, regressiva e de integrações."],
    ["03", "Valido por camadas", "Combino UI, APIs, banco, massa de dados e performance quando necessário."],
    ["04", "Comunico decisões", "Registro evidências, antecipo riscos e apoio decisões de release com clareza."],
  ] as const,
  ai: {
    description:
      "Uso IA generativa e agentes como aceleradores do trabalho de qualidade — não como substitutos da análise de QA. O objetivo é reduzir tempo operacional e ampliar a investigação, mantendo revisão humana e contexto de negócio.",
    applications: [
      ["Planejamento", "Organização de requisitos, riscos, critérios de aceite e estratégias iniciais de teste."],
      ["Cenários", "Expansão de casos positivos, negativos, bordas e combinações de regras de negócio."],
      ["Documentação", "Estruturação de casos de teste, evidências, relatórios de defeito e comunicação com o time."],
      ["Investigação", "Apoio à análise de logs, hipóteses de causa raiz e triagem inicial de defeitos."],
    ],
    principles: [
      "Revisão humana antes de usar qualquer saída em decisões de qualidade.",
      "Preservação de contexto de negócio e cuidado com dados sensíveis.",
      "Uso da IA para elevar cobertura e velocidade, não para mascarar risco.",
    ],
  },
} as const;
