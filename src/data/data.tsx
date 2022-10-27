import { employeeDataArray } from '../model/employeeType';
const data: employeeDataArray = [
  {
    id: 1,
    picture: `https://randomuser.me/api/portraits/men/4.jpg`,
    name: 'Solomon Barayev',
    position: 'Web Developer',
    managerId: 2,
    myTasks: [
      {
        id: 1,
        text: 'Create a new project',
        dueDate: '2021-01-01',
      },
      {
        id: 2,
        text: 'Create a other project',
        dueDate: '2021-01-01',
      },
    ],
    mySubordinates: [3],
  },
  {
    id: 2,
    picture: `https://randomuser.me/api/portraits/men/4.jpg`,

    name: 'John Doe',
    position: 'Web Developer',
    managerId: 3,
    myTasks: [
      {
        id: 1,
        text: 'Create a new project',
        dueDate: '2021-01-01',
      },
    ],
    mySubordinates: [1],
  },
  {
    id: 3,
    picture: `https://randomuser.me/api/portraits/men/4.jpg`,

    name: 'John Cash',
    position: 'Secretary',
    managerId: 4,
    myTasks: [
      {
        id: 1,
        text: 'Create a new project',
        dueDate: '2021-01-01',
      },
    ],
    mySubordinates: [1],
  },
  {
    id: 4,
    picture: `https://randomuser.me/api/portraits/men/4.jpg`,

    name: 'John Doe',
    position: 'Web Developer',
    managerId: 5,
    myTasks: [
      {
        id: 1,
        text: 'Create a new project',
        dueDate: '2021-01-01',
      },
    ],
    mySubordinates: [1],
  },
  {
    id: 5,
    picture: `https://randomuser.me/api/portraits/men/4.jpg`,

    name: 'John Doe',
    position: 'Web Developer',
    managerId: 3,
    myTasks: [
      {
        id: 1,
        text: 'Create a new project',
        dueDate: '2021-01-01',
      },
    ],
    mySubordinates: [1],
  },
];

export default data;
