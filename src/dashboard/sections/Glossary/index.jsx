import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../app/authContext';

import './styles.css';
import { GLOSSARIO } from './glossaryMock';
import { PromotronGlossario } from '../../../assets';

function Glossary() {
  return (
    <div className="glossary-wrapper">
      <div className="glossary-intro">
        <h2>Glossário</h2>
        <p>
          Aqui você poderá conferir todos os termos usados para compor o painel bem como o
          significados e como cada índices é calculado.
        </p>
        <PromotronGlossario height={400} />
      </div>
      <div className="glossary-articles">
        <article>
          <h3>Índice de Resoluvidade</h3>
          <aside className="glossary-category">INDICADORES DE SUCESSO</aside>
          <p>
            Indicador de resolutividade da Promotoria em questão. O cálculo do índice é descrito
            como: (denúncias + arquivamentos + acordos / vistas abertas)
          </p>
        </article>
        {GLOSSARIO.map((key, i) => (
          <>
            <article>
              <h3>{key.title}</h3>
              <aside className="glossary-category">{key.section}</aside>
              <p>{key.definition}</p>
            </article>
          </>
        ))}
      </div>
      <div className="glossary-list">
        <h3>LISTA DE TERMOS</h3>
        <dl>
          <dt className="glossary-link">Resolutividade</dt>
          <dd className="glossary-category">INDICADORES DE SUCESSO</dd>
        </dl>
      </div>
    </div>
  );
}

export default Glossary;
