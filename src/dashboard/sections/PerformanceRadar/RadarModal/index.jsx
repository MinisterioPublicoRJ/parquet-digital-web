import React, { useState, useEffect } from 'react';

import './styles.css';
import RadarGraph from '../RadarGraph';
import { Spinner } from '../../../../components';

function RadarModal({ compareData, onToggle }) {
  const loadingError = compareData && compareData.otherData === 'error';
  const loadedData = compareData && compareData.userData;
  const [currentCompared, setCurrentCompared] = useState(null);

  useEffect(() => {
    // only run on updates, not on mount
    if (compareData) {
      setCurrentCompared(compareData.otherData[0]);
    }
  }, [compareData]);

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
        <div className="radarModal-mainGraph">
          {!compareData && <Spinner size="large" />}
          {loadingError && <p>Houve um problema carregando os dados :(</p>}
          {loadedData && currentCompared && (
            <RadarGraph
              xAxis={compareData.chartLabels}
              userGraph={compareData.userData}
              comparisionGraph={currentCompared.graphData}
            />
          )}
        </div>
        <div className="radarModal-mainSubtitles">
          <div className="radar-subtitles-item radar-subtitles-item-yourData">Sua Promotoria</div>
          {currentCompared && (
            <div className="radar-subtitles-item radar-subtitles-item-MPData">
              {currentCompared.meta.name}
            </div>
          )}
        </div>
      </div>
      <div className="radarModal-menu">
        <div className="radarModal-menuHeader">
          <h3>lista de promotorias</h3>
          lupa
        </div>
        <ul className="radarModal-menuList">
          {compareData &&
            compareData.otherData.map(({ meta, graphData }) => (
              <li>
                <button type="button" onClick={() => setCurrentCompared({ meta, graphData })}>
                  {meta.codamp}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <button type="button" className="radarModal-close" onClick={onToggle}>
        &times;
      </button>
    </div>
  );
}

export default RadarModal;
