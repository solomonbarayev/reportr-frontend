import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

interface Props {
  isOpen: boolean;
  name: string;
  onClose: () => void;
  onSubmit: (taskName: string, dueDate: string) => void;
}

const TaskPopup = ({ isOpen, name, onClose, onSubmit }: Props) => {
  const [taskName, setTaskName] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const handleTaskNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(evt.target.value);
  };

  const handleDueDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(taskName, dueDate);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Task"
      submitButtonText="Add Task">
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            className="form__input form__input_type_task-name"
            id="task-name"
            type="text"
            name="task-name"
            placeholder="Task Name"
            required
            minLength={2}
            value={taskName || ''}
            onChange={handleTaskNameChange}
          />
          <span className="form__input-error" id="task-name-error" />
        </div>
        <div className="form__input-container">
          <input
            className="form__input form__input_type_due-date"
            id="due-date"
            type="date"
            name="due-date"
            placeholder="Due Date"
            required
            value={dueDate || ''}
            onChange={handleDueDateChange}
          />
          <span className="form__input-error" id="due-date-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default TaskPopup;
