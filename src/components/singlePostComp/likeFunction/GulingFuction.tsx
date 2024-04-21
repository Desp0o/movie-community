import axios from 'axios';

export const Guling = async (postID: number) => {
const token = localStorage.getItem('token')

    try {
      const response = await axios.get(`https://api.pinky.ge/api/guling/${postID}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response);
      
    } catch (error) {
      console.log(error) 
    }
  }


export const UnGuling = async (postID: number) => {
const token = localStorage.getItem('token')

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
