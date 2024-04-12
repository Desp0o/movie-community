import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface dataProps {
  id: number;
  title: string;
}

const Feed = () => {
  const [data, setData] = useState([]) 

  const getAllPosts = async () => {
    try {
      const response = await axios.get('https://api.pinky.ge/api/index');
      
      console.log(response.data); 
      setData(response.data) //აქ ვინახავ შენგან მოცემულ ინფორმაციას
      
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  }

  useEffect(()=> {
    getAllPosts()
  },[])

  return (
    <PageLayout>
      <div className="feed">
        {data.map((post: dataProps)=>{
          return(
            <div key={post.id}>
              <SinglePostComp authorName={""} authorAvatar={""} postTitle={post.title} postID={0} />
            </div>
          )
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
