import React from 'react';
import PropTypes from 'prop-types';
import { tableStyle, tBodyStyle, tHeadStyle, tdStyle, thStyle } from './CustomTableMobile.module.css';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.shape({ columnNameDict: PropTypes.string }).isRequired,
  showHeader: PropTypes.bool,
};

const defaultProps = {
  showHeader: false,
};


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
            {isPhone && (
              <th scope="row" key={`${columns[key]}-${rowN}`} className={thStyle}>
                {key}
              </th>
            )}
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