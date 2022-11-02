import TaskPageItem from './TaskPageItem';
import React from 'react';
import { ITask } from '../interfaces/TaskData';
import api from '../utils/api';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';

const TasksPage = () => {
  const [tasks, setTasks] = React.useState<ITask[]>([] as ITask[]);
  const [isTasksLoading, setIsTasksLoading] = React.useState<boolean>(true);

  const authContext = useAuth();

  React.useEffect(() => {
    api
      .getCurrentUserTasks(authContext!.token)
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsTasksLoading(false);
      });
  }, []);

  const handleCompleteTask = (id: string) => {
    api
      .completeTask(authContext!.token, id)
      .then((res) => {
        if (res) {
          setTasks(tasks.filter((task) => task._id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isTasksLoading) {
    return <Loader />;
  }

  return (
    <section className="tasks">
      <h1 className="tasks__title">Your Tasks</h1>
      {tasks.length > 0 ? (
        <ul className="tasks__list">
          {tasks.map((task) => (
            <TaskPageItem
              key={task._id}
              task={task}
              handleCompleteTask={handleCompleteTask}
            />
          ))}
        </ul>
      ) : (
        <p>You have no tasks assigned to you.</p>
      )}
    </section>
  );
};

export default TasksPage;
