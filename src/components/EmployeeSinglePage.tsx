import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee, ISubordinate } from '../model/EmployeeData';
import api from '../../src/utils/api';

interface Props {
  handleTaskPopupOpen: () => void;
  handleReportPopupOpen: () => void;
  setReportingToManager: (value: string) => void;
  setAssigningTaskToEmployee: (value: string) => void;
}

const EmployeeSinglePage = ({
  handleTaskPopupOpen,
  handleReportPopupOpen,
  setReportingToManager,
  setAssigningTaskToEmployee,
}: Props) => {
  //param
  const { id } = useParams<{ id: string }>();

  //state
  const [employee, setEmployee] = useState<IEmployee | undefined>(
    {} as IEmployee
  );
  const [subordinates, setSubordinates] = useState<ISubordinate[]>([]);

  useEffect(() => {
    //api call to find specific employee
    api
      .getEmployee(localStorage.getItem('jwt'), id)
      .then((res) => {
        res && setEmployee(res.employeeInfo);
        res.managerialInfo &&
          setSubordinates(res.managerialInfo.mySubordinates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleReportButtonClick = () => {
    handleReportPopupOpen();
    // console.log("employee's manager id: ", employee?.managerId?._id);
    // setReportingToManager(employee?.managerId?._id);
    const managerId = employee?.managerId?._id;
    if (managerId) {
      console.log(managerId);
      setReportingToManager(managerId);
    }
  };

  const handleTaskButtonClick = (subordinate: ISubordinate) => {
    handleTaskPopupOpen();

    const employeeId = subordinate?._id;
    if (employeeId) {
      console.log(employeeId);
      setAssigningTaskToEmployee(employeeId);
    }
  };

  return (
    <section className="profile">
      <div className="profile__container">
        <section className="profile__info">
          <div
            className="profile__image"
            style={{
              backgroundImage: `url(${employee?.picture})`,
            }}></div>
          <div className="profile__info-text-container">
            <h1 className="profile__title">
              Name: {`${employee?.firstName} ${employee?.lastName}`}
            </h1>
            <p className="profile__info-text">Position: {employee?.position}</p>

            <div className="profile__info-divider"></div>

            {employee?.managerId && (
              <p className="profile__info-text profile__info-text_type_manager">
                <span>
                  Manager:{' '}
                  {`${employee?.managerId.firstName} ${employee?.managerId.lastName}`}{' '}
                </span>
                <button
                  onClick={handleReportButtonClick}
                  className="profile__report-btn">
                  Report
                </button>
              </p>
            )}
          </div>
        </section>

        <section className="profile__tasks">
          <div className="profile__tasks-title-container">
            <h2 className="profile__tasks-title">My Tasks</h2>
            <div className="profile__tasks-title-container-divider"></div>
          </div>
          {employee?.myTasks?.length !== 0 ? (
            <ul className="profile__tasks-list">
              {employee?.myTasks?.map((task) => (
                <li key={task._id} className="profile__tasks-item">
                  <p className="profile__tasks-text">- {task.title}</p>
                  <p className="profile__tasks-text">
                    Deadline: {task.dueDate}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="profile__tasks-text">No tasks assign to you</p>
          )}
        </section>
        {subordinates.length !== 0 ? (
          <div className="subordinates">
            <h2>Subordinates</h2>
            <ul>
              {subordinates.map((subordinate: ISubordinate) => (
                <li key={subordinate._id}>
                  <span>
                    {subordinate.firstName} {subordinate.lastName}
                  </span>
                  <button onClick={() => handleTaskButtonClick(subordinate)}>
                    Assign Task
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default EmployeeSinglePage;
