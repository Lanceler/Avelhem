import { createSlice } from "@reduxjs/toolkit"

export const magnifySkillSlice = createSlice({
    name: "magnifiedSkill",
    initialState:{
        magnifiedSkill: null
    },
    reducers: {
        updateMagnifiedSkill: (state, action) => {

            state.magnifiedSkill = action.payload;
        }
    }
})

export const {updateMagnifiedSkill} = magnifySkillSlice.actions;
export default magnifySkillSlice.reducer