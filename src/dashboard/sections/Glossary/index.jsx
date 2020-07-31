import React from 'react';
import './styles.css';
import { GLOSSARIO } from './glossaryMock';
import { PromotronGlossario } from '../../../assets';

function Glossary({ onToggle }) {
  const glossaryRef = React.useRef([]); // Hook to ref object

  const scrollToRef = index => {
    if (glossaryRef.current) {
      glossaryRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <div className="glossary-wrapper">
        <div className="glossary-intro">
          <h2>Glossário</h2>
          <p>
            Aqui você poderá conferir todos os termos usados para compor o painel bem como o
            significados e como cada índices é calculado.
          </p>
          <PromotronGlossario height={400} />
        </div>
        <div className="glossary-articles-wrapper">
          <div className="glossary-articles">
            {GLOSSARIO.map((key, i) => (
              <article
                ref={itemRef => {
                  glossaryRef.current[i] = itemRef;
                }}
              >
                <h3>{key.title}</h3>
                <aside className="glossary-category">{key.section}</aside>
                <p>{key.definition}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="glossary-list-wrapper">
          <div className="glossary-list">
            <h3>LISTA DE TERMOS</h3>
            <dl>
              {GLOSSARIO.map((key, i) => (
                <div onClick={() => scrollToRef(i)} className="glossary-list-link">
                  <dt>{key.title.replace('Índice de ', '').toLowerCase()}</dt>
                  <dd className="glossary-category">{key.section}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="glossary-close">
        <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

export default Glossary;
