import React from 'react';

import newParquetImg from '../../../../assets/svg/modal_new_Informacoes.svg'
import {
  newParquetModalWrapper,
  newParquetModalImg
} from './styles.module.css';

function NewParquetModal() {
  return (
    <div className={newParquetModalWrapper}>
      <img 
        src={newParquetImg} 
        alt="Novas Informações do Parquet" 
        className={newParquetModalImg}
      /> 
    </div>
  );
}

export default NewParquetModal;
