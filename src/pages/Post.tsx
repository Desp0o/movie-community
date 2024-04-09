import { useParams } from "react-router-dom";
import PageLayout from "../components/pageLayout/PageLayout";
import { feedData } from "../FeedDATA";
import GoBack from "../components/singlePostPage/GoBack";
import Author from "../components/singlePostComp/Author";
import PostTitle from "../components/singlePostComp/PostTitle";
import PostImage from "../components/singlePostComp/postImage";
import QuizAnswers from "../components/singleQuizComponent/QuizAnswers";
import "../components/singlePostPage/singlePostPage.css"

const Post = () => {
  const { id } = useParams();
  const postId = id ? parseInt(id) : null;
  const post = feedData.find((post) => post.id === postId);

  if (!post) {
    return (
      <div>
        <PageLayout>
          <p>Post not found!</p>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageLayout>
        <div className="single_post_page">
          <div className="goBack_authorInfo">
            <GoBack />
            <Author avatar={post.avatar} name={post.name} />
          </div>

          <div className="single_page_title">
            <PostTitle title={post.title} />
          </div>

          <div className="single_post_image">
            {post.image ? <PostImage image={post.image} /> : <></>}
          </div>

          {post.type === 1 ? (
            <div className="answers_container">
              <QuizAnswers />
            </div>
          ) : (
            <></>
          )}
        </div>
      </PageLayout>
    </div>
  );
};

export default Post;
