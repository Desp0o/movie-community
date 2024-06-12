import { createSlice } from "@reduxjs/toolkit";

const retrievedLanguage = localStorage.getItem("language")

const languageSlicer = createSlice({
    name: "languageSlicer",
    initialState:{
        language: retrievedLanguage === 'geo' ? true : false
    },
    reducers:{
        setLanguage(state, action){
            state.language = action.payload
        }
    }
})

export const { setLanguage } = languageSlicer.actions
export default languageSlicer.reducer