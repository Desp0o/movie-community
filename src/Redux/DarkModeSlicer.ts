import { createSlice } from "@reduxjs/toolkit";

const darkModeSlicer = createSlice({
    name:'darkModeSlicer',
    initialState:{
        isDarkBg: localStorage.getItem('darkMode') === 'true' ? true : false
    },
    reducers:{
        setDarkBG(state, actions){
            state.isDarkBg = actions.payload
            localStorage.setItem('darkMode', actions.payload)
        }
    }
})

export const { setDarkBG } = darkModeSlicer.actions
export default darkModeSlicer.reducer