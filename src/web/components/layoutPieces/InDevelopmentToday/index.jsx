import React from 'react';
import {  textAreaInDevelopmentToday } from './styles.module.css'

export default function InDevelopmentToday() {
  return (
    <div className={textAreaInDevelopmentToday}>
      <p>
        Seja bem-vindo ao Parquet Digital, ferramenta de auxílio que proporciona uma visão ampla do acervo da sua Promotoria de Justiça. 
       </p>
       <p>
        Na barra lateral é possível acessar o manual de uso e a nota metodológica. Boa navegação!
       </p>
    </div>
  );
}
