import React from 'react';
import MANUALPIP from './userManualPdfs/manual_pip.pdf';
import { useAppContext } from '../../../../../core/app/App.context';
import {glossaryWrapper,glossaryIntroSubtitle, glossaryIntro, glossaryArticlesWrapper} from './userManual.module.css'

function UserManual() {
  const { currentOffice } = useAppContext();
  const { tipo } = currentOffice;

  return (
    <div className={glossaryWrapper}>
      <div className={glossaryIntro}>
        <div className={glossaryIntroSubtitle}>
          <p>Manual de uso</p>
        </div>
        <h2>Parquet Digital</h2>
        <p>
          Este manual visa auxiliar o usuário a potecializar a capacidade da ferramenta em solucionar
          demandas dentro de sua Promotoria de Justiça
        </p>
      </div>
      <div className={glossaryArticlesWrapper}>
        {tipo === 1 ?(
          <a 
          target="_blank"
          onClick={event => {
              event.preventDefault();
              window.open(MANUALPIP);
            }
          }
         ><p>Acessar Manual</p>
         </a>    
        ) : (
        <a 
         target="_blank"
         onClick={event => {
             event.preventDefault();
             window.open(MANUALPIP);
           }
         }
        ><p>Acessar Manual</p>
        </a>   
        )}     
      </div>
    </div>
  );
}

export default UserManual;
