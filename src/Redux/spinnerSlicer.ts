import { createSlice } from "@reduxjs/toolkit";

const spinnerSlicer = createSlice({
    name:'spinnerSlicer',
    initialState:{
        value: false
    },
    reducers:{
        setSpinnerState(state, action){
            state.value = action.payload
        }
    }
})

export const { setSpinnerState } = spinnerSlicer.actions
export default spinnerSlicer.reducer