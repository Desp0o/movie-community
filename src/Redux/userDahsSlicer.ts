import { createSlice } from "@reduxjs/toolkit";

const userDahsSlicer = createSlice({
    name: 'userDahsSlicer',
    initialState:{
        isDashVisible: false
    },
    reducers:{
        setDashVisible(state, action){
            state.isDashVisible = action.payload
        }
    }
})

export const { setDashVisible } = userDahsSlicer.actions
export default userDahsSlicer.reducer
