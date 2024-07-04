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
            console.log(state.secondaryReplay + " this is secondaryReplay replay");
            console.log(state.mainReplay + " this is main replay");
            console.log("------");
        },
        setMainReplayInput(state){
            state.mainReplay = true
            state.secondaryReplay = false
            console.log(state.mainReplay + " this is main replay");
            console.log(state.secondaryReplay + " this is secondaryReplay replay");
            console.log("------");
        }
    }
})

export const {setMainReplayInput, setSecondaryReplayInput} = commentSlicer.actions
export default commentSlicer.reducer