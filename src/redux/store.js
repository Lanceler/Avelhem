import { configureStore } from "@reduxjs/toolkit";
import gameStateReducer from './gameState'
import teamsReducer from './teams'
import demoGuideReducer from './demoGuide'
import magnifySkillReducer from "./magnifySkill";
import contingencySettingsReducer from "./contingencySettings";


export default configureStore({
    reducer: {
        gameState: gameStateReducer,
        teams: teamsReducer,
        demoGuide: demoGuideReducer,
        magnifiedSkill: magnifySkillReducer,
        contingencySettings: contingencySettingsReducer
    }
})