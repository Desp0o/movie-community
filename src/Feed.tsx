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
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

const Feed = () => {
  const token = localStorage.getItem("token");
  const { user } = useUserHook();
  const { requestRefetch } = useRefetchHook();
  const [_path, setPath] = useState("https://api.pinky.ge/api/authFeed?page=1");
  const [lastPage, setLastPage] = useState(0)

  useEffect(() => {
    if (user.name && user.userID) {
      if (token) {
        setPath("https://api.pinky.ge/api/authFeed");
      }
    } else {
      setPath("https://api.pinky.ge/api/guestFeed");
    }
  }, [user]);

  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    "feed-query",
    async ({ pageParam = 1 }) => {
      try {
        const response = await axios.get(
          `https://api.pinky.ge/api/authFeed?page=${pageParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setLastPage(response.data.posts.last_page)
        return response; // Return the data from the response, not the response itself
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    },
    {
      getNextPageParam: (_lastPage, allPages) => {
        console.log(allPages);
        if(allPages.length >= lastPage){
          return;
        }
        
        return allPages.length + 1;
      },
    }
  );

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [requestRefetch]);

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
      {!hasNextPage && (<p style={{fontWeight:"900", color:"#BC53D9"}}>no more posts</p>)}
    </PageLayout>
  );
};

export default Feed;
