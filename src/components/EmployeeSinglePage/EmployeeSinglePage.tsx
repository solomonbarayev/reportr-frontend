import './EmployeeSinglePage.css';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useEmployees } from '../../contexts/EmployeesContext';
import { IEmployee } from '../../model/EmployeeData';
import api from '../../utils/api';
import { ITask } from '../../model/TaskData';

const EmployeeSinglePage = () => {
  //param
  const { id } = useParams<{ id: string }>();

  const { employees } = useEmployees();
  //state
  const [employee, setEmployee] = useState<IEmployee | undefined>(
    {} as IEmployee
  );
  const [tasks, setTasks] = useState<ITask[]>([]);

  // get id from params

  useEffect(() => {
    //api call to find specific employee
    api
      .getEmployee(localStorage.getItem('jwt'), id)
      .then((res: IEmployee) => {
        if (res) {
          setEmployee(res);
          console.log('employee', res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    //api call to fetch employee tasks if any
    api
      .getEmployeeTasks(localStorage.getItem('jwt'), id)
      .then((res: ITask[]) => {
        if (res) {
          setTasks(res);
        }
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
          <p>Name: {employee?.name}</p>
          <p>Position: {employee?.position}</p>
          <p>Manager: {employee?.managerId}</p>
        </div>
      </div>
      <div className="tasks">
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <p>{task.title}</p>
              <p>{task.dueDate}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="subordinates">
        <h2>Subordinates</h2>
        <ul>
          {employee?.mySubordinates?.map((subordinate: number) => (
            <li key={subordinate}>{subordinate}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default EmployeeSinglePage;
