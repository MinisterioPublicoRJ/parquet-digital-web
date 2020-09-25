import React, { useState, useEffect } from 'react';

import './styles.css';

function RadarModal() {
  return (
    <div className="radarModal-outer">
      <div className="radarModal-main">
        <div className="radarModal-mainHeader">
          <h1>Comparativo de Peformance</h1>
          <p>
            Análise comparativa dos perfis de performance de promotorias de mesma atuação. Ao
            selecionar uma promotoria na lista a direito é possível realizar o comparativo entre os
            itens dispostos no radar da atuação.
          </p>
        </div>
        <div className="radarModal-mainGraph">graph goes here</div>
        <div className="radarModal-mainSubtitles">
          <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
          <div className="radar-subtitles-item radar-subtitles-item-MPData">Perfil do MP</div>
        </div>
      </div>
      <div className="radarModal-menu">
        <div className="radarModal-menuHeader">
          <h3>lista de promotorias</h3>
          lupa
        </div>
        <ul className="radarModal-menuList">
          <li>
            <button type="button">
              1ª PJTC DE DEFESA DO MEIO AMBIENTE E DO PATRIMÔNIO CULTURAL DA CAPITAL
            </button>
          </li>
          <li>
            <button type="button">
              1ª PJTC DE DEFESA DO MEIO AMBIENTE E DO PATRIMÔNIO CULTURAL DA CAPITAL
            </button>
          </li>
          <li>
            <button type="button">
              1ª PJTC DE DEFESA DO MEIO AMBIENTE E DO PATRIMÔNIO CULTURAL DA CAPITAL
            </button>
          </li>
          <li>
            <button type="button">
              1ª PJTC DE DEFESA DO MEIO AMBIENTE E DO PATRIMÔNIO CULTURAL DA CAPITAL
            </button>
          </li>
        </ul>
      </div>
      <button type="button" className="radarModal-close">
        &times;
      </button>
    </div>
  );
}

export default RadarModal;
