import React from 'react';

export const OVERLAY_TEXTS = {
  PRCR: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre quais procedimentos possivelmente contêm algum
        crime já prescrito na data de hoje.
      </p>

      <p></p>

      <p>
        Meus cálculos são feitos com base nas regras gerais do Código Penal e se houver algum erro
        ou falta de registro nos bancos de dados, eles podem não ser perfeitos. Caso isso seja
        corrigido, minha precisão melhora bastante!
      </p>

      <p></p>

      <p>Para este caso, meus cálculos foram os seguintes:</p>

      <p></p>

      <p>Tipo Penal: INSERIR DADOS</p>

      <p>Máximo de Pena: INSERIR DADOS</p>

      <p>Data de início: INSERIR DADOS</p>

      <p>Data de prescrição: INSERIR DADOS</p>

      <p></p>

      <p>
        Como a data de prescrição está no passado, reconheço que há a prescrição que eu lhe alertei.
        Se eu estiver certo, você pode utilizar o botão de gerar peça e eu lhe entrego um modelo de
        sugestão.
      </p>
    </div>
  ),
  GATE: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre Instruções Técnicas do GATE que foram elaboradas
        entre a última vez que você viu este procedimento e a data de hoje.
      </p>

      <p></p>

      <p>
        Para que o alerta deixe de aparecer, basta que você receba o procedimento para trabalhar
        novamente, ou que aperte o botão dispensar. Enquanto ele está disponível, você pode pedir
        para baixar IT e eu busco ela no GATE, deixando disponível tanto para leitura quanto para
        download em nova aba do navegador.
      </p>
    </div>
  ),
  MCSI: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre Instruções Técnicas da CSI que foram elaboradas
        entre a última vez que você viu este procedimento e a data de hoje.
      </p>

      <p></p>

      <p>
        Para que o alerta deixe de aparecer, basta que você receba o procedimento para trabalhar
        novamente, ou que você aperte o botão dispensar. Enquanto ele está disponível, você pode
        pedir para baixar IT e eu busco ela na CSI para você, deixando disponível tanto para leitura
        quanto para download em nova aba do navegador.
      </p>
    </div>
  ),
  MVVD: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar sobre vítimas que reconheci que apareceram mais de uma
        vez em documentos que versam sobre violência doméstica.
      </p>

      <p></p>

      <p>
        O alerta só aparece se o documento passou por aqui nos últimos 30 dias, mas você também
        poderá dispensar sempre que quiser.
      </p>
    </div>
  ),
  IC1A: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar se um Inquérito Civil está há mais de um ano sem
        prorrogação.
      </p>

      <p></p>

      <p>
        Neste caso, ele fez um ano sem prorrogação no dia INSERIR DADOS, após ter ocorrido a
        MOVIMENTO no dia INSERIR DADOS.
      </p>

      <p></p>

      <p>
        Caso você concorde com meus cálculos, você pode utilizar o botão de gerar peça e eu lhe
        entrego um modelo de sugestão.
      </p>
    </div>
  ),
  PA1A: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar se um Procedimento Administrativo está aberto há mais de
        um ano.
      </p>

      <p></p>

      <p>
        Neste caso, ele fez um ano no dia INSERIR DADOS, após ter sido cadastrado no nosso sistema
        no dia INSERIR DADOS.
      </p>

      <p></p>

      <p>
        Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
        utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
      </p>
    </div>
  ),
  PPFP: (
    <div>
      <p>Neste alerta, eu busco lhe informar se um Procedimento Preparatório está fora do prazo.</p>

      <p></p>

      <p>
        Neste caso, o alerta aparece se o Procedimento Preparatório foi criado no sistema e se
        passaram mais de 30 dias sem prorrogação, ou se, mesmo após a prorrogação, já se passaram
        mais de 180 dias de sua criação.
      </p>

      <p></p>

      <p>
        Este procedimento foi cadastrado no nosso sistema no dia INSERIR DADOS e agora ele se
        encontra fora do prazo.
      </p>

      <p></p>

      <p>
        Caso você concorde com meus cálculos e queira convertê-lo em Inquérito Civil, você pode
        utilizar o botão de gerar peça e eu lhe entrego um modelo de sugestão.
      </p>
    </div>
  ),
  OUVI: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que um expediente de ouvidoria não foi recebido nesta
        Promotoria de Justiça, apesar de ter guia de enviado para cá.
      </p>

      <p></p>

      <p>
        Para que o alerta deixe de aparecer, basta receber a guia e promover o lançamento da data de
        recebimento no MGP.
      </p>
    </div>
  ),
  NF30: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que uma notícia de fato foi autuada há mais de 120 dias e
        não teve uma destinação dada.
      </p>

      <p></p>

      <p>
        Para que o alerta deixe de aparecer, basta indeferir de plano ou instaurar procedimento e
        registrar no sistema.
      </p>
    </div>
  ),
  VADF: (
    <div>
      <p>
        Neste alerta, eu busco lhe avisar que um documento que está registrado como fechado está com
        vista aberta em sua mesa. Neste caso, o documento provavelmente não deveria estar ali, ou
        está com registro muito errado no banco.
      </p>

      <p></p>

      <p>
        Para que o alerta deixe de aparecer, basta fechar a vista, retornar o procedimento ao
        arquivo, ou, caso seja hipótese de erro de registro, pedir a retificação no MGP.
      </p>
    </div>
  ),
  DT2I: (
    <div>
      <p>
        Neste alerta, eu busco lhe informar que este procedimento no qual você trabalhou teve um
        movimento processual na segunda instância. Isso pode te permitir acompanhar o andamento do
        que você fez na instância superior, finalmente obtendo o conhecimento do resultado final de
        seu trabalho.
      </p>

      <p></p>

      <p>
        O alerta só fica disponível para visualização por uma semana, então não se preocupe, pois
        ele irá sumir sozinho. De todo modo, caso não queira mais vê-lo, pode clicar na opção
        dispensar.
      </p>
    </div>
  ),
};
