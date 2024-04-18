import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import { useEffect } from "react";
import { useUserHook } from "./hooks/useUserHook";
import { useRefetchHook } from "./hooks/useRefetchHook";
import { feedFunctions } from "./components/FeedComponent/feedFunctions";
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
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

const Feed = () => {
  const { user } = useUserHook();
  const { requestRefetch } = useRefetchHook();
  const {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch } = feedFunctions()

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
        console.log('hey');
        loadNextPage()
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[data])

  return (
    <PageLayout>
      {isLoading && <Fetching />}
      <div className="feed">
        {data?.pages?.map((page, pageIndex) => (
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
      {!hasNextPage && !isLoading && (<p style={{fontWeight:"900", color:"#BC53D9"}}>no more posts</p>)}
    </PageLayout>
  );
};

export default Feed;
