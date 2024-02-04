import { createSlice } from "@reduxjs/toolkit"

export const gameStateSlice = createSlice({
    name: "gameState",
    initialState:{
        value: {}
    },
    reducers: {
        updateState: (state) => {
            state.value = action.payload;
        }
    }
})

export const {updateState} = gameStateSlice.actions;
export default gameStateSlice.reducer