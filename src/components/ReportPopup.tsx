import React from 'react';
import PopupWithForm from './PopupWithForm';

interface Props {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  onSubmit: (reportText: string, reportDate: string) => void;
  // onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
}

const ReportPopup = ({ isOpen, name, onClose, onSubmit }: Props) => {
  const [reportText, setReportText] = React.useState('');
  const [reportDate, setReportDate] = React.useState('');

  //useParams to set managerId

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(reportText, reportDate);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Report"
      submitButtonText="Add Report">
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            className="form__input form__input_type_report-text"
            id="report-text"
            type="text"
            name="report-text"
            placeholder="Report Text"
            required
            minLength={2}
            value={reportText || ''}
            onChange={(evt) => setReportText(evt.target.value)}
          />
          <span className="form__input-error" id="report-text-error" />
        </div>
        <div className="form__input-container">
          <input
            className="form__input form__input_type_report-date"
            id="report-date"
            type="date"
            name="report-date"
            placeholder="Due Date"
            required
            value={reportDate || ''}
            onChange={(evt) => setReportDate(evt.target.value)}
          />
          <span className="form__input-error" id="report-date-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default ReportPopup;
