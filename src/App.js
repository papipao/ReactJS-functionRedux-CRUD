import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUser } from './features/Users';

function App() {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const [person, setperson] = React.useState({ name: '', username: '' });
  const [newUserName, setNewUserName] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setperson({ ...person, [name]: value });
    console.log(person);
  };

  const handleSubmit = () => {
    const newPerson = { ...person, id: userList[userList.length - 1].id + 1 };
    console.log(newPerson);
    dispatch(addUser(newPerson));
    setperson({ name: '', username: '' });
  };

  return (
    <div className='container'>
      <div className='addUsers'>
        <input
          type='text'
          name='name'
          placeholder='Name...'
          onChange={handleChange}
          value={person.name}
        />
        <input
          type='text'
          name='username'
          placeholder='Username...'
          onChange={handleChange}
          value={person.username}
        />
        <button onClick={handleSubmit}>Add User</button>
      </div>
      <div className='displayUsers'>
        {userList.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h2>{user.username}</h2>
            <input
              type='text'
              name='newusername'
              placeholder='New Username...'
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button onClick={() => dispatch(updateUser({ id: user.id, username: newUserName }))}>
              Update
            </button>
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
