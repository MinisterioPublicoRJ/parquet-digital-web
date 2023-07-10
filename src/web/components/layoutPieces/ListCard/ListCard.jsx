import React from 'react';
import PropTypes from 'prop-types';
import IconBadge from '../IconBadge/IconBadge';
import styles from './ListCard.module.css';

const { listCardMain, listCardRight, listCardLeft, listCardTitle, listCardLink } = styles;

function ListCard({
  title,
  content,
  actionText,
  actionLink,
  fillColor,
  icon,
  detailColor,
  fixedHeight,
}) {
  const lineHeight = `calc(1.3 * var(--smallFontSize))`;
  const outerStyles = {
    backgroundColor: fillColor,
    lineHeight,
  };

  const sharedSectionStyles = {
    padding: lineHeight,
  };

  const titleStyles = {
    ...(fixedHeight
      ? {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          height: lineHeight,
          whiteSpace: 'nowrap',
        }
      : {}),
  };

  const linkStyles = {
    ...(fixedHeight
      ? {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          height: lineHeight,
          whiteSpace: 'nowrap',
        }
      : {}),
  };

  return (
    <div className={listCardMain} style={outerStyles}>
      {detailColor && (
        <div className={listCardLeft}>
          <IconBadge backgroundColor={detailColor} icon={icon} />
        </div>
      )}
      <div className={listCardRight} style={sharedSectionStyles}>
        {/* This will be improved to an accessible solution in the future */}
        {title && (
          <strong className={listCardTitle} style={titleStyles}>
            <abbr title={title}>{title}</abbr>
          </strong>
        )}
        {content}
        {actionText && (
          <a className={listCardLink} style={linkStyles} href={actionLink}>
            {actionText}
          </a>
        )}
      </div>
    </div>
  );
}

ListCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  actionText: PropTypes.string,
  actionLink: PropTypes.string,
  fillColor: PropTypes.string,
  detailColor: PropTypes.string,
  icon: PropTypes.node,
  fixedHeight: PropTypes.bool,
};

ListCard.defaultProps = {
  title: undefined,
  actionText: undefined,
  actionLink: undefined,
  fillColor: 'transparent',
  detailColor: undefined,
  icon: undefined,
  fixedHeight: false,
};

export default ListCard;
