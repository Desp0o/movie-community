import { useParams } from 'react-router-dom'
import PageLayout from '../components/pageLayout/PageLayout'

const Post = () => {

    const { id } = useParams()

  return (
    <div>
        <PageLayout>
            {id}
        </PageLayout>
    </div>
  )
}

export default Post