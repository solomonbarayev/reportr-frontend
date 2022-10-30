import { Link } from 'react-router-dom';
import { IEmployee } from '../model/EmployeeData';

interface Props {
  employee: IEmployee;
}

const EmployeeListItem = ({ employee }: Props) => {
  return (
    <li>
      <div className="employee-list-item">
        <p>{`${employee.firstName} ${employee.lastName}`}</p>
        <p>{employee.position}</p>
        <Link to={`/employee/${employee._id}`}>
          <button>View</button>
        </Link>
      </div>
    </li>
  );
};

export default EmployeeListItem;
