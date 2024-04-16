import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name: 'userSlicer',
    initialState:{
        user: {
            name: localStorage.getItem('userName') || '',
            userID: 0,
            avatar: ''
        }
    },
    reducers:{
        setUser(state, action){
            state.user.name = action.payload.name;
            state.user.avatar = action.payload.avatar;
            state.user.userID = action.payload.userID;
        }
    }
})

export const { setUser } = userSlicer.actions
export default userSlicer.reducer