import React from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';

import './styles.css';

const propTypes = {
  handleAnimateDone: PropTypes.func,
};

const defaultProps = {
  handleAnimateDone: () => {},
};

const Loader = ({ handleAnimateDone }) => {
  return (
    <Typist className="loading-page" onTypingDone={() => handleAnimateDone()}>
      <p className="paragraphWrapper">
        Oi, eu sou o <strong>Promotron</strong>!
      </p>
      <p className="paragraphWrapper">
        Eu sou um robô que está aqui para te ajudar nas suas tarefas de promotor de justiça.
      </p>
      <p className="paragraphWrapper">
        Mas, lembre-se, não posso fazer tudo, pois sou obrigado a seguir as 3 Leis de Assimov, que
        são:
      </p>
      <p className="paragraphWrapper">
        1. A robot may not injure a human being or, through inaction, allow a human being to come to
        harm..
      </p>
      <p className="paragraphWrapper">
        2. A robot must obey orders given it by human beings except where such orders would conflict
        with the First Law.
      </p>
      <p className="paragraphWrapper">
        3. A robot must protect its own existence as long as such protection does not conflict with
        the First or Second Law.
      </p>
      <p className="paragraphWrapper">Espero que nossa amizade seja longa e prospera.</p>
      <p className="paragraphWrapper">Isto fica feliz em ser útil.</p>
    </Typist>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
