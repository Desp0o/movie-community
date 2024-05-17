import { createSlice } from "@reduxjs/toolkit";

const refetchSlicer = createSlice({
    name: 'refetchSlicer',
    initialState:{
            isRefetched: false
    },
    reducers:{
        setRefetch(state, action){
            state.isRefetched = action.payload
        }
    }
})

export const { setRefetch } = refetchSlicer.actions
export default refetchSlicer.reducer