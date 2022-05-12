/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import './styles.css';
import GLOSSARIO from './glossaryData';
import { PromotronGlossario } from '../../../../assets/svg';
import { useAppContext } from '../../../../../core/app/App.context';

function Glossary() {
  const { currentOffice } = useAppContext();
  const { tipo } = currentOffice;

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
    <div className="glossary-wrapper">
      <div className="glossary-intro">
        <h2>Manual de uso Parquet Digital</h2>
        <p>
          Aqui você poderá conferir todos os termos usados para compor o painel bem como o
          significados e como cada índice é calculado.
        </p>
      </div>
      <div className="glossary-articles-wrapper">
        <div className="glossary-articles">
          <img className={navbarLogo} src={logoMp} alt="logo-Mp" />

        </div>
      </div>
    </div>
  );
}

export default Glossary;
