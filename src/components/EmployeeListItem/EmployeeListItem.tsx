import React from 'react';
import { Link } from 'react-router-dom';
import { employeeData } from '../../model/employeeType';

interface Props {
  employee: employeeData;
}

const EmployeeListItem = ({ employee }: Props) => {
  return (
    <li>
      <div className="employee-list-item">
        <p>{employee.name}</p>
        <p>{employee.position}</p>
        <Link to={`/employee/${employee.id}`}>
          <button>View</button>
        </Link>
      </div>
    </li>
  );
};

export default EmployeeListItem;
