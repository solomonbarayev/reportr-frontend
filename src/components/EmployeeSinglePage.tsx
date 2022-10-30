import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee, ISubordinate } from '../model/EmployeeData';
import api from '../../src/utils/api';

interface Props {
  handleTaskPopupOpen: () => void;
  handleReportPopupOpen: () => void;
  setReportingToManager: (value: string) => void;
  setAssigningTaskToEmployee: (value: string) => void;
  loggedInUser: IEmployee;
}

const EmployeeSinglePage = ({
  handleTaskPopupOpen,
  handleReportPopupOpen,
  setReportingToManager,
  setAssigningTaskToEmployee,
  loggedInUser,
}: Props) => {
  //param
  const { id } = useParams<{ id: string }>();

  //state
  const [employee, setEmployee] = useState<IEmployee | undefined>(
    {} as IEmployee
  );
  const [subordinates, setSubordinates] = useState<ISubordinate[]>([]);

  const [isMyPage, setIsMyPage] = useState<boolean>(false);

  // if id is the same as the logged in user's id, then it's my page
  useEffect(() => {
    id === loggedInUser._id ? setIsMyPage(true) : setIsMyPage(false);
  }, [id, loggedInUser._id]);

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

    const managerId = employee?.managerId?._id;
    if (managerId) {
      setReportingToManager(managerId);
    }
  };

  const handleTaskButtonClick = (subordinate: ISubordinate) => {
    handleTaskPopupOpen();

    const employeeId = subordinate?._id;
    if (employeeId) {
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
            <p className="profile__info-text profile__info-text_type_position">
              Position: {employee?.position}
            </p>

            <div className="profile__info-divider"></div>

            {employee?.managerId && (
              <p className="profile__info-text profile__info-text_type_manager">
                <span>
                  Manager:{' '}
                  {`${employee?.managerId.firstName} ${employee?.managerId.lastName}`}{' '}
                </span>
                <button
                  disabled={!isMyPage}
                  onClick={handleReportButtonClick}
                  className={`profile__report-btn ${
                    !isMyPage ? 'profile__report-btn_disabled' : null
                  }`}>
                  Report
                </button>
              </p>
            )}
          </div>
        </section>

        <section className="profile__tasks">
          <div className="profile__header-container">
            <h2 className="profile__tasks-title">My Tasks</h2>
            <div className="profile__header-divider"></div>
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
            <p className="profile__tasks-text_no-tasks">
              No tasks assign to you
            </p>
          )}
        </section>
        {subordinates.length !== 0 && (
          <section className="profile__subordinates">
            <div className="profile__header-container">
              <h2 className="profile__subordinates-title">My Subordinates</h2>
              <div className="profile__header-divider"></div>
            </div>
            <ul className="profile__subordinates-list">
              {subordinates.map((subordinate: ISubordinate) => (
                <li
                  key={subordinate._id}
                  className="profile__subordinates-list-item">
                  <div className="profile__subordiantes_container">
                    <span className="profile__subordinates-name">
                      Name: {subordinate.firstName} {subordinate.lastName}
                    </span>
                    <span className="profile__subordinates-position">
                      Position: {subordinate.position}
                    </span>
                    <button
                      disabled={!isMyPage}
                      onClick={() => handleTaskButtonClick(subordinate)}
                      className={`profile__task-btn ${
                        !isMyPage ? 'profile__task-btn_disabled' : null
                      }`}>
                      Assign Task
                    </button>
                  </div>
                  <div className="profile__subordinates-divider"></div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default EmployeeSinglePage;
