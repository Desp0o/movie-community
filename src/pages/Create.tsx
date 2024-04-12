import AddPost from "../components/CreatePageComps/AddPost"
import PageLayout from "../components/pageLayout/PageLayout"
import "../components/CreatePageComps/CreatePageStyles.css"

const Create = () => {
  return (
    <PageLayout>
      <div className="create_page">
        <AddPost />
      </div>
    </PageLayout>
  )
}

export default Create