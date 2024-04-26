import { createSlice } from "@reduxjs/toolkit";

const postModalSclier = createSlice({
    name:"postModalSclier",
    initialState:{
        defaultPost: false,
        pollPost:false,
        quizPost:false,
        openImageUpload: false,
        showPostButtons: true,
    },
    reducers:{
        setAddPostModal(state, action){
            state.defaultPost = action.payload.defaultPost
            state.pollPost = action.payload.pollPost
            state.quizPost = action.payload.quizPost
            state.openImageUpload = action.payload.openImageUpload
            state.showPostButtons = action.payload.showPostButtons
        }
    }
})

export const { setAddPostModal } = postModalSclier.actions
export default postModalSclier.reducer