import { createSlice } from "@reduxjs/toolkit"

export const demoGuideSlice = createSlice({
    name: "demoGuide",
    initialState:{
        demoGuide: null
    },
    reducers: {
        updateDemo: (state, action) => {
            state.demoGuide = action.payload;
        }
    }
})

export const {updateDemo} = demoGuideSlice.actions;
export default demoGuideSlice.reducer