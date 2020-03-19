import axios from 'axios';

import {
  LOGIN_URL,
  TODAY_OUT,
  TODAY_OUTLIERS,
  TODAY_ENTRIES,
  OPEN_CASES_URL,
  OPEN_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_URL,
  COURT_CASES_URL,
  CLOSED_CASES_URL,
  COURT_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_DETAILS_URL,
  OPEN_CASES_LIST,
} from './endpoints';

import { formatDateObjForBackend } from '../utils/formatters';
import {
  openInvestigationsTransform,
  openInvestigationsDetailsTransform,
  openCasesTransform,
  openCasesDetailsTransform,
  courtCasesTransform,
  courtCasesDetailsTransform,
  closedCasesTransform,
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
  openCasesListTransform,
} from './transforms';

import { setUser } from '../user';

const buildRequestConfig = jwt => ({ params: { jwt } });

const Api = (() => {
  async function login(token) {
    // FIXME: remove it when login being fully operational
    if (!token)
      token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJTSURORVlST1NBIiwic2NvcGUiOlsibGVpdHVyYSIsImVzY3JpdGEiXSwic2NhVXNlciI6eyJob3N0IjpudWxsLCJjcGZVc3VhcmlvIjoiMDczNTUwMDU3NjYiLCJsb2dpblVzdWFyaW8iOiJTSURORVlST1NBIiwibm9tZVVzdWFyaW8iOiJTSURORVkgUk9TQSBEQSBTSUxWQSBKVU5JT1IiLCJvcmdhb1VzdWFyaW8iOjQwMDU1MSwibm9tZU9yZ2FvVXN1YXJpbyI6IjE5wqogUFJPTU9UT1JJQSBERSBKVVNUScOHQSBERSBSRUdJw4NPIEVTUEVDSUFMIiwic2lnbGFPcmdhb1VzdWFyaW8iOiJQSjE5UkVTUCIsImlkIjoiZDNhMjEzYTdmYTZjZGFiNzVlYzkwYTE2NmNjOWJkMzM0MjFjNWQyYzQzZjUzMDQzZGFlZGIwOTAxZGQ5NTc2ZSIsImlwIjpudWxsLCJzaXN0ZW1hIjozNTQ4Niwibm9tZVNpc3RlbWEiOiJNR1BFIiwicm9sZXNTaXN0ZW1hIjpbXSwib3JnYW8iOjQwMDU1MSwibm9tZU9yZ2FvIjoiTUlOSVNUw4lSSU8gUMOaQkxJQ08gRE8gRVNUQURPIERPIFJJTyBERSBKQU5FSVJPIiwic2lnbGFPcmdhbyI6bnVsbCwicGVyZmlsIjo1ODAzNiwibm9tZVBlcmZpbCI6ImFjZXNzbyIsImNsYXNzZSI6Mzg0Niwibm9tZUNsYXNzZSI6Ik1FTUJSTyBBVElWTyIsIm9yaWdlbSI6bnVsbCwiY29tcG9uZW50ZXMiOnt9LCJmdW5jaW9uYWxpZGFkZXMiOlsiY29uc3VsdGFyX2ludGltYWNvZXNfcHJpbWVpcmFfaW5zdGFuY2lhIiwianVkaWNpYWxfcmVub21lYXJfdGl0dWxvX2FsdGVybmF0aXZvIiwiYWNlc3NvIiwiaW50ZWdyYV9qdWRpY2lhbF9wZXRpY2lvbmFtZW50byIsImdlc3Rhb19wcmltZWlyYV9pbnN0YW5jaWEiLCJhY2Vzc29fanVkaWNpYWxfcG9ydGFsIiwiaW50ZWdyYV9qdWRpY2lhbF92aXN1YWxpemFyX3BlY2FzX3Byb2MiLCJpbnRlZ3JhX2p1ZGljaWFsX2Rpc3RyaWJ1aWNhb19waXAiLCJqdWRpY2lhbF9tb2RlbG9zX3BldGljaW9uYW1lbnRvcyIsIm1ncGVfaXAiLCJpbnRlZ3JhX2p1ZGljaWFsX2FiZXJ0dXJhIiwianVkaWNpYWxfbWFudGVyX21pbnV0YV9pbnRpbWFjYW8iLCJpbnF1ZXJpdG9fZW52aWFyX3Byb21vY2FvIiwiaW50ZWdyYV9qdWRpY2lhbF9wZXRpY2lvbmFtZW50b19wb3JfY290YSIsImlucXVlcml0b19jcmltaW5hbCIsImlucXVlcml0b19kaXN0cmlidWlyIiwiaW50ZWdyYV9qdWRpY2lhbF9yZW5vbWVhcl9pbmRpY2UiXSwidGlja2V0IjoiY2U1ZTJkMTFjY2M1NGEzZTljNWExNjk5NDA3ZGNkYjY1OTM4MDg5NTY1MTAwMCIsInBhcmFtZXRyb3MiOnsic3NvX2hhYmlsaXRhZG8iOiJ0cnVlIiwic3NvX3VybF9yZWRpcmVjaW9uYW1lbnRvIjoiaHR0cDovL2QtYXBwcy5tcHJqLm1wLmJyL3Npc3RlbWEvbWdwZS8jLyIsInNzb19kYXRhc291cmNlX2puZGlfbmFtZSI6ImphdmE6amJvc3MvbWdwZURTIn0sInBlc3NESyI6NTA1ODk1LCJtYXRyaWN1bGEiOiIwMDAwMzI0MCIsImdyYW50ZWRBdXRocyI6W3siYXV0aG9yaXR5IjoiUk9MRV9DT05TVUxUQVJfSU5USU1BQ09FU19QUklNRUlSQV9JTlNUQU5DSUEifSx7ImF1dGhvcml0eSI6IlJPTEVfSlVESUNJQUxfUkVOT01FQVJfVElUVUxPX0FMVEVSTkFUSVZPIn0seyJhdXRob3JpdHkiOiJST0xFX0FDRVNTTyJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9JTlRFR1JBX0pVRElDSUFMX1BFVElDSU9OQU1FTlRPIn0seyJhdXRob3JpdHkiOiJST0xFX0dFU1RBT19QUklNRUlSQV9JTlNUQU5DSUEifSx7ImF1dGhvcml0eSI6IlJPTEVfQUNFU1NPX0pVRElDSUFMX1BPUlRBTCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9JTlRFR1JBX0pVRElDSUFMX1ZJU1VBTElaQVJfUEVDQVNfUFJPQyJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9JTlRFR1JBX0pVRElDSUFMX0RJU1RSSUJVSUNBT19QSVAifSx7ImF1dGhvcml0eSI6IlJPTEVfSlVESUNJQUxfTU9ERUxPU19QRVRJQ0lPTkFNRU5UT1MifSx7ImF1dGhvcml0eSI6IlJPTEVfTUdQRV9JUCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9JTlRFR1JBX0pVRElDSUFMX0FCRVJUVVJBIn0seyJhdXRob3JpdHkiOiJST0xFX0pVRElDSUFMX01BTlRFUl9NSU5VVEFfSU5USU1BQ0FPIn0seyJhdXRob3JpdHkiOiJST0xFX0lOUVVFUklUT19FTlZJQVJfUFJPTU9DQU8ifSx7ImF1dGhvcml0eSI6IlJPTEVfSU5URUdSQV9KVURJQ0lBTF9QRVRJQ0lPTkFNRU5UT19QT1JfQ09UQSJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9JTlFVRVJJVE9fQ1JJTUlOQUwifSx7ImF1dGhvcml0eSI6IlJPTEVfSU5RVUVSSVRPX0RJU1RSSUJVSVIifSx7ImF1dGhvcml0eSI6IlJPTEVfSU5URUdSQV9KVURJQ0lBTF9SRU5PTUVBUl9JTkRJQ0UifV0sImN1YSI6Ijk3NWYzZWE0LTY1MDUtNDg2MC1iYTlmLTViYWVkMWFkOTE3Ny1hYjc4IiwiYXV0aG9yaXRpZXMiOm51bGwsInBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6IlNJRE5FWVJPU0EiLCJhY2NvdW50Tm9uRXhwaXJlZCI6ZmFsc2UsImFjY291bnROb25Mb2NrZWQiOmZhbHNlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOmZhbHNlLCJlbmFibGVkIjpmYWxzZSwiZGVzY3JpY2FvVXN1YXJpbyI6IlNJRE5FWSBST1NBIERBIFNJTFZBIEpVTklPUiAoU0lETkVZUk9TQSkiLCJlbXB0eSI6ZmFsc2V9LCJleHAiOjE1ODQ1NjAzODAsImF1dGhvcml0aWVzIjpbIlJPTEVfSU5URUdSQV9KVURJQ0lBTF9QRVRJQ0lPTkFNRU5UTyIsIlJPTEVfSU5URUdSQV9KVURJQ0lBTF9BQkVSVFVSQSIsIlJPTEVfSU5RVUVSSVRPX0VOVklBUl9QUk9NT0NBTyIsIlJPTEVfQUNFU1NPX0pVRElDSUFMX1BPUlRBTCIsIlJPTEVfSU5URUdSQV9KVURJQ0lBTF9ESVNUUklCVUlDQU9fUElQIiwiUk9MRV9JTlRFR1JBX0pVRElDSUFMX1JFTk9NRUFSX0lORElDRSIsIlJPTEVfQUNFU1NPIiwiUk9MRV9JTlRFR1JBX0pVRElDSUFMX1ZJU1VBTElaQVJfUEVDQVNfUFJPQyIsIlJPTEVfSU5URUdSQV9KVURJQ0lBTF9QRVRJQ0lPTkFNRU5UT19QT1JfQ09UQSIsIlJPTEVfQ09OU1VMVEFSX0lOVElNQUNPRVNfUFJJTUVJUkFfSU5TVEFOQ0lBIiwiUk9MRV9NR1BFX0lQIiwiUk9MRV9JTlFVRVJJVE9fRElTVFJJQlVJUiIsIlJPTEVfSlVESUNJQUxfTU9ERUxPU19QRVRJQ0lPTkFNRU5UT1MiLCJST0xFX0lOUVVFUklUT19DUklNSU5BTCIsIlJPTEVfSlVESUNJQUxfUkVOT01FQVJfVElUVUxPX0FMVEVSTkFUSVZPIiwiUk9MRV9HRVNUQU9fUFJJTUVJUkFfSU5TVEFOQ0lBIiwiUk9MRV9KVURJQ0lBTF9NQU5URVJfTUlOVVRBX0lOVElNQUNBTyJdLCJqdGkiOiJhMzI2ZjMzNi0xYzAwLTRkNjMtYjdiNC0zOTZhZDhjOWY5NDYiLCJjbGllbnRfaWQiOiJtZ3BlLWxvZ2luLWFwcCJ9.bGLaVp4HDZmu87A1M2o4_zCRfFc4Ucd8XLqnabBXnBo';

    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axios.post(LOGIN_URL, formData);

    setUser(data);
  }

  /**
   * fetches percentage info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @return {number}    [description]
   */
  async function getTodayOutData({ orgao, token }) {
    const { data } = await axios.get(TODAY_OUT({ orgao }), buildRequestConfig(token));

    return todayOutTransform(data);
  }

  /**
   * fetches acervo info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @param  {date} date day you want tinfo from
   * @return {json}      { acervoQtd: Number, primQ: Number, mediana, terQ: Number, cod: number }
   */
  async function getTodayOutliersData({ orgao, token }, date) {
    const dateFormated = formatDateObjForBackend(date);
    const { data } = await axios.get(
      TODAY_OUTLIERS({ orgao, date: dateFormated }),
      buildRequestConfig(token),
    );

    return todayOutliersTransform(data);
  }

  async function getTodayEntriesData({ orgao, cpf, token }) {
    const { data } = await axios.get(TODAY_ENTRIES({ orgao, cpf }), buildRequestConfig(token));

    return todayEntriesTransform(data);
  }

  async function getOpenCases({ orgao, cpf, token }) {
    const { data } = await axios.get(OPEN_CASES_URL({ orgao, cpf }), buildRequestConfig(token));

    return openCasesTransform(data);
  }

  async function getOpenCasesDetails({ orgao, cpf, token }) {
    const { data } = await axios.get(
      OPEN_CASES_DETAILS_URL({ orgao, cpf }),
      buildRequestConfig(token),
    );

    return openCasesDetailsTransform(data);
  }

  async function getOpenInvestigations({ orgao, token }) {
    const { data } = await axios.get(OPEN_INVESTIGATIONS_URL({ orgao }), buildRequestConfig(token));

    return openInvestigationsTransform(data);
  }

  async function getOpenInvestigationsDetails({ orgao, token }) {
    const { data } = await axios.get(
      OPEN_INVESTIGATIONS_DETAILS_URL({ orgao }),
      buildRequestConfig(token),
    );

    return openInvestigationsDetailsTransform(data);
  }

  async function getCourtCases({ orgao, token }) {
    const { data } = await axios.get(COURT_CASES_URL({ orgao }), buildRequestConfig(token));

    return courtCasesTransform(data);
  }

  async function getCourtCasesDetails({ orgao, token }) {
    const { data } = await axios.get(COURT_CASES_DETAILS_URL({ orgao }), buildRequestConfig(token));

    return courtCasesDetailsTransform(data);
  }

  async function getClosedCases({ orgao, token }) {
    const { data } = await axios.get(CLOSED_CASES_URL({ orgao }), buildRequestConfig(token));

    return closedCasesTransform(data);
  }

  async function getOpenCasesList({ orgao, cpf, token }, list) {
    const { data } = await axios.get(
      OPEN_CASES_LIST({ orgao, cpf, list }),
      buildRequestConfig(token),
    );

    return openCasesListTransform(data);
  }

  return {
    login,
    getTodayOutData,
    getTodayOutliersData,
    getTodayEntriesData,
    getOpenCases,
    getOpenCasesDetails,
    getOpenInvestigations,
    getCourtCases,
    getClosedCases,
    getOpenInvestigationsDetails,
    getCourtCasesDetails,
    getOpenCasesList,
  };
})();

export default Api;
