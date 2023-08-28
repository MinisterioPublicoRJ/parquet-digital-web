import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from '../../../core/app/App.context';

import {
  UserManual,
  Introduction,
  MethodologicalNote,
  ProcessingTime,
  PerformanceRadar,
  SuccessIndicators,
  Alerts,
} from '../../views/dashboard/sections';

import { Modal } from '../layoutPieces';

import {
  AlertsIcon,
  CloseIcon,
  ParquetDigitalLogo,
  MobileMenu,
  LogoutIcon,
  UserManualIcon,
  InfoIcon,
  EditNoteIcon,
  SpeedIcon,
  RadarDePerfomanceIcon,
  IndicadoresDeSucessoIcon,
} from '../../assets';

import {
  navbar,
  navbarList,
  navbarListItem,
  navbarLogout,
  mobileNavbar,
  extendNavbar,
  navIsOpen,
  mobileNavbarClose,
  mobileNavBtn,
  mobileAlertsBtn,
  mobileLogo,
  alertsMobile,
} from './navBarLeft.module.css';

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

  const [activeMobileNav, setActiveMobileNav] = useState(false);
  const [showAlers, setShowAlerts] = useState(false);

  return (
    <>
      <div className={`${navbar} ${activeMobileNav && extendNavbar}`}>
        <div className={`${mobileNavbar} ${(activeMobileNav || showAlers) && navIsOpen}`}>
          <button className={mobileNavBtn} type="button" onClick={() => setActiveMobileNav(true)}>
            <MobileMenu />
          </button>

          <div className={mobileLogo}>
            <ParquetDigitalLogo />
          </div>

          <button className={mobileAlertsBtn} type="button" onClick={() => setShowAlerts(true)}>
            <AlertsIcon />
          </button>

          <button
            className={mobileNavbarClose}
            type="button"
            onClick={() => {
              setActiveMobileNav(false);
              setShowAlerts(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div className={navbarList}>
          <div
            className={navbarListItem}
            onMouseOver={() => setHover(true)}
            onFocus={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onBlur={() => setHover(false)}
            onClick={() => setModalType('introduction')}
            onKeyUp={() => setHover(true)}
            role="button"
            tabIndex={-1}
          >
            <button type="button">{hover ? <InfoIcon fill="#154763" /> : <InfoIcon />}</button>
            <p>Informações</p>
          </div>

          <div
            className={navbarListItem}
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

          <div
            className={navbarListItem}
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

          <div
            className={navbarListItem}
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

          {currentOffice.tipo !== 7 ? (
            <div
              className={navbarListItem}
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
          ) : null}

          {currentOffice.tipo === 2 ? (
            <div
              className={navbarListItem}
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

        <div className={navbarLogout}>
          <div
            className={navbarListItem}
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

        {modalType === 'introduction' && (
          <Modal withExitButton close={setModalType}>
            <Introduction />
          </Modal>
        )}

        {modalType === 'manual' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <UserManual />
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

        {modalType === 'radar' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <PerformanceRadar />
            </div>
          </Modal>
        )}

        {modalType === 'tramitacao' && (
          <Modal withExitButton close={setModalType}>
            <ProcessingTime />
          </Modal>
        )}

        {modalType === 'indicators' && (
          <Modal withExitButton close={setModalType}>
            <div>
              <SuccessIndicators />
            </div>
          </Modal>
        )}
      </div>

      {showAlers &&
        createPortal(
          <div className={alertsMobile}>
            <Alerts />
          </div>,
          document.getElementById('alerts-mobile'),
        )}

      <div id="alerts-mobile" />
    </>
  );
}

export default NavbarLeft;
