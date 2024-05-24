import { createSlice } from "@reduxjs/toolkit";

const gulSlice = createSlice({
    name:"gulSlice",
    initialState:{
        feed:[]
    },
    reducers:{
        setGulRedux(state,action){
            state.feed = action.payload
        }
    }
})

export const {setGulRedux} = gulSlice.actions
export default gulSlice.reducer