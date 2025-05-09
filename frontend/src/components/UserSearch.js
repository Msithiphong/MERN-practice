import React, { useState } from 'react';
import axios from 'axios';


const UserSearch = () => {
    const [inputEmail, setInputEmail] = useState('');
    const[userEmail, setUserEmail] = useState(null);

    const fetchUser = async () => {
        try {
            const user = await axios.get(`http://localhost:5000/api/users/email/${inputEmail}`);
            setUserEmail(user.data)
        } catch (error) {
            setUserEmail(null);
            console.error('User not found or invalid email')
        }
    };

    return (
        <div>
            <h1>Read a User Record</h1>
            <input
                type="text"
                placeholder="Enter user email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
            />
            <button onClick={fetchUser}>Search</button>
            {userEmail && (
                <div>
                    <h2>User Search Result:</h2>
                    <p><strong>Name: {userEmail.name}</strong></p>
                    <p><strong>Email: {userEmail.email}</strong></p>
                </div>
            )}
        </div>
    )

};

export default UserSearch;