/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId
});

/** Thunk Action Creators: */
//Fetch all reports
export const fetchReports = () => async dispatch => {
  const response = await fetch('/api/reports');
  const reports = await response.json();
  dispatch(loadReports(reports));
}

//Delete a Report
export const deleteReport = (reportId) => async dispatch => {
  const res = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  })

  if (res.ok) {
    dispatch(removeReport(reportId))
    
  } else {
    console.error("Oh no, it didn't work")
  }
}

//Load single report details
export const reportDetails = (reportId) => async dispatch => {
  const res = await fetch(`/api/reports/${reportId}`);
  
  if (res.ok) {
    const report = await res.json();
    console.log(report)
    dispatch(receiveReport(report))
  }
}

//Create a Report
export const addReport = (report) => async dispatch => {
  const res = await fetch(`/api/reports`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(report)
  })
  //console.log('RESPONSE', res)
  if (res.ok) {
    const newReport = await res.json();
    console.log('NEW REPORT', newReport)
    dispatch(editReport(newReport))
  } else {
    console.error("Please complete your form!")
  }
}

//Edit a Report


/** Selectors: */

/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      console.log('STATE', state)
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
