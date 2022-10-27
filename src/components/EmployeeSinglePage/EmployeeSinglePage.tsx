import './EmployeeSinglePage.css';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee } from '../../model/EmployeeData';
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
        res && setEmployee(res);
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
        res && setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    //api call to fetch employee manager if any
    api
      .getManager(localStorage.getItem('jwt'), id)
      .then((res: IEmployee) => {
        res && setManager(res);
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
          <p>Manager: {`${manager?.firstName} ${manager?.lastName}`} </p>
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
