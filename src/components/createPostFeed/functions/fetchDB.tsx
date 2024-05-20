import axios from "axios";

export const movieDataBase = () => {
    const requestMovieDB = async (setter: (arg0: any) => void, answer: string) => {
        const token = localStorage.getItem('token')
    
        try {
          const response = await axios.post('https://api.pinky.ge/api/movieDB', {movie:answer}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response.data);
          setter(response.data)
        } catch (error) {
          console.error(error)
        }
      }

      return {requestMovieDB}

}