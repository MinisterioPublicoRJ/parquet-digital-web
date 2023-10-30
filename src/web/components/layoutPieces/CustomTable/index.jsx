import React from 'react';
import PropTypes from 'prop-types';
import { tableStyle, tBodyStyle, tHeadStyle, tdStyle, thStyle } from './CustomTable.module.css';

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
    <thead className={tHeadStyle}>
      <tr>
        {sections.map((title) => (
          <th scope="col" key={title} className={thStyle}>
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
      {sections.map((key) => {
        let currentTitle = dataUnit[columns[key]];

        while (currentTitle?.props && currentTitle.props.children && typeof (currentTitle.props.children) === 'object') {
          const [title] = currentTitle.props.children;
          currentTitle = title;
        }

        if (typeof (currentTitle?.props?.children) !== 'undefined') currentTitle = currentTitle.props.children;

        return (
          <React.Fragment key={`row${rowN}-${columns[key]}`}>
       
            <td
              title={currentTitle}
              className={tdStyle}
              key={columns[key]}
            >
              {dataUnit[columns[key]]}
            </td>
          </React.Fragment>
        )
      }
      )}
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
function CustomTable({ data, columns, showHeader }) {
  const isPhone = window.innerWidth <= 480;
  return (
    <table className={tableStyle}>
      {showHeader && generateHeader(columns)}
      <tbody className={tBodyStyle}>{data.map((processo, i) => generateRow(processo, columns, isPhone, i))}</tbody>
    </table>
  );
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;
export default CustomTable;