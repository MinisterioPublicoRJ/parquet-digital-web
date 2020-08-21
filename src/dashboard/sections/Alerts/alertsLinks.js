import React from 'react';
import { Bin, Ouvidoria, IconCompras } from '../../../assets';

let iconBg;
let icon;
let url;
let text;
const links = [];

const createLink = ({ icon, iconBg, url, text, action, key }) => {
  return (
    <div
      key={key}
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

export const AlertsLinks = ({ actionLink, closeAction, compId }) => {
  const links = [];

  if (actionLink == 'COMP') {
    let contract = compId.split('-')[0];

    icon = <Ouvidoria />;
    iconBg = '#5C6FD9';
    url = '#ouvidoria';
    text = 'OUVIDORIA';
    links.push(createLink({ icon, iconBg, url, text, compId }));

    icon = <IconCompras width="30px" height="30px" />;
    iconBg = '#F8BD6C';
    url = `https://tableau2020.mprj.mp.br/t/MPMAPAS/views/TESTE-COVID-19GATE/CONUnidadeGestora?:isGuestRedirectFromVizportal=y&:embed=y&:linktarget=_self&:tabs=no&:tollbar=yes&contrato_iditem=${compId}&CONTRATACAO=${contract}`;
    text = 'PAINEL DE COMPRAS';
    links.push(createLink({ icon, iconBg, url, text, compId }));
  }

  // DEFAULT
  const data = {
    icon: <Bin fillColor="white" width="30px" height="30px" />,
    iconBg: '#F86C72',
    action: closeAction,
    text: 'DISPENSAR',
    key: compId,
  };
  links.push(createLink({ ...data }));

  return links;
};

export default AlertsLinks;
