import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import TITLEDICT from './titleConstants';
import Badge from '../../../assets/svg/badge';

const propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.number,
    }),
  ).isRequired,
};

function Ranking({ data, title }) {
  return (
    <div className="ranking-outer">
      <h3 className="subtitle">{TITLEDICT[title]}</h3>
      <ul className="ranking-list">
        {data.map((item, i) => {
          return (
            <li key={item.text} className="ranking-li">
              <span className="ranking-icon">
                <Badge width={30} number={i + 1} />
              </span>
              <strong className="ranking-featured">{item.value}</strong>
              <span className="ranking-label">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Ranking.propTypes = propTypes;
export default Ranking;
