import React from 'react';
import PropTypes from 'prop-types';
import TITLEDICT from './titleConstants';
import { Badge } from '../../../../../assets';

import {
  rankingTitle,
  rankingList,
  rankingItem,
  rankingFeatured,
  rankingLabel,
} from './styles.module.css';

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
    <>
      <h3 className={rankingTitle}>{TITLEDICT[title]}</h3>
      <ul className={rankingList}>
        {data.map((item, i) => (
          <li key={item.text} className={rankingItem}>
            <Badge width={25} number={i + 1} />
            <strong className={rankingFeatured}>{item.value || '0'}</strong>
            <span className={rankingLabel}>{item.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

Ranking.propTypes = propTypes;
export default Ranking;
