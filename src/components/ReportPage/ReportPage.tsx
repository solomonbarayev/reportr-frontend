import React from 'react';
import { IReport } from '../../model/ReportData';
import api from '../../utils/api';

const ReportPage = () => {
  const [reports, setReports] = React.useState<IReport[]>([] as IReport[]);

  React.useEffect(() => {
    api
      .getCurrentUserReports(localStorage.getItem('jwt'))
      .then((res) => {
        if (res) {
          console.log(res);
          setReports(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Your Reports</h1>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <h2>{report.text}</h2>
              <p>
                Submitted By: {report.employeeId.firstName}{' '}
                {report.employeeId.lastName} on {report.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no reports submitted to you.</p>
      )}
    </div>
  );
};

export default ReportPage;
