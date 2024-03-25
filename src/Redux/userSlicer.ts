import { createSlice } from "@reduxjs/toolkit";

import avatar from "../assets/avatar.webp"

const userSlicer = createSlice({
    name: 'userSlicer',
    initialState:{
        user: {
            name: '',
            avatar: avatar
        }
    },
    reducers:{
        setUser(state, action){
            state.user.name = action.payload.name;
            state.user.avatar = action.payload.avatar;
        }
    }
})

export const { setUser } = userSlicer.actions
export default userSlicer.reducer