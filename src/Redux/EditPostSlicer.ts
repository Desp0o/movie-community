import { createSlice } from "@reduxjs/toolkit";

const editPostSlicer = createSlice({
    name:"editPostSlicer",
    initialState:{
        states:{
            value: false,
            id: ''
        }
    },
    reducers:{
        setEditPostModal(state, action){
            state.states.value = action.payload.value,
            state.states.id = action.payload.id
        }
    }
})

export const { setEditPostModal } = editPostSlicer.actions
export default editPostSlicer.reducer