import { createSlice } from "@reduxjs/toolkit"

export const teamsSlice = createSlice({
    name: "teams",
    initialState:{
        self: null,
        enemy: null
    },
    reducers: {
        updateSelf: (state, action) => {
            state.self = action.payload;
        },
         updateEnemy: (state, action) => {
            state.enemy = action.payload;
        },
        
    }
})

export const {updateSelf, updateEnemy} = teamsSlice.actions;
export default teamsSlice.reducer