import React from 'react';
import {  textAreaInDevelopment } from './styles.module.css'

export default function InDevelopment() {
  return (
    <div className={textAreaInDevelopment}>
      <h2>Em desenvolvimento: </h2>
      <p>
          Seja bem-vindo ao Parquet Digital, ferramenta de auxílio que proporciona uma visão 
          ampla do acervo da sua Promotoria de Justiça. Na barra lateral é possível acessar o manual de uso e a nota metodológica. Boa navegação!
       </p>
    </div>
  );
}
