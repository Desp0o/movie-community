import { useParams } from 'react-router-dom';
import PageLayout from '../components/pageLayout/PageLayout';
import { feedData } from '../FeedDATA';
import SinglePostComp from '../components/singlePostComp/SinglePostComp';


const Post = () => {
    const { id } = useParams();
    const postId = id ? parseInt(id) : null;
    const post = feedData.find(post => post.id === postId);

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
            </PageLayout>
        </div>
    );
};

export default Post;
