import { useEffect, useId, useState } from "react";
import { portfolio } from "./data/portfolio";

const TagList = ({ items }: { items: readonly string[] }) => (
  <ul className="tags">
    {items.map((item) => (
      <li className="tag" key={item}>
        {item}
      </li>
    ))}
  </ul>
);

function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="#inicio" onClick={close}>
          <span className="brand-mark">JV</span>
          <span className="brand-text">
            João Vitor Ferrer
            <small>QA Engineer</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav id={menuId} className={open ? "is-open" : undefined} aria-label="Navegação principal">
          <a href="#sobre" onClick={close}>
            Perfil
          </a>
          <a href="#projetos" onClick={close}>
            Projetos
          </a>
          <a href="#experiencia" onClick={close}>
            Trajetória
          </a>
          <a href="#cases" onClick={close}>
            Cases
          </a>
          <a href="#contato" onClick={close}>
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { profile } = portfolio;

  return (
    <section className="hero" id="inicio">
      <div className="hero-media" aria-hidden="true">
        <img src={profile.photo} alt="" />
      </div>
      <div className="container hero-copy reveal">
        <p className="brand-hero">{profile.name}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-lead">{profile.summary}</p>
        <div className="actions">
          <a className="button" href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="button secondary" href={profile.resume} download="Curriculo_Joao_Vitor_Ferrer_QA.pdf">
            Baixar currículo
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const { profile, highlights, capabilities, featured, cases, experience, workflow, ai } = portfolio;

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />

        <section id="sobre" className="reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Perfil</p>
                <h2>QA com visão de produto, engenharia e negócio.</h2>
              </div>
              <p>
                {profile.location} · {profile.certification} · aberto a oportunidades em
                automação e qualidade de software.
              </p>
            </div>
            <ul className="highlight-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <TagList items={capability.items} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="surface-section reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Projetos</p>
                <h2>Do lab pessoal a produtos em produção.</h2>
              </div>
              <p>Links públicos para contexto — sem código proprietário nem dados sensíveis.</p>
            </div>
            <div className="featured-grid">
              {featured.map((project) => (
                <a
                  className="featured-link"
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{project.kind}</span>
                  <strong>{project.name}</strong>
                  <p>{project.blurb}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Trajetória</p>
                <h2>Repertório que cresce com o desafio.</h2>
              </div>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article key={`${item.company}-${item.period}`}>
                  <span>{item.period}</span>
                  <div>
                    <h3>
                      {item.role} <em>· {item.company}</em>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="surface-section reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Cases</p>
                <h2>Contexto de produto antes da ferramenta.</h2>
              </div>
            </div>
            <div className="case-grid">
              {cases.map((item) => (
                <article key={item.title}>
                  <span>{item.domain}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="impact">{item.impact}</p>
                  <TagList items={item.tags} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ia" className="reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">IA aplicada</p>
                <h2>Aceleradores no ciclo de QA.</h2>
              </div>
              <p>{ai.description}</p>
            </div>
            <div className="ai-grid">
              {ai.applications.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-section reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Como atuo</p>
                <h2>Do requisito à decisão de release.</h2>
              </div>
            </div>
            <div className="workflow">
              {workflow.map(([number, title, description]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contato">
        <div className="container contact-panel reveal">
          <div>
            <p className="eyebrow">Contato</p>
            <h2>Vamos falar sobre qualidade?</h2>
            <p>
              {profile.email} · {profile.phone}
            </p>
          </div>
          <div className="actions">
            <a className="button" href={profile.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="button secondary" href={`mailto:${profile.email}`}>
              E-mail
            </a>
            <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="container footer-note">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={profile.resume} download>
              Currículo
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
