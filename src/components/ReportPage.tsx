import React from 'react';
import { IReport } from '../model/ReportData';
import api from '../utils/api';

const ReportPage = () => {
  const [reports, setReports] = React.useState<IReport[]>([] as IReport[]);

  React.useEffect(() => {
    api
      .getCurrentUserReports(localStorage.getItem('jwt'))
      .then((res) => {
        if (res) {
          setReports(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="reports">
      <h1 className="reports__title">Your Reports</h1>
      {reports.length > 0 ? (
        <ul className="reports__list">
          {reports.map((report) => (
            <li key={report._id}>
              <h2 className="reports__report-title">{report.text}</h2>
              <p className="reports__subordinate-info">
                Submitted By: {report.employeeId.firstName}{' '}
                {report.employeeId.lastName} on {report.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no reports submitted to you.</p>
      )}
    </section>
  );
};

export default ReportPage;
