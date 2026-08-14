import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { portfolio, type TabId } from "./data/portfolio";

const tabs: { id: TabId; label: string }[] = [
  { id: "skills", label: "Skills" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "certificacoes", label: "Certificações" },
];

const externalRel = "noopener noreferrer";

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
        <p className="headline">{profile.headline}</p>
        <p className="location">{profile.location}</p>

        <ul className="social">
          <li>
            <a href={profile.linkedin} target="_blank" rel={externalRel}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.indeed} target="_blank" rel={externalRel}>
              Indeed
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel={externalRel}>
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.whatsapp} target="_blank" rel={externalRel}>
              WhatsApp
            </a>
          </li>
          <li>
            <button type="button" className="linkish" onClick={copyEmail}>
              {copied ? "E-mail copiado" : profile.email}
            </button>
          </li>
          <li>
            <a href={profile.instagram} target="_blank" rel={externalRel}>
              Instagram
            </a>
          </li>
        </ul>

        <div className="sidebar-actions">
          <a className="button" href={profile.whatsapp} target="_blank" rel={externalRel}>
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
      <p className="panel-lead">Linguagens, ferramentas e práticas que uso no dia a dia de QA.</p>
      <div className="skill-groups">
        {portfolio.skillGroups.map((group) => (
          <div key={group.title} className="skill-group">
            <h3>{group.title}</h3>
            <ul className="skill-grid">
              {group.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
            rel={externalRel}
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

  useEffect(() => {
    const media = window.matchMedia("(max-width: 960px)");
    const syncMenuToViewport = () => {
      if (!media.matches) {
        setMenuOpen(false);
      }
    };
    syncMenuToViewport();
    media.addEventListener("change", syncMenuToViewport);
    return () => media.removeEventListener("change", syncMenuToViewport);
  }, []);

  const selectTab = (id: TabId) => {
    setTab(id);
    setMenuOpen(false);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next = index;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    selectTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

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
          <div className="topbar-actions">
            <a
              className="button topbar-cv"
              href={profile.resume}
              download="Curriculo_Joao_Vitor_Ferrer_QA.pdf"
            >
              Currículo
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
        </div>
      </header>

      <div className="shell" id="topo">
        <div className={`sidebar-wrap${menuOpen ? " is-open" : ""}`} id={menuId}>
          <Sidebar />
        </div>

        <main id="conteudo" className="main">
          <section className="summary">
            <p className="eyebrow">Resumo profissional</p>
            <h2>Qualidade contínua e automação em Web, API e Mobile.</h2>
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <div className="tabs" role="tablist" aria-label="Seções do portfólio">
            {tabs.map((item, index) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                aria-controls={`panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                className={tab === item.id ? "is-active" : undefined}
                onClick={() => selectTab(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className="tab-panels"
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
          >
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
