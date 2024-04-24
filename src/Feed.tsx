import Fetching from "./components/fetchingComponent/Fetching";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import { useEffect } from "react";
import { useRefetchHook } from "./hooks/useRefetchHook";
import { useUserHook } from "./hooks/useUserHook";
import { FeedFunctions } from "./components/feedFuncs/FeedFucntions";
import "./Feed.css";

interface dataProps {
  gul: number;
  authGul: number;
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
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

const Feed = () => {
  const { requestRefetch } = useRefetchHook();
  const {user} = useUserHook()
  const {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch } = FeedFunctions()

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [requestRefetch, user]);

  useEffect(()=>{
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadNextPage()
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  },[data])
  


if(data){
}

  return (
    <div style={{marginTop:"-20px"}}>
      {isLoading && <Fetching />}
      <div>
        {data?.pages?.map((page: any, pageIndex: number) => (
          <div className="feed" key={pageIndex}>
            {page?.data?.posts.data?.map((post: dataProps) => (
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
                  authGul={post.authGul} 
                  gul={post.gul}                
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {!hasNextPage && !isLoading && (<p style={{fontWeight:"900", color:"#BC53D9"}}>no more posts</p>)}
    </div>
  );
};

export default Feed;