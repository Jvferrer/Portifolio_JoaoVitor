import { useEffect, useId, useState } from "react";
import { portfolio, type TabId } from "./data/portfolio";

const tabs: { id: TabId; label: string }[] = [
  { id: "skills", label: "Skills" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "certificacoes", label: "Certificações" },
];

function Sidebar() {
  const { profile } = portfolio;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="profile">
        <img className="avatar" src={profile.photo} alt={`Foto de ${profile.name}`} />
        <h1 className="name">{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="location">{profile.location}</p>

        <ul className="social">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <button type="button" className="linkish" onClick={copyEmail}>
              {copied ? "E-mail copiado" : profile.email}
            </button>
          </li>
        </ul>

        <div className="sidebar-actions">
          <a className="button" href={profile.whatsapp} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <a
            className="button secondary"
            href={profile.resume}
            download="Curriculo_Joao_Vitor_Ferrer_QA.pdf"
          >
            Baixar currículo
          </a>
        </div>
      </div>
    </aside>
  );
}

function SkillsPanel() {
  return (
    <section className="panel">
      <h2>Especialidades</h2>
      <p className="panel-lead">Ferramentas e práticas que uso no dia a dia de QA.</p>
      <ul className="skill-grid">
        {portfolio.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function ExperiencePanel() {
  return (
    <section className="panel">
      <h2>Trajetória profissional</h2>
      <p className="panel-lead">Onde entreguei qualidade em produtos reais.</p>
      <div className="timeline">
        {portfolio.experience.map((job) => (
          <article key={`${job.company}-${job.period}`}>
            <header>
              <div>
                <h3>{job.role}</h3>
                <p className="company">{job.company}</p>
              </div>
              <span>{job.period}</span>
            </header>
            <p className="job-summary">{job.summary}</p>
            <div className="split">
              <div>
                <h4>Atividades</h4>
                <ul>
                  {job.activities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Resultados</h4>
                <ul>
                  {job.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="stack-line">{job.stack.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsPanel() {
  return (
    <section className="panel">
      <h2>Projetos em destaque</h2>
      <p className="panel-lead">Produtos públicos em que atuei com qualidade e automação.</p>
      <div className="project-grid">
        {portfolio.projects.map((project) => (
          <a
            key={project.name}
            className="project-link"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            <span>{project.kind}</span>
            <strong>{project.name}</strong>
            <p>{project.description}</p>
            <em>{project.cta}</em>
          </a>
        ))}
      </div>
    </section>
  );
}

function CredentialsPanel() {
  return (
    <section className="panel">
      <h2>Formação e certificações</h2>
      <p className="panel-lead">Base acadêmica e credenciais de QA.</p>
      <div className="credential-grid">
        {portfolio.credentials.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.institution}</p>
            <p className="cred-meta">
              {item.period}
              {item.detail ? ` · ${item.detail}` : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [tab, setTab] = useState<TabId>("skills");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const { profile } = portfolio;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="page">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#topo">
            <span>JV</span>
            Portfólio QA
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="shell" id="topo">
        <div className={`sidebar-wrap${menuOpen ? " is-open" : ""}`} id={menuId}>
          <Sidebar />
        </div>

        <main id="conteudo" className="main">
          <section className="summary">
            <p className="eyebrow">Resumo profissional</p>
            <h2>QA com foco em automação, APIs e release.</h2>
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <div className="tabs" role="tablist" aria-label="Seções do portfólio">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                className={tab === item.id ? "is-active" : undefined}
                onClick={() => {
                  setTab(item.id);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="tab-panels" role="tabpanel">
            {tab === "skills" && <SkillsPanel />}
            {tab === "experiencia" && <ExperiencePanel />}
            {tab === "projetos" && <ProjectsPanel />}
            {tab === "certificacoes" && <CredentialsPanel />}
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          <a href={profile.email.startsWith("mailto") ? profile.email : `mailto:${profile.email}`}>
            {profile.email}
          </a>
          <span aria-hidden="true"> · </span>
          {profile.phone}
        </p>
      </footer>
    </div>
  );
}

export default App;
