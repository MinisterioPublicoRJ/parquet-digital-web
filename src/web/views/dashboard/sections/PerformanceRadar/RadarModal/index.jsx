/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


import {
  radarModalOuter,
  radarModalMain,
  radarModalMenu,
  radarModalSearching,
  radarModalMenuHeader,
  radarModalHeaderSlider,
  radarModalMenuList,
  radarModalMainHeader,
  radarModalMinGraph,
  radarModalMinSubtitles,
  radarModalMainSubtitlesItem,
} from './styles.module.css';
import RadarGraph from '../RadarGraph';
import { Search } from '../../../../../assets';
import { Spinner } from '../../../../../components';

const propTypes = {
  compareData: PropTypes.shape({
      userData: PropTypes.arrayOf(),
      otherData: PropTypes.arrayOf(),
      chartLabels: PropTypes.arrayOf(),
    }).isRequired,
};

function RadarModal({ compareData }) {
  function useFocus(isSearching) {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      setTimeout(() => {
        htmlElRef.current && htmlElRef.current.focus();
      }, 800);
    };
    function setBlur() {
      htmlElRef.current && htmlElRef.current.blur();
      htmlElRef.current.value = '';
      setFilteredList(compareData.otherData);
    }
    if (!isSearching) {
      return [htmlElRef, setFocus];
    }
    return [htmlElRef, setBlur];
  }
  
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
      <div className={ radarModalOuter }>
        <div className={ radarModalMain }>
          <div className={ radarModalMainHeader }>
            <h1>Comparativo de Peformance</h1>
            <p>
              Análise comparativa dos perfis de performance de promotorias de mesma atuação. Ao
              selecionar uma promotoria na lista a direito é possível realizar o comparativo entre
              os itens dispostos no radar da atuação.
            </p>
          </div>
          <div className={ radarModalMinGraph }>
            {!compareData && <Spinner size="large" />}
            {loadingError && <p>Houve um problema carregando os dados :</p>}
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
          <div className={ radarModalMinSubtitles }>
            <div className={ radarModalMainSubtitlesItem }>Sua Promotoria</div>
            {currentCompared && (
              <div className={ radarModalMainSubtitlesItem }>
                {currentCompared.meta.codamp.toLocaleLowerCase()}
              </div>
            )}
          </div>
        </div>
        <div className={ radarModalMenu }>
          <div className={ radarModalMenuHeader }>
            <div className={`${ radarModalHeaderSlider } ${isSearching && `${ radarModalSearching }`}`}>
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
          <div className={ radarModalMenuList }>
            <ul>
              {loadingError && <p>Nenhuma promotoria encontrada :</p>}
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
  );
}

RadarModal.propTypes = propTypes;
export default RadarModal;
