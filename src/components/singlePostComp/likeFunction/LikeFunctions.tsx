import axios from "axios";


export const Liking = async (isLike: { post: number; like: string; }) => {
  const token = localStorage.getItem('token')

    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isLike, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const Unliking = async (isLike: { post: number; like: string; }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(import.meta.env.VITE_UNLIKING, isLike, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const DislikeFunction = async (isUnlike: { post: number; like: string; }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(import.meta.env.VITE_LIKING, isUnlike, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const UnDislikeFunction = async (isUnlike: { post: number; like: string; }) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(
        import.meta.env.VITE_UNLIKING,
        isUnlike,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };