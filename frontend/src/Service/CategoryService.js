import axios from "axios";

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
});

export const addCategory = async (formData) => {
    return await axios.post('http://localhost:8080/api/v1.0/admin/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data', ...getAuthHeaders() }
    });
}
export const deleteCategories = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/admin/categories/${categoryId}`, {
        headers: getAuthHeaders()
    });
}
export const fetchCategories = async () => {
    return await axios.get('http://localhost:8080/api/v1.0/categories', {
        headers: getAuthHeaders()
    });
}