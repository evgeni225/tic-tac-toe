import axios from "axios"
import { createGameAction, createGameErrorAction, createGameSuccessAction } from "../reducers/game"

export const createNewGame = (settings) => {
    return async dispatch => {
        try {
            dispatch(createGameAction())
            const response = await axios.post(`https://tictactoe-api-123412.herokuapp.com/game`, {settings})
            console.log(response.data)
            dispatch(createGameSuccessAction(response.data.id))
        } catch (e) {
            dispatch(createGameErrorAction(e.message))
        }
    }
}