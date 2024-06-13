import axios from "axios";

export const movieDataBase = () => {
    const requestMovieDB = async (setter: (arg0: []) => void, answer: string) => {
        const token = localStorage.getItem('token')
    
        try {
          const response = await axios.post(import.meta.env.VITE_MOVIE_DB, {movie:answer}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setter(response.data)
        } catch (error) {
          console.error(error)
        }
      }

      return {requestMovieDB}

}