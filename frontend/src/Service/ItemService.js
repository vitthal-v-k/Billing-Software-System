import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1.0';

const authHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const addItem = async (item) => {
    return await axios.post(`${BASE_URL}/admin/items`, item, {
        headers: authHeader()
    });
}

export const deleteItem = async (itemId) => {
    return await axios.delete(`${BASE_URL}/admin/items/${itemId}`, {
        headers: authHeader()
    });
}

export const fetchItems = async () => {
    return await axios.get(`${BASE_URL}/items`, {
        headers: authHeader()
    });
}
