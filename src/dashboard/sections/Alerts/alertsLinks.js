import React from 'react';
import { Bin, Ouvidoria, IconCompras } from '../../../assets';

let iconBg;
let icon;
let url;
let text;
const links = [];

const createLink = ({ icon, iconBg, url, text, action }) => {
  return (
    <div
      target="_blank"
      onClick={event => {
        if (url) {
          event.preventDefault();
          window.open(url);
          return;
        }
        action();
      }}
      className="alertBadge-linksContainer"
      style={{ backgroundColor: iconBg }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export const AlertsLinks = ({ actionLink, closeAction }) => {
  const links = [];

  if (actionLink == 'COMP') {
    icon = <Ouvidoria />;
    iconBg = '#5C6FD9';
    url = '#ouvidoria';
    text = 'OUVIDORIA';
    links.push(createLink({ icon, iconBg, url, text }));

    icon = <IconCompras width="30px" height="30px" />;
    iconBg = '#F8BD6C';
    url = '#painel-de-compras';
    text = 'PAINEL DE COMPRAS';
    links.push(createLink({ icon, iconBg, url, text }));
  }

  // DEFAULT
  const data = {
    icon: <Bin fillColor="white" width="30px" height="30px" />,
    iconBg: '#F86C72',
    action: closeAction,
    text: 'DISPENSAR',
  };
  links.push(createLink({ ...data }));

  return links;
};

export default AlertsLinks;
