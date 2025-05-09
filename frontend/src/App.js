import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
      setShowUsers(true);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };


  return(
    <div className="App">
      <h1>Add User</h1>
      <UserForm userAdded={fetchUsers}/>

      <button onClick={fetchUsers}>Display All Users</button>
      {showUsers && <UserList users={users}/>}
    </div>
  );
}

export default App;