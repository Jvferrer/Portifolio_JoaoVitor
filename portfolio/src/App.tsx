import { portfolio } from "./data/portfolio";

const TagList = ({ items }: { items: readonly string[] }) => (
  <div className="tags">
    {items.map((item) => (
      <span className="tag" key={item}>
        {item}
      </span>
    ))}
  </div>
);

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="brand" href="#inicio" aria-label="Início do portfólio">
          JOÃO VITOR <span>FERRER</span> <small>· QA</small>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">Perfil</a>
          <a href="#experiencia">Trajetória</a>
          <a href="#projetos">Cases</a>
          <a href="#ia">IA aplicada</a>
          <a href="#contato">Contato</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const { profile } = portfolio;

  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Quality Assurance · Automação · APIs</span>
          <h1>
            Qualidade que gera
            <br />
            <strong>confiança no produto.</strong>
          </h1>
          <p>{profile.summary}</p>
          <p className="recruiter-note">
            <span aria-hidden="true">●</span> {profile.recruiterNote}
          </p>
          <ul className="hero-facts" aria-label="Informações profissionais em destaque">
            {profile.quickFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <div className="actions">
            <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
              Ver LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="button secondary" href={profile.resume} download="Curriculo_Joao_Vitor_Ferrer_QA.pdf">
              Baixar currículo
            </a>
          </div>
        </div>
        <aside className="profile-card">
          <img src={profile.photo} alt="João Vitor Ferrer" />
          <div className="profile-card-body">
            <span className="eyebrow">Disponibilidade</span>
            <strong>{profile.location}</strong>
            <div className="profile-divider" />
            <span className="eyebrow">Certificação</span>
            <strong>{profile.certification}</strong>
            <div className="profile-divider" />
            <a className="profile-contact" href={`mailto:${profile.email}?subject=Oportunidade%20em%20QA`}>
              Falar por e-mail <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function App() {
  const { profile, capabilities, cases, experience, workflow, ai } = portfolio;

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />

        <section id="sobre">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Resumo para recrutadores</span>
                <h2>Qualidade com visão de produto, engenharia e negócio.</h2>
              </div>
              <p>Atuação em e-commerce, telecom, SaaS e meios de pagamento — contextos com regras de negócio, integrações e dados críticos.</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <article className="capability-card" key={capability.title}>
                  <span className="card-index">0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <TagList items={capability.items} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="surface-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Trajetória</span>
                <h2>Repertório que cresce com o desafio.</h2>
              </div>
            </div>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.company}-${item.period}`}>
                  <span className="period">{item.period}</span>
                  <div>
                    <h3>
                      {item.role} <span>· {item.company}</span>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Experiência aplicada</span>
                <h2>Contexto de produto antes da ferramenta.</h2>
              </div>
              <p>Cases profissionais apresentados sem código proprietário, informações sensíveis ou dados internos.</p>
            </div>
            <div className="case-grid">
              {cases.map((item, index) => (
                <article className="case-card" key={item.title}>
                  <div>
                    <span className="case-domain">
                      CASE {String(index + 1).padStart(2, "0")} · {item.domain}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <TagList items={item.tags} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ia" className="surface-section">
          <div className="container">
            <div className="ai-intro">
              <span className="eyebrow">IA aplicada a QA</span>
              <h2>IA e LLMs aplicados ao ciclo de QA.</h2>
              <p>{ai.description}</p>
            </div>
            <div className="ai-grid">
              {ai.applications.map(([title, description]) => (
                <article className="ai-application" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="principles">
              <span className="eyebrow">Princípios de uso responsável</span>
              <ul>
                {ai.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Como atuo</span>
                <h2>Do requisito à decisão de release.</h2>
              </div>
            </div>
            <div className="workflow">
              {workflow.map(([number, title, description]) => (
                <article className="workflow-step" key={number}>
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
        <div className="container contact-content">
          <div>
            <span className="eyebrow">Contato</span>
            <h2>Vamos falar sobre qualidade de software?</h2>
            <p>
              {profile.email} · {profile.phone}
            </p>
          </div>
          <div className="actions">
            <a className="button" href={`mailto:${profile.email}`}>
              Enviar e-mail
            </a>
            <a className="button secondary" href={profile.phoneUri}>
              Ligar agora
            </a>
          </div>
        </div>
        <div className="container footer-note">© 2026 {profile.name} · Portfólio pessoal de Quality Assurance.</div>
      </footer>
    </>
  );
}

export default App;
