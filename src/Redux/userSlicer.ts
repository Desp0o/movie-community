import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name: 'userSlicer',
    initialState:{
        user: {
            name: '' || localStorage.getItem('userName'),
            userID: null || localStorage.getItem('userID'),
            avatar: '' ||localStorage.getItem('avatar'),
            score: null || localStorage.getItem('score'),
            bells: null || localStorage.getItem('bells'),
        }
    },
    reducers:{
        setUser(state, action){
            state.user.name = action.payload.name;
            state.user.avatar = action.payload.avatar;
            state.user.userID = action.payload.userID;
            state.user.score = action.payload.score;
            state.user.bells = action.payload.bells
        }
    }
})

export const { setUser } = userSlicer.actions
export default userSlicer.reducer