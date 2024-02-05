import { createSlice } from "@reduxjs/toolkit"

export const gameStateSlice = createSlice({
    name: "gameState",
    initialState:{
        localGameState: null
    },
    reducers: {
        updateState: (state, action) => {

            state.localGameState = action.payload;
        }
    }
})

export const {updateState} = gameStateSlice.actions;
export default gameStateSlice.reducer