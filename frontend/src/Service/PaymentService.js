import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1.0';

const authHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const createRazorpayOrder = async (data) => {
    return await axios.post(`${BASE_URL}/payments/create-order`, data, { headers: authHeader() });
}

export const verifyPayment = async (paymentData) => {
    return await axios.post(`${BASE_URL}/payments/verify`, paymentData, { headers: authHeader() });
}