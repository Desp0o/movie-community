import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name: 'userSlicer',
    initialState:{
        user: {
            name: '' || localStorage.getItem('userName'),
            userID: 0 || localStorage.getItem('userID'),
            avatar: '' ||localStorage.getItem('avatar'),
            score: parseInt('2')
        }
    },
    reducers:{
        setUser(state, action){
            state.user.name = action.payload.name;
            state.user.avatar = action.payload.avatar;
            state.user.userID = action.payload.userID;
            state.user.score = action.payload.score;
        }
    }
})

export const { setUser } = userSlicer.actions
export default userSlicer.reducer