import React from 'react';
import PropTypes from 'prop-types';
import IconBadge from '../IconBadge/IconBadge';
import {
  listCardMain,
  listCardRight,
  listCardLeft,
  listCardTitle,
  listCardLink,
  fixedHeightStyle
} from './ListCard.module.css';

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
  
  const outerStyles = {
    backgroundColor: fillColor
  };

  return (
    <div className={listCardMain} style={outerStyles}>
      {detailColor && (
        <div className={listCardLeft}>
          <IconBadge backgroundColor={detailColor} icon={icon} />
        </div>
      )}
      <div className={listCardRight}>
        {/* This will be improved to an accessible solution in the future */}
        {title && (
          <strong className={`${listCardTitle} ${fixedHeight && fixedHeightStyle}`}>
            <abbr title={title}>{title}</abbr>
          </strong>
        )}
        {content}
        {actionText && (
          <a className={`${listCardLink} ${fixedHeight && fixedHeightStyle}`} href={actionLink}>
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
