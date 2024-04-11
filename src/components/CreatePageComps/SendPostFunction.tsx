import axios from "axios";

export const SendPostFunction = () => {

    const sendPost = (formData: any) => {     
      console.log(formData);
         
        try {
            const res = axios.post('https' , formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

            console.log(res);
            

        } catch (error) {
            
        }
    }

  return { sendPost }
}
