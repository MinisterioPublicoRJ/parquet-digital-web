import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { SectionTitle } from '../../components';
import Api from '../../api';
import { getUser } from '../../user';

class YourDesk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingOpenCases: true,
      loadingOpenInvestigations: true,
      loadingCourtCases: true,
      loadingClosedCases: true,
      activeTab: 'openCases',
    };
  }

  componentDidMount() {
    this.getOpenCases();
    this.getOpenInvestigations();
    this.getClosedCases();
    this.getCourtCases();
  }

 /**
  * load the number of open cases for the first button
  * @return {void} just saves it to the state
  */
  async getOpenCases() {
    let openCases;
    let errorOpenCases = false;
    try {
      openCases = await Api.getOpenCases(getUser());
    } catch (e) {
      errorOpenCases = true;
    } finally {
      this.setState({ openCases, errorOpenCases, loadingOpenCases: false });
    }
  }

  /**
   * load the number of open investigations for the second button
   * @return {void} just saves it to the state
   */
  async getOpenInvestigations() {
    let openInvestigations;
    let errorOpenInvestigations = false;
    try {
      openInvestigations = await Api.getOpenInvestigations(getUser());
      console.log('openInvestigations', openInvestigations);
    } catch (e) {
      errorOpenInvestigations = true;
    } finally {
      this.setState({
        openInvestigations,
        errorOpenInvestigations,
        loadingOpenInvestigations: false,
      });
    }
  }

  async getClosedCases() {
    let closedCases;
    let errorClosedCases;
    try {
      closedCases = await Api.getClosedCases(getUser());
    } catch (e) {
      errorClosedCases = true;
    } finally {
      this.setState({ closedCases, loadingClosedCases: false, errorClosedCases });
    }
  }

  async getCourtCases() {
    let courtCases;
    let errorCourtCases;
    try {
      courtCases = await Api.getCourtCases(getUser());
    } catch (e) {
      errorCourtCases = true;
    } finally {
      this.setState({ courtCases, errorCourtCases, loadingCourtCases: false });
    }
  }

  render() {
    return (
      <article className="yourDesk">
        <SectionTitle value="Sua Mesa" />
        <div className="desk-controlers"></div>
        <div className="desk-tabs"></div>
      </article>
    );
  }
}

export default YourDesk;
