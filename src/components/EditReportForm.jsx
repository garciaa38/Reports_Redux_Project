import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reportDetails } from '../store/reports';
import ReportForm from './ReportForm';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = useSelector(state=>state.reports[`${reportId}`]); // populate from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reportDetails(reportId))
  }, [dispatch, reportId])

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;

