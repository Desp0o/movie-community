import PageLayout from "./components/pageLayout/PageLayout";
import SinglePostComp from "./components/singlePostComp/SinglePostComp";
import avatar from "./assets/Avatar.webp";
import userav from "./assets/images.jpeg";
import poster from "./assets/poster.jpeg";
import "./Feed.css";
import SingleQuizComponent from "./components/singleQuizComponent/SingleQuizComponent";

const arr = [
  {
    title: "this is first post",
    name: "tornike despotashvili",
    avatar: avatar,
    image: poster
  },
  {
    title: "second post",
    name: "koka kvirikashvili",
    avatar: userav,
  },
];

const Feed = () => {
  return (
    <PageLayout>
      <div className="feed">
        {arr.map((post) => {
          return (
            <SinglePostComp
              authorName={post.name}
              authorAvatar={post.avatar}
              postTitle={post.title}
              image={post.image}
            />
          );
        })}
      </div>

      <SingleQuizComponent />
    </PageLayout>
  );
};

export default Feed;
