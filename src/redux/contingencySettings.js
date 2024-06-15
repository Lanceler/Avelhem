import { createSlice } from "@reduxjs/toolkit"

export const contingencySettingsSlice = createSlice({
    name: "contingencySettings",
    initialState:{
        contingencySettings: null 

    },
    reducers: {
        updatecontingencySettings: (state, action) => {
            state.contingencySettings = action.payload;
        }
    }
})

export const {updatecontingencySettings} = contingencySettingsSlice.actions;
export default contingencySettingsSlice.reducer