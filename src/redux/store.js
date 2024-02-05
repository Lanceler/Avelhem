import { configureStore } from "@reduxjs/toolkit";
import gameStateReducer from './gameState'
import teamsReducer from './teams'

export default configureStore({
    reducer: {
        gameState: gameStateReducer,
        teams: teamsReducer,
    }
})