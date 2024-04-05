import { useDarkModeHook } from "../../hooks/useDarkModeHook"

const array = [
    {id: 0, name: 'Posts'},
    {id: 1, name: 'Comments'},
    {id: 2, name: 'Saved'},
    {id: 3, name: 'Likes'},
    {id: 4, name: 'Dislikes'},
]


const ProfileOverView = () => {

    const { isDark } = useDarkModeHook()

  return (
    <div className="ProfileOverView">
        {
            array.map((item)=>{
                return(
                    <div key={item.id} className={isDark ? "ProfileOverView_item dark" : "ProfileOverView_item"}>
                        {item.name}
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default ProfileOverView