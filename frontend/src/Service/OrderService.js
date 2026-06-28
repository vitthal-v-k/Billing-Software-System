import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1.0';

const authHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const latestOrders = async () => {
    return await axios.get(`${BASE_URL}/orders/latest`, { headers: authHeader() });
}

export const createOrder = async (order) => {
    return await axios.post(`${BASE_URL}/orders`, order, { headers: authHeader() });
}

export const deleteOrder = async (id) => {
    return await axios.delete(`${BASE_URL}/orders/${id}`, { headers: authHeader() });
}