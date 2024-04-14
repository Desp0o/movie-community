import { createSlice } from "@reduxjs/toolkit";

const responsivePostAddSlice = createSlice({
    name:'responsivePostAddSlice',
    initialState:{
        value: false
    },
    reducers:{
        setResponsivePostAddState(state, action){
            state.value = action.payload
        }
    }
})

export const { setResponsivePostAddState } = responsivePostAddSlice.actions
export default responsivePostAddSlice.reducer