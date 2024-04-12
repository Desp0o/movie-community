import { useQuery } from "react-query";
import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import axios from "axios";

interface dataProps {
  id: number;
  title: string;
  img: string;
}

const Feed = () => {

  const path = import.meta.env.VITE_FEED_POSTS
  const {isLoading, data} = useQuery(
    ['feed-query', path], 
    async () => {
      try {
        const response = await axios.get(path);
        return response.data; 
      } catch (error) {
        console.log(error);
      }
    },
    {
      cacheTime: 300000,
      staleTime: 200000,
    }
  )


  if(isLoading){
    return <Fetching />
  }

  return (
    <PageLayout>
      <div className="feed">
        {data?.map((post: dataProps)=>{
          return(
            <div key={post.id}>
              <SinglePostComp authorName={""} authorAvatar={""} postTitle={post.title} postID={0} image={post.img}/>
            </div>
          )
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
