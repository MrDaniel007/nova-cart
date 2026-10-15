import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://69de1b5c410caa3d47ba9ff4.mockapi.io/spaced',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const addProduct = async (newProduct) => {
    const response = await api.post('/product', newProduct);
    return response.data;
}

export const updateProduct = async (id, updatedProduct) => {
    const response = await api.put(`/product/${id}`, updatedProduct);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
}