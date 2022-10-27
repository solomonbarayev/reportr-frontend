import './EmployeeSinglePage.css';

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import data from '../../data/data';

const EmployeeSinglePage = () => {
  //param
  const { id } = useParams<{ id: string }>();

  let employee = data[Math.floor(Math.random() * data.length)];

  console.log(employee);

  return (
    <div>
      <h1>Employee Info Page</h1>
      <div className="info">
        <img src={employee.picture} alt="employee" />
        <div className="info__text">
          <p>Name: {employee.name}</p>
          <p>Position: {employee.position}</p>
          <p>Manager: {employee.managerId}</p>
        </div>
      </div>
      <div className="tasks">
        <h2>Tasks</h2>
        <ul>
          {employee.myTasks?.map(
            (task: { id: number; text: string; dueDate: string }) => (
              <li key={task.id}>
                <p>{task.text}</p>
                <p>Due Date: {task.dueDate}</p>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="subordinates">
        <h2>Subordinates</h2>
        <ul>
          {employee.mySubordinates?.map((subordinate: number) => (
            <li key={subordinate}>{subordinate}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeSinglePage;
