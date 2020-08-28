import React from 'react';
import { Bin, Ouvidoria, IconCompras, CorujaGate } from '../../../../assets';

// export const teste = { type: string, link: 'string', icon: }
export const DELETE = {
  actionType: 'delete',
  icon: <Bin fillColor="white" width="30px" height="30px" />,
  text: 'dispensar',
  background: 'transparent',
};
export const TESTE = {
  actionType: 'teste',
  icon: <Ouvidoria fillColor="white" width="30px" height="30px" />,
  text: 'teste! painel de compras',
  background: 'orange',
};
export const IT = link => ({
  actionType: 'download',
  icon: <CorujaGate fillColor="white" width="30px" height="30px" />,
  text: 'Download da IT',
  background: '#374354',
  link,
});
