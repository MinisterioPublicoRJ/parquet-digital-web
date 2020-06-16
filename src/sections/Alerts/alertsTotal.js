async getAlertsListTotal() {
    let alertsTotal;
    let errorAlerts = false;
    try {
      alertsTotal = await Api.getAlertsListTotal(getUser());
      console.log(alertsTotal);
    } catch (e) {
      errorAlerts = true;
    } finally {
      this.setState({ alertsTotal, errorAlerts, loading: false });
    }
  }
