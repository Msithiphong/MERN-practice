// components/UserList.js
import React, { useState } from 'react';
import axios from 'axios';

const UserList = ({ users, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editId}`, {
        name: editName,
        email: editEmail,
      });
      setEditId(null); 
      onUpdate();       
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        onUpdate();
    } catch (err) {
        console.error("Delete failed:", err);
    }
  };

  const startEdit = (user) => {
    setEditId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditEmail('');
  };

  

  return (
    <div>
    <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editId === user._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {user.name} - {user.email}
                <button onClick={() => startEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
