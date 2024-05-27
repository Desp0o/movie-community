import { createSlice } from "@reduxjs/toolkit";

// Define the type for the feed item
interface FeedItem {
    id: number;
    content: string;
}

// Define the type for the initial state
interface GulState {
    feed: FeedItem[];
}

const initialState: GulState = {
    feed: []
};

const gulSlice = createSlice({
    name: "gulSlice",
    initialState,
    reducers: {
        setLikeRedux(state, action) {
            state.feed.push(action.payload)
        },

        setRemovedLikeRedux(state, action) {
            const index = state.feed.indexOf(action.payload);

            if (index !== -1) {
                state.feed.splice(index, 1);
            }
        }
    }
});

export const { setLikeRedux, setRemovedLikeRedux } = gulSlice.actions;
export default gulSlice.reducer;
