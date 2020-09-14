import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import TITLEDICT from './titleConstants';
import { Badge } from '../../../../assets';
import { abbrevName } from '../../../../utils';

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
  console.log(title);
  const formattedAbreviated = abbrevName(title);

  return (
    <div className="ranking-outer">
      <h3>{TITLEDICT[title]}</h3>
      <h3>{formattedAbreviated}</h3>
      <ul className="ranking-list">
        {data.map((item, i) => {
          return (
            <li key={item.text} className="ranking-li">
              <span className="ranking-icon">
                <Badge width={25} number={i + 1} />
              </span>
              <strong className="ranking-featured">{item.value || '0'}</strong>
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
