import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ userAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
            });
            console.log(response.data);
            setName('');
            setEmail('');
            userAdded();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            
            <input
                type="text"
                placeholder='Enter name'
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            
            <input 
                type="email"
                placeholder='Enter email'
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Add User</button>
        </form>
    );


};

export default UserForm;