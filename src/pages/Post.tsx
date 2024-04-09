import { useParams } from 'react-router-dom';
import PageLayout from '../components/pageLayout/PageLayout';
import { feedData } from '../FeedDATA';
import SinglePostComp from '../components/singlePostComp/SinglePostComp';
import { useNavigate } from 'react-router-dom';


const Post = () => {
    const { id } = useParams();
    const postId = id ? parseInt(id) : null;
    const post = feedData.find(post => post.id === postId);

    const naviagate = useNavigate()

    const goBack = () => {
      naviagate(-1)
    }

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
                <SinglePostComp
                    postID={post.id}
                    authorName={post.name}
                    authorAvatar={post.avatar}
                    postTitle={post.title}
                    image={post.image}
                />
                <button onClick={goBack}>go Back</button>
            </PageLayout>
        </div>
    );
};

export default Post;
