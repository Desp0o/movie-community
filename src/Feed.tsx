import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import "./Feed.css";
import SingleQuizComponent from "./components/singleQuizComponent/SingleQuizComponent";
import { feedData } from "./FeedDATA";


const Feed = () => {
  return (
    <PageLayout>
      <div className="feed">
        {feedData.map((post) => {
          return (
            post.type === 0 ? 
            <SinglePostComp
              postID={post.id}
              authorName={post.name}
              authorAvatar={post.avatar}
              postTitle={post.title}
              image={post.image}
            />
            :
            <SingleQuizComponent
              postID={post.id}
              authorName={post.name}
              authorAvatar={post.avatar}
              postTitle={post.title}
              image={post.image}
            />
          );
        })}
      </div>

    </PageLayout>
  );
};

export default Feed;
