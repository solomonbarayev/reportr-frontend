import React from 'react';
import { ITask } from '../../model/TaskData';
import api from '../../utils/api';

const TasksPage = () => {
  const [tasks, setTasks] = React.useState<ITask[]>([] as ITask[]);

  React.useEffect(() => {
    api
      .getCurrentUserTasks(localStorage.getItem('jwt'))
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h2>
              <span>{task.title}</span>
              <span>{task.dueDate}</span>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
