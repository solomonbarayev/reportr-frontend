import './EmployeeSinglePage.css';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee, ISubordinate } from '../../model/EmployeeData';
import api from '../../utils/api';

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
    <div>
      <h1>Employee Info Page</h1>
      <div className="info">
        <img src={employee?.picture} alt="employee" />
        <div className="info__text">
          <p>Name: {`${employee?.firstName} ${employee?.lastName}`}</p>
          <p>Position: {employee?.position}</p>
          {employee?.managerId && (
            <p>
              Manager:{' '}
              {`${employee?.managerId.firstName} ${employee?.managerId.lastName}`}
              <span>
                <button onClick={handleReportButtonClick}>Report</button>
              </span>
            </p>
          )}
        </div>
      </div>
      {employee?.myTasks?.length !== 0 ? (
        <div className="tasks">
          <h2>Tasks</h2>
          <ul>
            {employee?.myTasks?.map((task) => (
              <li key={task._id}>
                <p>{task.title}</p>
                <p>{task.dueDate}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="tasks">
          <h2>Tasks</h2>
          <p>No tasks assigned</p>
        </div>
      )}
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
  );
};

export default EmployeeSinglePage;
