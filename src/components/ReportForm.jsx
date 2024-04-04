import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addReport } from '../store/reports';
import { useDispatch, useSelector } from 'react-redux';

const ReportForm = ({ report, formType }) => {
  //console.log('TEST', report)
  const navigate = useNavigate();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});
  //const [submitted, setSubmitted] = useState(false);

  const reports = useSelector(state=>state.reports)
  const newReportId = Number(Object.keys(reports)[Object.keys(reports).length - 1]) + 1; 
  
  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorHandle = {};
    console.log('UNDERSTANDING', understanding)
    if (understanding === "") errorHandle.understanding = 'Understanding is required'
  

    console.log('IMPROVEMENT', improvement)
    if (improvement === "") errorHandle.improvement = 'Improvement is required'
  
    setErrors(errorHandle)
    console.log('ERROR HANDLE', errorHandle)

    console.log('ERRORS', errors)

    console.log('LENGTH OF ERRORS', Object.keys(errors).length)

    if (!Object.keys(errorHandle).length) {
      setErrors({});
      report = { ...report, understanding, improvement };

      const newReport = await dispatch(addReport(report));
      report = newReport;

      navigate(`/reports/${newReportId}`)
    }



  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;
