import { createSlice } from "@reduxjs/toolkit";

const userDahsSlicer = createSlice({
    name: 'userDahsSlicer',
    initialState:{
        setDashVisible: false
    },
    reducers:{
        setDashVisible(state, action){
            state.setDashVisible = action.payload
        }
    }
})

export const { setDashVisible } = userDahsSlicer.actions
export default userDahsSlicer.reducer
