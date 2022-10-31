import React from 'react';
import { ITask } from '../model/TaskData';
import api from '../utils/api';
import { AiOutlineCheckSquare } from 'react-icons/ai';

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

  const handleCompleteTask = (id: string) => {
    api
      .completeTask(localStorage.getItem('jwt'), id)
      .then((res) => {
        if (res) {
          setTasks(tasks.filter((task) => task._id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="tasks">
      <h1 className="tasks__title">Your Tasks</h1>
      {tasks.length > 0 ? (
        <ul className="tasks__list">
          {tasks.map((task) => (
            <li key={task._id} className="tasks__item">
              <h2 className="tasks__task-title">
                <span>Task: {task.title}</span>
                <span>Due date: {task.dueDate}</span>
              </h2>
              <AiOutlineCheckSquare
                className="tasks__complete-icon"
                onClick={() => handleCompleteTask(task._id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no tasks assigned to you.</p>
      )}
    </section>
  );
};

export default TasksPage;
