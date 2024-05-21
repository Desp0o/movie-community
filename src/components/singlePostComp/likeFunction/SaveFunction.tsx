import { useMutation } from 'react-query';
import axios from 'axios';

const useSavePost = () => {
    return useMutation(async (postID:number) => {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`https://api.pinky.ge/api/saving/${postID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    });
};

export { useSavePost };
