import axios from 'axios';

import { useState } from 'react'

export const GulingFuction = () => {
    const [gulingError, setGulingError] = useState(false)

    const Guling = async (postID: number) => {
      
    const token = localStorage.getItem('token')
    
        try {
          await axios.get(`https://api.pinky.ge/api/guling/${postID}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setGulingError(false)
        } catch (error:any) {
          console.error(error);
          setGulingError(true)
        }
      }


  return {Guling, gulingError, setGulingError}
}

