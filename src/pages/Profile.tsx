import PageLayout from "../components/pageLayout/PageLayout"
import ProfPageAvatar from "../components/profilePageComp/ProfPageAvatar"
import ProfileOverView from "../components/profilePageComp/ProfileOverView"

const Profile = () => {
  return (
    <PageLayout>
      <ProfPageAvatar />
      <ProfileOverView />
    </PageLayout>
  )
}

export default Profile