import React from 'react';
import { withRouter } from 'react-router';

import { NavLink } from 'react-router-dom';

import './styles.css';

// TODO: need to be rewritten to use a generic Link component that knows when it's active
// TODO: add proptypes
function NavBar(props) {
  const active = props.location.pathname;
  const noUnderline = { textDecoration: 'none' };
  const ulColor = { textDecorationColor: '#374354' };

  return (
    <nav className="navBarOuter">
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/"
        style={active === '/' ? ulColor : noUnderline}
      >
        Resumo
      </NavLink>
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/suamesa"
        style={active === '/suamesa' ? ulColor : noUnderline}
      >
        Sua Mesa
      </NavLink>
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/radar"
        style={active === '/radar' ? ulColor : noUnderline}
      >
        Radar de Performance
      </NavLink>
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/andamentos"
        style={active === '/andamentos' ? ulColor : noUnderline}
      >
        Andamentos
      </NavLink>
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/decisoes"
        style={active === '/decisoes' ? ulColor : noUnderline}
      >
        Decisões
      </NavLink>
      <NavLink
        className="navLinks"
        activeClassName="active"
        to="/indicadores"
        style={active === '/indicadores' ? ulColor : noUnderline}
      >
        Indicadores de Sucesso
      </NavLink>
    </nav>
  );
}

export default withRouter(NavBar);
