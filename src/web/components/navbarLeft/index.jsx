import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Alerts } from '../../views/dashboard/sections';

import { AlertsIcon, CloseIcon, ParquetDigitalLogo, MobileMenu } from '../../assets';

import {
  navbarWrapper,
  navbar,
  mobileLogo,
  navbarListWrapper,
  mobileNavbar,
  mobileNavContent,
  mobilePortalWrapper,
  animationStartRight,
  animationStartLeft,
} from './navBarLeft.module.css';

import NavbarList from './navbarList/NavbarList';

function NavbarLeft() {
  const mobilePortalClosed = { isOpen: false, type: '' };
  const [mobilePortal, setMobilePortal] = useState(mobilePortalClosed);

  const openMobilePortal = (event) => {
    const portalType = event.currentTarget.id;
    setMobilePortal({ isOpen: true, type: portalType });
  };

  /* 
    Para desabilitar o scroll da página inicial quando o portal mobile é aberto,
    mantendo o scroll apenas dentro do portal.
  */
  const disabledBodyScrolling = () => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  // Para voltar os valores padrões da página inicial.
  const defaultBodyScrolling = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (mobilePortal.isOpen) {
      disabledBodyScrolling();
    } else {
      defaultBodyScrolling();
    }
  }, [mobilePortal.isOpen]);

  return (
    <div className={navbarWrapper}>
      <div className={navbar}>
        <div className={mobileNavbar}>
          <button type="button" id="navbar-list" onClick={openMobilePortal}>
            <MobileMenu />
          </button>

          <div className={mobileLogo}>
            <ParquetDigitalLogo />
          </div>

          <button type="button" id="alerts" onClick={openMobilePortal}>
            <AlertsIcon />
          </button>
        </div>
        <div className={navbarListWrapper}>
          <NavbarList />
        </div>
      </div>

      {mobilePortal.isOpen &&
        createPortal(
          <div
            className={`${mobilePortalWrapper} ${
              mobilePortal.type === 'navbar-list' ? animationStartRight : animationStartLeft
            }`}
          >
            <div className={mobileNavbar}>
              <div className={mobileLogo}>
                <ParquetDigitalLogo />
              </div>

              <button type="button" onClick={() => setMobilePortal(mobilePortalClosed)}>
                <CloseIcon />
              </button>
            </div>

            <div className={mobileNavContent}>
              {mobilePortal.type === 'navbar-list' && <NavbarList />}
              {mobilePortal.type === 'alerts' && (
                <div>
                  <Alerts />
                </div>
              )}
            </div>
          </div>,
          document.getElementById('mobile-portal'),
        )}
    </div>
  );
}

export default NavbarLeft;
