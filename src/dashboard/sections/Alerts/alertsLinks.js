import React from 'react';
import { Bin, Ouvidoria, IconContratacoes } from '../../../assets';

let iconBg;
let icon;
let url;
let text;
const links = [];

function openInNewTab(url) {
  window.open(url, '_blank');
}

function createLink(icon, iconBg, url, text) {
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
      <span>{text}</span>
    </div>
  );
}

export function AlertsLinks({ actionLink }) {
  const links = [];
  if (actionLink == 'OUVI') {
    icon = <Ouvidoria />;
    iconBg = 'rgb(92, 111, 217)';
    url = '#ouvidoria';
    text = 'OUVIDORIA';
    links.push(createLink(icon, iconBg, url, text));
  }

  if (actionLink == 'COMP') {
    icon = <Ouvidoria />;
    iconBg = '#5C6FD9';
    url = '#ouvidoria';
    text = 'OUVIDORIA';
    links.push(createLink(icon, iconBg, url, text));

    icon = <IconContratacoes />;
    iconBg = '#F8BD6C';
    url = '#ouvidoria';
    text = 'PAINEL DE COMPRAS';
    links.push(createLink(icon, iconBg, url, text));
  }

  // DEFAULT
  icon = <Bin fillColor="white" width="30px" height="30px" />;
  iconBg = '#F86C72';
  url = '#excluir';
  text = 'DISPENSAR';
  links.push(createLink(icon, iconBg, url, text));

  return links;
}

export default AlertsLinks;
