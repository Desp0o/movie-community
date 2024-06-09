import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import { useEffect } from "react";
import { useUserHook } from "./hooks/useUserHook";
import { FeedFunctions } from "./components/feedFuncs/FeedFucntions";
import "./Feed.css";
import noAvatar from "./assets/noAvatar.jpeg"
import CreatePostFeed from "./components/createPostFeed/CreatePostFeed";
import Spinner from "./components/spinner/Spinner";
import { useRefetchHook } from "./hooks/useFeedRefetch";
import Slider from "./components/slider/Slider";
import RatingsFeed from "./components/RatingsFeed/RatingsFeed";
import ShortCuts from "./components/shortCuts/ShortCuts";

interface dataProps {
  guls: number;
  myGul: number;
  id: number;
  text: string;
  img: string;
  type: number;
  updated_at: string;
  created_at: string;
  myPoll:  number;
  status: number | string;
  myAnswer: number | null,
  mySave: number;
  comments:{
    length: number;
  };
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  pollAnswers:[]
  polls:[]
}

const Feed = () => {
  const {user} = useUserHook()
  const {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch } = FeedFunctions()
  const { useFeedRefetch } = useRefetchHook()

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [useFeedRefetch]);

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
  


  return (
    <>
      <Slider />
      <RatingsFeed />
      <ShortCuts />
      {isLoading && <Spinner />}
      <div className="feed_page">
        {user.name && user.userID ? <CreatePostFeed /> : <></>}
        {data?.pages?.map((page: any, pageIndex: number) => (
          <div className="feed" key={pageIndex}>
            {page?.data?.posts?.data?.map((post: dataProps) => (
              
                <SinglePostComp
                  refetch={refetch}
                  key={post?.id}
                  authorName={post?.user.name}
                  authorAvatar={post?.user.avatar ? post?.user.avatar : noAvatar}
                  postTitle={post?.text}
                  postID={post?.id}
                  image={post?.img}
                  type={post?.type}
                  date={post?.created_at}
                  postUserId={post?.user.id}
                  postStatus={post?.status}
                  commentLength={post?.comments.length} 
                  authGul={post?.myGul} 
                  guls={post?.guls}   
                  pollAnswers={post.polls}
                  myAnswer={post.myAnswer}
                  myPoll={post?.myPoll}
                  mySave={post?.mySave}
                />
              
            ))}
          </div>
        ))}
      </div>
      {!hasNextPage && !isLoading && (<p style={{fontWeight:"900", color:"#BC53D9"}}>no more posts</p>)}
    </>
  );
};

export default Feed;