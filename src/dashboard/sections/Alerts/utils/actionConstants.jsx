import React from 'react';
import { Bin, Ouvidoria, IconCompras, CorujaGate } from '../../../../assets';

// export const teste = { type: string, link: 'string', icon: }
export const DELETE = {
  actionType: 'delete',
  icon: <Bin fillColor="white" width="30px" height="30px" />,
  text: 'dispensar',
  background: 'transparent',
};

export const COMPRAS = link => ({
  actionType: 'link',
  icon: <IconCompras fillColor="white" width="30px" height="30px" />,
  text: 'Painel de Compras',
  background: '#F8BD6C',
  link,
});

export const OUVIDORIA = link => ({
  actionType: 'link',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'Ouvidoria',
  background: '#5C6FD9',
  link,
});

export const IT = link => ({
  actionType: 'download',
  icon: <CorujaGate fillColor="white" width="30px" height="30px" />,
  text: 'Baixar IT',
  background: '#71D0A4',
  link,
});

export const CALCULO = () => ({
  actionType: 'overlay',
  icon: <CorujaGate fillColor="white" width="30px" height="30px" />,
  text: 'Ver Cálculo',
  background: '#F8BD6C',
});
