import { useQuery } from "react-query";
import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import axios from "axios";
import { useState } from "react";
import { useUserHook } from "./hooks/useUserHook";

interface dataProps {
  id: number;
  title: string;
  img: string;
  like: number;
  dislike: number;
  type: number;
  authLike: string;
  updated_at: string;
  user:{
    name: string;
    avatar: string;
  }
}

const Feed = () => {
  const token = localStorage.getItem('token')
  const { user } = useUserHook()
  const [path,] = useState(user.name ? "https://api.pinky.ge/api/authFeed" : "https://api.pinky.ge/api/guestFeed")

  const {isLoading, data} = useQuery(
    ['feed-query', path], 
    async () => {
      try {
        const response = await axios.get(path, {
          headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data; 
      } catch (error) {
        console.log(error);
      }
    }
  )

  console.log(data);
  

  if(isLoading){
    return <Fetching />
  }

  return (
    <PageLayout>
      <div className="feed">
        {data?.posts?.map((post: dataProps)=>{
          return(
            <div key={post.id}>
              <SinglePostComp 
                authorName={post.user.name}
                authorAvatar={post.user.avatar}
                postTitle={post.title}
                postID={post.id}
                image={post.img}
                likes={post.like}
                dislikes={post.dislike}
                type={post.type}
                authLike={post.authLike} 
                date={post.updated_at}              
                />
            </div>
          )
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
