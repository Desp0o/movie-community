import PageLayout from "./components/pageLayout/PageLayout"
import SinglePostComp from "./components/singlePostComp/SinglePostComp"
import avatar from "./assets/Avatar.webp"
import userav from "./assets/images.jpeg"

const arr = [
  {
    title:'this is first post',
    name:"tornike despotashvili",
    avatar: avatar,
  },
  {
    title:'second post',
    name:"koka kvirikashvili",
    avatar: userav,
  }
]

const Feed = () => {
  return (
    <>
      <PageLayout>

        {arr.map( (post) => {
          return(
            <SinglePostComp 
              authorName={post.name}
              authorAvatar={post.avatar}
              postTitle={post.title}
            />
          )
        })}

      
      </PageLayout>
    </>
  )
}

export default Feed