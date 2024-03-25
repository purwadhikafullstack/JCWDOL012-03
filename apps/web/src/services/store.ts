import axios from 'axios';

axios.defaults.withCredentials = true;

export const getStoreById = async (id: string) => {
  try {
    const response = await axios
      .get(`http://localhost:8000/api/admin/store/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    return response.data;
  } catch (error) {
    console.log(error);
  }
};