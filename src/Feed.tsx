import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import avatar from "./assets/Avatar.webp";
import userav from "./assets/images.jpeg";
import poster from "./assets/poster.jpeg";
import "./Feed.css";
import SingleQuizComponent from "./components/singleQuizComponent/SingleQuizComponent";

const arr = [
  {
    id: 0,
    type: 0,
    title: "this is first post",
    name: "tornike despotashvili",
    avatar: avatar,
    image: poster
  },
  {
    id: 1,
    type:0,
    title: "second post",
    name: "koka kvirikashvili",
    avatar: userav,
  },
  {
      id:2,
      type: 1,
      title: "this is first post",
      name: "tornike despotashvili",
      avatar: avatar,
      image: avatar
  }
];

const Feed = () => {
  return (
    <PageLayout>
      <div className="feed">
        {arr.map((post) => {
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
