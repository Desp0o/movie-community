import Fetching from "./components/fetchingComponent/Fetching";
import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface dataProps {
  id: number;
  title: string;
  img: string;
}

const Feed = () => {
  const [data, setData] = useState([]) 
  const [isLoading, setLoading] = useState(false)

  const getAllPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.pinky.ge/api/index');
      
      console.log(response.data); 
      setData(response.data) //აქ ვინახავ შენგან მოცემულ ინფორმაციას
      
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=> {
    getAllPosts()
  },[])

  return (
    <PageLayout>
      {isLoading ? <Fetching /> : <></>}
      <div className="feed">
        {data.map((post: dataProps)=>{
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
