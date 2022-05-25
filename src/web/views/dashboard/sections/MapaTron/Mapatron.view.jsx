import React from 'react';
import PropTypes from 'prop-types';
import { PromotronGlossario } from '../../../../assets';
import {
  mapatronWrapper,
  mapatronIntro,
  mapatronLinks,
  mapatronBtn,
  mapatronIframeWrapper,
} from './styles.module.css';

const propTypes = {
};

function MapaTron({ mapatronData }) {
  return (
    <div className={ mapatronWrapper }>
      <div className={ mapatronIntro }>
        <h2>Mapa da Atuação</h2>
        <p>Certifique-se de estar com login ativo no ArcGIS para poder visualizar. </p>
        <p>
          Olá! Para facilitar o entendimento da situação criminal em sua área, separei a análise
          em 3 macro áreas. Desta forma, trago (1) o que ocorre em sua área (excluída a cifra
          negra) pelos dados gerais do ISP; (2) o que tem chegado para você trabalhar, por meio
          dos Registros de Ocorrência da área; e (3) o que você tem feito, a partir das
          informações do banco de dados institucional, que vêm do MGP ou Integra.
        </p>
        <p>
          É possível trocar as visualizações apenas clicando na base de dados desejada abaixo:
        </p>
        <div className={ mapatronLinks }>
          {/*
            <a
              className={ mapatronBtn }
              href={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/9062e8f6462349978f249fb63c5f68a5?pip=${currentOffice.codigo}&dp=${currentOffice.dps}`}
              target="ArcGIS"
            >
              PAINEL
            </a>
            */}
          <a
            className={ mapatronBtn }
            href={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/dbed4fab28454c2883f878e8eb75039f?pip=${mapatronData}`}
            target="ArcGIS"
          >
            RO
          </a>
          <a
            className={ mapatronBtn }
            href={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/22d0c308f62648ed9d3eba20cc3b91b6?pip=${mapatronData}`}
            target="ArcGIS"
          >
            ISP
          </a>
          <a
            className={ mapatronBtn }
            href={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/33db824355854d459e98d77735df7ac2?pip=${mapatronData}`}
            target="ArcGIS"
          >
            MGP
          </a>
        </div>
        <PromotronGlossario height={400} />
      </div>
      <div className={ mapatronIframeWrapper }>
        <iframe
          title="Mapa de Atuação - ArcGIS"
          name="ArcGIS"
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="0"
          src={`https://geo.mprj.mp.br/portal/apps/opsdashboard/index.html#/dbed4fab28454c2883f878e8eb75039f?pip=${mapatronData}`}
        />
      </div>
    </div>
  );
}
MapaTron.propTypes = propTypes;
export default MapaTron;
