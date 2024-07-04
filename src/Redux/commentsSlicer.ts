import { createSlice } from "@reduxjs/toolkit";

const commentSlicer = createSlice({
    name:"commentSlicer",
    initialState:{
        mainReplay: false,
        secondaryReplay: false
    },
    reducers:{
        setSecondaryReplayInput(state){
            state.secondaryReplay = true
            state.mainReplay = false

        },
        setMainReplayInput(state){
            state.mainReplay = true
            state.secondaryReplay = false

        }
    }
})

export const {setMainReplayInput, setSecondaryReplayInput} = commentSlicer.actions
export default commentSlicer.reducer