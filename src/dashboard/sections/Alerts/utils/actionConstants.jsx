import React from 'react';
import {
  Bin,
  Ouvidoria,
  IconCompras,
  ItActionIcon,
  CalculatorActionIcon,
  DetailActionIcon,
  DocActionIcon,
} from '../../../../assets';

export const DELETE = {
  actionType: 'delete',
  icon: <Bin fillColor="white" width="30px" height="30px" />,
  text: 'dispensar',
  background: 'transparent',
};

export const COMPRAS = ({ compId, contrato }) => ({
  actionType: 'link',
  icon: <IconCompras fillColor="white" width="30px" height="30px" />,
  text: 'Painel de Compras',
  background: '#F8BD6C',
  link: `https://tableau2020.mprj.mp.br/t/MPMAPAS/views/TESTE-COVID-19GATE/CONUnidadeGestora?:isGuestRedirectFromVizportal=y&:embed=y&:linktarget=_self&:tabs=no&:tollbar=yes&contrato_iditem=${compId}&CONTRATACAO=${contrato}`,
});

export const OUVIDORIA = () => ({
  actionType: 'link',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'Ouvidoria',
  background: '#5C6FD9',
  link: `http://apps.mprj.mp.br/gate/api/Cidadao/downloadPDF/`,
});

export const OUVIDORIA_COMPRAS = (link) => ({
  actionType: 'link',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'Ouvidoria',
  background: '#5C6FD9',
  link,
});

export const IT = ({ alertId }) => ({
  actionType: 'download',
  icon: <ItActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Baixar IT',
  background: '#71D0A4',
  link: `http://apps.mprj.mp.br/gate/api/Cidadao/downloadPDF/${alertId}`,
});

export const CALCULO = () => ({
  actionType: 'overlay',
  icon: <CalculatorActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Ver Cálculo',
  background: '#F8BD6C',
});

export const DETAIL = () => ({
  actionType: 'overlay',
  icon: <DetailActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Ver Ação',
  background: '#F8BD6C',
});

export const GENERATE_DOC = (link) => ({
  actionType: 'download',
  icon: <DocActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Gerar Peça',
  background: '#71D0A4',
  link,
});
