import { createSlice } from "@reduxjs/toolkit";

const darkModeSlicer = createSlice({
    name:'darkModeSlicer',
    initialState:{
        isDarkBg: false
    },
    reducers:{
        setDarkBG(state, actions){
            state.isDarkBg = actions.payload
        }
    }
})

export const { setDarkBG } = darkModeSlicer.actions
export default darkModeSlicer.reducer