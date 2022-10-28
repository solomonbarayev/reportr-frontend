import './EmployeeSinglePage.css';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee, ISubordinate } from '../../model/EmployeeData';
import api from '../../utils/api';
import { ITask } from '../../model/TaskData';

const EmployeeSinglePage = () => {
  //param
  const { id } = useParams<{ id: string }>();

  //state
  const [employee, setEmployee] = useState<IEmployee | undefined>(
    {} as IEmployee
  );
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [manager, setManager] = useState<IEmployee | undefined>(
    {} as IEmployee
  );

  useEffect(() => {
    //api call to find specific employee
    api
      .getEmployee(localStorage.getItem('jwt'), id)
      .then((res: IEmployee) => {
        console.log(res);
        res && setEmployee(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
                <button>Report</button>
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
      {employee?.mySubordinates?.length !== 0 ? (
        <div className="subordinates">
          <h2>Subordinates</h2>
          <ul>
            {employee?.mySubordinates?.map((subordinate: ISubordinate) => (
              <li key={subordinate._id}>
                <span>{subordinate.firstName}</span>
                <button>Assign Task</button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default EmployeeSinglePage;
