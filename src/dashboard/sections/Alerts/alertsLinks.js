import React from 'react';
import { Bin, Ouvidoria } from '../../../assets';

const iconBg = 'rgb(248, 108, 114)';
let icon;
let url;

function openInNewTab(url) {
  window.open(url, '_blank');
}

export function AlertsLinks({ actionLink }) {
  switch (actionLink) {
    case 'ouvidoria':
      icon = <Ouvidoria />;
      url = '#ouvidoria';
      break;
    case 'excluir':
    default:
      icon = <Bin fillColor="white" />;
      url = '#excluir';
      break;
  }

  return (
    <div
      target="_blank"
      onClick={event => {
        event.preventDefault();
        window.open(url);
      }}
      className="alertBadge-linksContainer"
      style={{ backgroundColor: iconBg }}
    >
      {icon}
      <span>DISPENSAR</span>
    </div>
  );
}

export default AlertsLinks;
