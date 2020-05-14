import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

import { capitalizeTitle } from '../../../utils/formatters';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /* DICT { KEY: PRETTIFIED NAME, VALUE: MATCHING KEY IN DATA OBJECTS } */
  columns: PropTypes.shape({ columnNameDict: PropTypes.string }).isRequired,
  showHeader: PropTypes.bool,
};

const defaultProps = {
  showHeader: false,
};

/**
 * creates a screen reader approved header for the table if we want one
 * @param  {json} headerPropArray a dict containing pretty names and field names
 * @return {node}                 JSX for the table header
 */
function generateHeader(headerPropArray) {
  const sections = Object.keys(headerPropArray);

  return (
    <thead>
      <tr>
        {sections.map(title => (
          <th scope="col" key={title}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

/**
 * creates a row for every object in the dataset and orders it's cells to make sure they respect the column theme
 * @param  {json} dataUnit whatever data we want to add to the table
 * @param  {json} columns  a dict containing pretty names and field names
 * @param  {bool} isPhone  true if width <= 480px
 * @param  {number} rowN   number of the current row
 * @return {node}          JSX for the table body
 */
function generateRow(dataUnit, columns, isPhone, rowN) {
  const sections = Object.keys(columns);

  return (
    <tr key={`table-row-${rowN}`}>
      {sections.map((key, i) => (
        <>
          {isPhone && (
            <th scope="row" key={`${key}-${i}`}>
              {key}
            </th>
          )}
          <td key={dataUnit[columns[key]]}>{capitalizeTitle(dataUnit[columns[key]])}</td>
        </>
      ))}
    </tr>
  );
}

/**
 * Renders a generic table based on the provided data
 * @param       {array} data       array of row data {column: value}
 * @param       {json} columns    dict of display names {displayName: comlunNameInData}
 * @param       {boolean} showHeader
 * @constructor
 */
function Table({ data, columns, showHeader }) {
  const isPhone = window.innerWidth <= 480;
  return (
    <table>
      {showHeader && !isPhone && generateHeader(columns)}
      <tbody>{data.map((processo, i) => generateRow(processo, columns, isPhone, i))}</tbody>
    </table>
  );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
export default Table;
