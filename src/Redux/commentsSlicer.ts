import { createSlice } from "@reduxjs/toolkit";

const commentSlicer = createSlice({
    name:"commentSlicer",
    initialState:{
        mainReplay: false,
        secondaryReplay: false
    },
    reducers:{
        setSecondaryReplayInput(state){
            state.mainReplay = false
            state.secondaryReplay = true
        },
        setMainReplayInput(state){
            state.mainReplay = true
            state.secondaryReplay = false
        },
        setSecondaryReplayFalse(state){
            state.secondaryReplay = false  
        },
    }
})

export const {setMainReplayInput, setSecondaryReplayInput, setSecondaryReplayFalse} = commentSlicer.actions
export default commentSlicer.reducer