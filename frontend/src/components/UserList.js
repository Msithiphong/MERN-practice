import React from 'react';

const UserList = ({ users }) => {
    return(
        <div>
            <h2> All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;