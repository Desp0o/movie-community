import { useInfiniteQuery } from "react-query";
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
  // const [commentDataBase, setCommentDataBase] = useState([])
  const [path, setPath] = useState("https://api.pinky.ge/api/authFeed?page=1")

  useEffect(()=>{
    if(user.name && user.userID){
      if(token){
        setPath('https://api.pinky.ge/api/authFeed')
      }
    }else{
      setPath('https://api.pinky.ge/api/guestFeed')
    }    
  },[path, user])

  // const PAGE_SIZE = 10

  const { data, fetchNextPage,isLoading, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    'feed-query',
    async ({ pageParam = 1 }) => {
      const response = await axios.get(`https://api.pinky.ge/api/authFeed?page=${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    },
    {
      getNextPageParam: (_lastPage, allPages) => {
        // If the last page is empty or the data length is less than the page size, it indicates no more pages
        // if (lastPage.length === 0 || lastPage.data.length < PAGE_SIZE) {
        //   return undefined;
        // }
        // Otherwise, return the next page number
        return allPages.length + 1;
      }
    }
  );

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  console.log(data);


  useEffect(()=>{
    refetch()        
  },[requestRefetch])


  return (
    <PageLayout>
      {isLoading ? <Fetching /> : <></>}
      <div className="feed">
  {data?.pages.map((page, pageIndex) => (
    <div key={pageIndex}>
      {page.data?.posts.data.map((post: dataProps) => (
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
      ))}
    </div>
  ))}
</div>
  <button onClick={loadNextPage}>load more psts</button>
    </PageLayout>
  );
};

export default Feed;
