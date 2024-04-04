import { createSlice } from "@reduxjs/toolkit";

const leftMenuSlicer = createSlice({
    name: 'leftMenuSlicer',
    initialState:{
        isLeftMenuOpen: false
    },
    reducers:{
        setLeftMenuState(state, action){
            state.isLeftMenuOpen = action.payload
        }
    }
})

export const { setLeftMenuState } = leftMenuSlicer.actions
export default leftMenuSlicer.reducer