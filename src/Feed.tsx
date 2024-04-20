import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import { useEffect } from "react";
import { useRefetchHook } from "./hooks/useRefetchHook";
import { useUserHook } from "./hooks/useUserHook";
import { FeedFunctions } from "./components/feedFuncs/FeedFucntions";
import "./Feed.css";

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
  authGul: number;
  gul: number;
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
  console.log(data);

}  

  return (
    <PageLayout>
      {isLoading && <Fetching />}
      <div className="feed">
        {data?.pages?.map((page: any, pageIndex: number) => (
          <div key={pageIndex}>
            {page?.data?.posts?.data?.map((post: dataProps) => (
              <div key={post.id}>
                <SinglePostComp
                  authorName={post.user.name}
                  authorAvatar={post.user.avatar}
                  postTitle={post.title}
                  postID={post.id}
                  image={post.img}
                  likes={0}
                  dislikes={0}
                  type={post.type}
                  authLike={'ლიკე'}
                  date={post.created_at}
                  postUserId={post.user.id}
                  postStatus={post.status}
                  commentLength={post.comment}
                  authGul={post.authGul}
                  guls={post.gul}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {!hasNextPage && !isLoading && (<p style={{fontWeight:"900", color:"#BC53D9"}}>no more posts</p>)}
    </PageLayout>
  );
};

export default Feed;
