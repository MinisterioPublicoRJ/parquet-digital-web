/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';

import './styles.css';
import RadarGraph from '../RadarGraph';
import { Search } from '../../../../../assets';
import { Spinner } from '../../../../../components';

function RadarModal({ compareData, close }) {
  const useFocus = isSearching => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      setTimeout(() => {
        htmlElRef.current && htmlElRef.current.focus();
      }, 800);
    };
    const setBlur = () => {
      htmlElRef.current && htmlElRef.current.blur();
      htmlElRef.current.value = '';
      setFilteredList(compareData.otherData);
    };
    if (!isSearching) {
      return [htmlElRef, setFocus];
    }
    return [htmlElRef, setBlur];
  };
  
  const [loadedData, setLoadedData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inputRef, setInputFocus] = useFocus(isSearching);
  const [loadingError, setLoadingError] = useState(false);
  const [currentCompared, setCurrentCompared] = useState(null);

  useEffect(() => {
    // only run on updates, not on mount
    if (compareData) {
      const { otherData } = compareData;
      const hasOtherData = otherData !== 'error';

      setLoadingError(!hasOtherData);
      setLoadedData(compareData.userData);
      setCurrentCompared(hasOtherData ? otherData[0] : null);
      setFilteredList(hasOtherData ? otherData : []);
    }
  }, [compareData]);

  function filterList({ target }) {
    const inputValue = target.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const filtered = compareData.otherData.filter(
      ({ meta }) =>
        meta.codamp
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(inputValue) ||
        meta.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(inputValue),
    );
    setFilteredList(filtered);
  }

  return (
    <>
      <div className="radarModal-outer">
        <div className="radarModal-main">
          <div className="radarModal-mainHeader">
            <h1>Comparativo de Peformance</h1>
            <p>
              Análise comparativa dos perfis de performance de promotorias de mesma atuação. Ao
              selecionar uma promotoria na lista a direito é possível realizar o comparativo entre
              os itens dispostos no radar da atuação.
            </p>
          </div>
          <div className="radarModal-mainGraph">
            {!compareData && <Spinner size="large" />}
            {loadingError && <p>Houve um problema carregando os dados :(</p>}
            {/*
            the extra div makes VictoryChart centralized on the parent's empty space,
            otherwise the svg tag takes 100% of the height and adds empty space under the graph
          */}
            {loadedData && currentCompared && (
              <div>
                <RadarGraph
                  xAxis={compareData.chartLabels}
                  userGraph={compareData.userData}
                  comparisionGraph={currentCompared.graphData}
                />
              </div>
            )}
          </div>
          <div className="radarModal-mainSubtitles">
            <div className="radarModal-mainSubtitles-item radarModal-item--you">Sua Promotoria</div>
            {currentCompared && (
              <div className="radarModal-mainSubtitles-item radarModal-item--other">
                {currentCompared.meta.codamp.toLocaleLowerCase()}
              </div>
            )}
          </div>
        </div>
        <div className="radarModal-menu">
          <div className="radarModal-menuHeader">
            <div className={`radarModal-headerSlider ${isSearching && 'radarModal-searching'}`}>
              <div>
                <h3>Lista de Promotorias</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSearching((prevSearch) => !prevSearch);
                  setInputFocus();
                }}
              >
                <Search />
              </button>
              <div>
                <input ref={inputRef} onChange={filterList} type="text" />
              </div>
            </div>
          </div>
          <div className="radarModal-menuList">
            <ul>
              {loadingError && <p>Nenhuma promotoria encontrada :(</p>}
              {compareData &&
                filteredList.map(({ meta, graphData }) => (
                  <li key={meta.name}>
                    <button type="button" onClick={() => setCurrentCompared({ meta, graphData })}>
                      {meta.name}
                      <span>{meta.codamp.toLocaleLowerCase()}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="radarModal-close">
        <button type="button" className="radarModal-close" aria-label="Fechar" onClick={close}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

export default RadarModal;
