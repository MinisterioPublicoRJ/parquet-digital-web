import React, { useState } from 'react';
import UserManual from '../../views/dashboard/sections/UserManual/UserManual.view';
import Introduction from '../../views/dashboard/sections/Introduction';
import MethodologicalNote from '../../views/dashboard/sections/MethodologicalNote/MethodologicalNote.view';
import { Modal } from '../layoutPieces';
import UserManualIcon from '../../assets/svg/UserManualIcon';
import InfoIcon from '../../assets/svg/InfoIcon';
import EditNoteIcon from '../../assets/svg/EditNoteIcon';
import SpeedIcon from '../../assets/svg/SpeedIcon';
import LogoutIcon from '../../assets/svg/LogoutIcon';
import RadarDePerfomanceIcon from '../../assets/svg/radarDePerformance';
import IndicadoresDeSucessoIcon from '../../assets/svg/indicadoresDeSucesso';

import {
  navBarLeftContent,
  topButtonDiv,
  logOutPositionDiv,
  userManualDiv,
  notaMetodologicaDiv,
  infosDiv,
  tempoTramitacaoDiv,
  logOutButtonDiv,
} from './navBarLeft.module.css';
import { useAppContext } from '../../../core/app/App.context';
import ProcessingTime from '../../views/dashboard/sections/ProcessingTime';
import PerformanceRadar from '../../views/dashboard/sections/PerformanceRadar';
import SuccessIndicators from '../../views/dashboard/sections/SuccessIndicators';

function NavbarLeft() {
  const [modalType, setModalType] = useState(false);
  const { currentOffice } = useAppContext();
  const { logout } = useAppContext();
  const [hoverUserManual, setHoverUserManual] = useState(false);
  const [hoverNotaMetodologica, setHoverNotaMetodologica] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoverTempoTramitacao, setHoverTempoTramitacao] = useState(false);
  const [hoverRadar, setHoverRadar] = useState(false);
  const [hoverIndicadores, setHoverIndicadores] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className={navBarLeftContent}>
      <div className={topButtonDiv}>
        <div
          className={infosDiv}
          onMouseOver={() => setHover(true)}
          onFocus={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onBlur={() => setHover(false)}
          onClick={() => setModalType('introduction')}
          onKeyUp={() => setHover(true)}
          role="button"
          tabIndex={-1}
        >
          <button type="button">
            {hover ? <InfoIcon fill="#154763" /> : <InfoIcon />}
          </button>
          <p>Informações</p>
        </div>

        {modalType === 'manual' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <UserManual />
            </div>
          </Modal>
        )}
        <div
          className={userManualDiv}
          onMouseOver={() => setHoverUserManual(true)}
          onFocus={() => setHoverUserManual(true)}
          onMouseOut={() => setHoverUserManual(false)}
          onBlur={() => setHoverUserManual(false)}
          onClick={() => setModalType('manual')}
          onKeyUp={() => setHoverUserManual(true)}
          role="button"
          tabIndex={-1}
        >
          <button type="button">
            {hoverUserManual ? <UserManualIcon fill="#154763" /> : <UserManualIcon />}
          </button>
          <p>Manual de uso</p>
        </div>

        {modalType === 'indicators' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <SuccessIndicators />
            </div>
          </Modal>
        )}

        {modalType === 'notaMetodologica' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <MethodologicalNote />
            </div>
          </Modal>
        )}
        <div
          className={notaMetodologicaDiv}
          onMouseOver={() => setHoverNotaMetodologica(true)}
          onFocus={() => setHoverNotaMetodologica(true)}
          onMouseOut={() => setHoverNotaMetodologica(false)}
          onBlur={() => setHoverNotaMetodologica(false)}
          onClick={() => setModalType('notaMetodologica')}
          onKeyUp={() => setHoverNotaMetodologica(true)}
          role="button"
          tabIndex={-1}
        >
          <button className="button" type="button">
            {hoverNotaMetodologica ? <EditNoteIcon fill="#154763" /> : <EditNoteIcon />}
          </button>

          <p>Nota Metodológica</p>
        </div>
        {modalType === 'introduction' && (
          <Modal withExitButton close={setModalType}>
            <Introduction />
          </Modal>
        )}

        {modalType === 'radar' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <PerformanceRadar />
            </div>
          </Modal>
        )}
        
        <div
          className={tempoTramitacaoDiv}
          onMouseOver={() => setHoverRadar(true)}
          onFocus={() => setHoverRadar(true)}
          onMouseOut={() => setHoverRadar(false)}
          onBlur={() => setHoverRadar(false)}
          onClick={() => setModalType('radar')}
          onKeyUp={() => setHoverRadar(true)}
          role="button"
          tabIndex={-1}
        >
          <button type="button">
            {hoverRadar ? <RadarDePerfomanceIcon fill="#154763" /> : <RadarDePerfomanceIcon />}
          </button>
          <p>Radar de Perfomance</p>
        </div>

        {modalType === 'tramitacao' && (
          <Modal withExitButton close={setModalType}>
            <ProcessingTime />
          </Modal>
        )}
        {currentOffice.tipo !== 7 ? (
        <div
          className={tempoTramitacaoDiv}
          onMouseOver={() => setHoverTempoTramitacao(true)}
          onFocus={() => setHoverTempoTramitacao(true)}
          onMouseOut={() => setHoverTempoTramitacao(false)}
          onBlur={() => setHoverTempoTramitacao(false)}
          onClick={() => setModalType('tramitacao')}
          onKeyUp={() => setHoverTempoTramitacao(true)}
          role="button"
          tabIndex={-1}
        >
          <button type="button">
            {hoverTempoTramitacao ? <SpeedIcon fill="#154763" /> : <SpeedIcon />}
          </button>
          <p>Tempo de tramitação</p>
        </div>
        ): null }
        {currentOffice.tipo === 2 ? (
        <div
          className={tempoTramitacaoDiv}
          onMouseOver={() => setHoverIndicadores(true)}
          onFocus={() => setHoverIndicadores(true)}
          onMouseOut={() => setHoverIndicadores(false)}
          onBlur={() => setHoverIndicadores(false)}
          onClick={() => setModalType('indicators')}
          onKeyUp={() => setHoverIndicadores(true)}
          role="button"
          tabIndex={-1}
        >
  
          <button type="button">
            {hoverIndicadores ? (
              <IndicadoresDeSucessoIcon fill="#154763" />
            ) : (
              <IndicadoresDeSucessoIcon />
            )}
          </button>
          <p>Indicadores de Sucesso</p>
        </div>
        ) : null}
      </div>

      <div className={logOutPositionDiv}>
        <div
          className={logOutButtonDiv}
          style={{ marginTop: '12.300rem' }}
          onMouseOver={() => setHoverLogout(true)}
          onFocus={() => setHoverLogout(true)}
          onMouseOut={() => setHoverLogout(false)}
          onBlur={() => setHoverLogout(false)}
          onClick={logout}
          onKeyUp={() => setHoverLogout(true)}
          role="button"
          tabIndex={-1}
        >
          <button type="button">
            {hoverLogout ? <LogoutIcon fill="#154763" /> : <LogoutIcon />}
          </button>
          <p>Sair</p>
        </div>
      </div>
    </div>
  );
}

export default NavbarLeft;
