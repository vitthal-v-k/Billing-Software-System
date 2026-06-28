import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1.0';

const authHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const addUser = async (user) => {
    return await axios.post(`${BASE_URL}/register`, user, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export const deleteUser = async (id) => {
    return await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: authHeader()
    });
}

export const fetchUsers = async () => {
    return await axios.get(`${BASE_URL}/users`, {
        headers: authHeader()
    });
}