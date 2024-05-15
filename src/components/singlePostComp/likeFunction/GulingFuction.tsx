import axios from 'axios';

import { useState } from 'react'

export const GulingFuction = () => {
    const [ungGulingError, setUngullingError] = useState(false)
    const [gulingError, setGulingError] = useState(false)


    

    const Guling = async (postID: number) => {
      
    const token = localStorage.getItem('token')
    
        try {
          const response = await axios.get(`https://api.pinky.ge/api/guling/${postID}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          console.log(response.status + " გულინგ");
          setGulingError(false)
        } catch (error:any) {
          console.error(error);
          setGulingError(true)
        }
      }
    
    
    const UnGuling = async (postID: number) => {
    
    const token = localStorage.getItem('token')
    
        try {
          const response = await axios.get(`https://api.pinky.ge/api/unguling/${postID}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setUngullingError(false)
          console.log(response.status+ " ჰათინგ");
          
        } catch (error:any) {
          console.error(error);
          setUngullingError(true)            
        }
      }

  return {UnGuling, Guling, ungGulingError, gulingError, setGulingError, setUngullingError}
}

