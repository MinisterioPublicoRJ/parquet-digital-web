import React from 'react';
import { INTRODUCTION } from './introductionMock';

import './styles.css';

function Introduction() {
  return (
    <div className="introduction-wrapper">
      <div className="introduction-resume">
        <h3>{INTRODUCTION.titleResume}</h3>
        <p>{INTRODUCTION.subtitleResume}</p>
      </div>
      <div className="introduction-yourDesk">
        <h3>{INTRODUCTION.titleYourDesk}</h3>
        <p>{INTRODUCTION.subtitleYourDesk}</p>
      </div>
      <div className="introduction-perfomanceRadar">
        <h3>{INTRODUCTION.titlePerfomanceRadar}</h3>
        <p>{INTRODUCTION.subtitlePerfomanceRadar}</p>
      </div>
      <div className="introduction-mainInvestigated">
        <h3>{INTRODUCTION.titleMainInvestigated}</h3>
        <p>{INTRODUCTION.subtitleInvestigated}</p>
      </div>
      <div className="introduction-processList">
        <h3>{INTRODUCTION.titleProcessList}</h3>
        <p>{INTRODUCTION.subtitle}</p>
      </div>
      <div className="introduction-alerts">
        <h3>{INTRODUCTION.titleAlerts}</h3>
        <p>{INTRODUCTION.subtitleAlerts}</p>
      </div>
      <div className="introduction-successIndicators">
        <h3>{INTRODUCTION.titleSuccessIndicators}</h3>
        <p>{INTRODUCTION.subtitleSuccessIndicators}</p>
      </div>
      <div className="btns-introduction">
        <button className="btn-leave">Sair</button>
        <button className="btn-introduction-next">Entrar</button>
      </div>
    </div>
  );
}
export default Introduction;
