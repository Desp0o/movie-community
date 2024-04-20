import axios from 'axios';
const token = localStorage.getItem('token')

export const Guling = async (postID: number) => {
    try {
      const response = await axios.get(`https://api.pinky.ge/api/guling/${postID}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }


export const UnGuling = async (postID: number) => {
    try {
      const response = await axios.get(`https://api.pinky.ge/api/unguling/${postID}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }
