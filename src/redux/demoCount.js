import { createSlice } from "@reduxjs/toolkit"

export const demoCountSlice = createSlice({
    name: "demoCount",
    initialState:{
        demoCount: null
    },
    reducers: {
        updateDemoCount: (state, action) => {
            state.demoCount = action.payload;
        }
    }
})

export const {updateDemoCount} = demoCountSlice.actions;
export default demoCountSlice.reducer