import { Link } from 'react-router-dom';
import ReportIndexItem from './ReportIndexItem';
import { resetDatabase } from '../mocks/storage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { fetchReports } from '../store/reports';

const ReportsIndex = () => {
  const dispatch = useDispatch();
  const reports = Object.values(useSelector(state=>state.reports)); // populate from Redux store


  useEffect(() => {
    dispatch(fetchReports())
  }, [dispatch])

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
      <button onClick={resetDatabase}>Reset the Database</button>
    </section>
  );
};

export default ReportsIndex;
