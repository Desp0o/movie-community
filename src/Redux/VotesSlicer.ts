import { createSlice } from "@reduxjs/toolkit";

const voteSlicer = createSlice({
    name:"voteSlicer",
    initialState:{
        value: 0,
    },
    reducers:{
        setVote(state, action){
            state.value === action.payload
        }
    }
})

export const { setVote } = voteSlicer.actions
export default voteSlicer.reducer