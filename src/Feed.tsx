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
  user:{
    name: string;
    avatar: string;
  }
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
    }
  )

  console.log(data);
  

  if(isLoading){
    return <Fetching />
  }

  return (
    <PageLayout>
      <div className="feed">
        {data?.map((post: dataProps)=>{
          return(
            <div key={post.id}>
              <SinglePostComp 
                authorName={post.user.name} 
                authorAvatar={post.user.avatar} 
                postTitle={post.title} 
                postID={post.id} 
                image={post.img}
              />
            </div>
          )
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
