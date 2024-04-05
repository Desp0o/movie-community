
const array = [
    {id: 0, name: 'Posts'},
    {id: 1, name: 'Comments'},
    {id: 2, name: 'Saved'},
    {id: 3, name: 'Likes'},
    {id: 4, name: 'Dislikes'},
]


const ProfileOverView = () => {
  return (
    <div>
        {
            array.map((item)=>{
                return(
                    <div key={item.id} className="">
                        {item.name}
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default ProfileOverView