import ReportForm from './ReportForm';

const CreateReportForm = () => {
  //console.log('AM I HERE?')
  const report = {
    understanding: '',
    improvement: ''
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <ReportForm
      report={report}
      formType="Create Report"
    />
  );
};

export default CreateReportForm;
