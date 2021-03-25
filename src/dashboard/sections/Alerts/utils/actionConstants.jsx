import React from 'react';
import {
  Bin,
  Ouvidoria,
  IconCompras,
  IconSaneamento,
  ItActionIcon,
  CalculatorActionIcon,
  DetailActionIcon,
  DocActionIcon,
  DeadlineIcon,
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

export const SANEAMENTO = () => ({
  actionType: 'link',
  icon: <IconSaneamento fillColor="white" width="30px" height="30px" />,
  text: 'Painel do Saneamento',
  background: '#71D0A4',
  link: `https://geo.mprj.mp.br/portal/apps/experiencebuilder/experience/?id=35ae775b7f37418c9c65f47d62943d67&page=page_10`,
});

export const OUVIDORIA_ISPS = (link) => ({
  actionType: 'openComplaint',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'Ouvidoria',
  background: '#5C6FD9',
  link,
});

export const OUVIDORIA_COMPRAS = (link) => ({
  actionType: 'openComplaint',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'Ouvidoria',
  background: '#5C6FD9',
  link,
});

export const IT = (alertIdGate) => ({
  actionType: 'download',
  icon: <ItActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Baixar IT',
  background: '#71D0A4',
  link: `http://apps.mprj.mp.br/gate/api/Cidadao/downloadPDF/${alertIdGate}`,
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

export const GENERATE_MINUTA = (link) => ({
  actionType: 'download',
  icon: <DocActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Elaborar minuta',
  background: '#71D0A4',
  link,
});

export const EXTEND_DEADLINE = (link) => ({
  actionType: 'download',
  icon: <DeadlineIcon fillColor="white" width="30px" height="30px" />,
  text: 'Prorrogar',
  background: '#F8BD6C',
  link,
});

export const DOWNLOAD_LIST = (link) => ({
  actionType: 'download',
  icon: <DocActionIcon fillColor="white" width="30px" height="30px" />,
  text: 'Baixar lista',
  background: '#71D0A4',
  link,
});

export const GENERATE_CSV = (link) => ({
  actionType: 'download',
  text: 'CSV',
  link,
});
