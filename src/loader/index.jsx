import React from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import './styles.css';

const propTypes = {
  handleAnimateDone: PropTypes.func,
};

const defaultProps = {
  handleAnimateDone: () => {},
};

const Loader = ({ handleAnimateDone }) => {
  return (
    // TODO: build a more generic component that abstracts Typyst
    <Typist
      className="loading-page"
      // FIXME: find why cursor animation isnt working
      cursor={{
        show: true,
        blink: true,
        element: '_',
        hideWhenDone: false,
        hideWhenDoneDelay: 1000,
      }}
      onTypingDone={() => setTimeout(handleAnimateDone, 1000)}
    >
      {/* TODO: build a generic component for paragraphWrapper */}
      <p className="paragraphWrapper">
        &gt; Oi, eu sou o <strong>Promotron</strong>!
      </p>
      <p className="paragraphWrapper">
        &gt; Sou um robô criado para ajudar nas suas tarefas de promotor de justiça.
      </p>
      <p className="paragraphWrapper">&gt; Espero que nossa amizade seja longa e prospera.</p>
      <p className="paragraphWrapper">
        &gt; Por favor, aguarde um momento enquanto carrego minha interface gráfica
        {'.'.repeat(Math.floor(Math.random() * 57) + 7) /* TODO: think about move it to a utils */}
      </p>
      <p className="paragraphWrapper">&gt; Obrigado.</p>
      <p className="paragraphWrapper">&gt; Isto fica feliz em ser útil.</p>
      <p className="paragraphWrapper">&gt; _</p>
    </Typist>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
