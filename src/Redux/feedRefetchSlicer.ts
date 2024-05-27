import { createSlice } from "@reduxjs/toolkit";

const feedRefetchSlicer = createSlice({
    name: 'feedRefetchSlicer',
    initialState:{
        value: false
    },
    reducers:{
        setFeedRefetch(state, action){
            state.value = action.payload
        }
    }
})

export const { setFeedRefetch } = feedRefetchSlicer.actions
export default feedRefetchSlicer.reducer