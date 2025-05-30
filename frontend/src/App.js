import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserSearch from './components/UserSearch';

function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
      setShowUsers(true);
      console.log('fetched:', fetchUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };


  return (
    <div className="App">
      <h1>Add User</h1>
      <UserForm userAdded={fetchUsers} />
      <UserSearch />

      <button onClick={fetchUsers}>Display All Users</button>
      {showUsers && <UserList users={users} onUpdate={fetchUsers} />}
    </div>
  );
}

export default App;