import { configureStore } from "@reduxjs/toolkit";
import gameStateReducer from './gameState'
import teamsReducer from './teams'
import demoGuideReducer from './demoGuide'
import demoCountReducer  from './demoCount'
import magnifySkillReducer from "./magnifySkill";
import contingencySettingsReducer from "./contingencySettings";



export default configureStore({
    reducer: {
        gameState: gameStateReducer,
        teams: teamsReducer,
        demoGuide: demoGuideReducer,
        demoCount: demoCountReducer,
        magnifiedSkill: magnifySkillReducer,
        contingencySettings: contingencySettingsReducer
    }
})