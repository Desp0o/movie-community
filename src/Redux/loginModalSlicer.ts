import { createSlice } from "@reduxjs/toolkit";

const loginModalSlicer = createSlice ({
    name:"loginModalSlicer",
    initialState:{
        isModalVisible: false
    },
    reducers:{
        setModalVisible(state, action){
            state.isModalVisible = action.payload
        }
    }
})

export const { setModalVisible } = loginModalSlicer.actions
export default loginModalSlicer.reducer