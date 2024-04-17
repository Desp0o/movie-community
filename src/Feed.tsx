import { useQuery } from "react-query";
import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserHook } from "./hooks/useUserHook";
import { useRefetchHook } from "./hooks/useRefetchHook";

interface dataProps {
  id: number;
  title: string;
  img: string;
  like: number;
  dislike: number;
  type: number;
  authLike: string;
  updated_at: string;
  created_at: string;
  status: number | string;
  comment: number;
  user:{
    id:number;
    name: string;
    avatar: string;
  }
}

const Feed = () => {
  const token = localStorage.getItem('token')
  const { user } = useUserHook()
  const { requestRefetch } = useRefetchHook()
  const [commentDataBase, setCommentDataBase] = useState([])
  const [path, setPath] = useState("https://api.pinky.ge/api/guestFeed")

  useEffect(()=>{
    if(user.name && user.userID){
      if(token){
        setPath('https://api.pinky.ge/api/authFeed')
      }
    }else{
      setPath('https://api.pinky.ge/api/guestFeed')
    }    
  },[path, user])

  const {isLoading, data, refetch} = useQuery(
    ['feed-query', path], 
    async () => {
      try {
        const response = await axios.get(path, {
          headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setCommentDataBase(response.data.comments)
        return response.data; 
      } catch (error) {
        console.log(error);
      }
    }
  )

  console.log(data);

  useEffect(()=>{
    
      console.log(commentDataBase);
      
  
    
  },[data])

  useEffect(()=>{
    refetch()        
  },[requestRefetch])


  return (
    <PageLayout>
      {isLoading ? <Fetching /> : <></>}
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
                date={post.created_at}
                postUserId={post.user.id} 
                postStatus={post.status}  
                commentLength={post.comment}             
                />
            </div>
          )
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
