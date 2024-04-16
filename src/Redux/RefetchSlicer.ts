import { createSlice } from "@reduxjs/toolkit";

const refetchSlicer = createSlice({
    name: 'refetchSlicer',
    initialState:{
        value: false
    },
    reducers:{
        setRefetch(state, action){
            state.value = action.payload
        }
    }
})

export const { setRefetch } = refetchSlicer.actions
export default refetchSlicer.reducer