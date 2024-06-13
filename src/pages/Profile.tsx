import axios from "axios"
import PageLayout from "../components/pageLayout/PageLayout"
import ProfPageAvatar from "../components/profilePageComp/ProfPageAvatar"
import ProfileOverView from "../components/profilePageComp/ProfileOverView"

const Profile = () => {

  const fetchUserPosts = async ()  => {
    const token = localStorage.getItem('token')
    try {
      await axios.get('https://api.pinky.ge/api/user_posts',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      
      
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserGuls = async ()  => {
    const token = localStorage.getItem('token')
    try {
      await axios.get('https://api.pinky.ge/api/user_guls',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      
      
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserComments = async ()  => {
    const token = localStorage.getItem('token')
    try {
      await axios.get('https://api.pinky.ge/api/user_comments',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      
      
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserPoints = async ()  => {
    const token = localStorage.getItem('token')
    try {
      await axios.get('https://api.pinky.ge/api/user_points',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      
      
    } catch (error) {
      console.error(error)
    }
  }


  const key = 'f508fb1a2a7f9ba3291095bab851963a'
  const fetchMovie = async () => {
    try {
        await axios.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
          }
        })

        
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <PageLayout>  
      <ProfPageAvatar />
      <ProfileOverView />

      <button onClick={fetchUserPosts}> იუზერის პოსტები</button>
      <br/>
      <button onClick={fetchMovie}> ფილმების</button>
      <br/>
      <button onClick={fetchUserGuls}>guls</button>
      <br/>
      <button onClick={fetchUserComments}>comments</button>
      <br/>
      <button onClick={fetchUserPoints}>points</button>

    </PageLayout>
  )
}

export default Profile