const CREATE_GAME = 'CREATE_GAME' 
const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS' 
const CREATE_GAME_ERROR = 'CREATE_GAME_ERROR' 
const UPDATE_DATA = 'UPDATE_DATA'

const initialState = {
    game: {
        id: null,
        playground: null,
        playersList: [],
        score: null,
        next: null,
        winner: null,
        players: null,
    },
    loading: false,
    error: null,
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            return { ...state, loading: true, game: initialState.game, error: null }
        case CREATE_GAME_SUCCESS:
            return { ...state, loading: false, game: {...state.game, id: action.payload } }
        case CREATE_GAME_ERROR:
            return { ...state, loading: false, game: initialState.game, error: action.payload }
        case UPDATE_DATA:
            return { ...state, game: action.payload, error: null }
        default:
            return state
    }
}

export const createGameAction = () => { return { type: CREATE_GAME } }
export const createGameSuccessAction = (game) => { return { type: CREATE_GAME_SUCCESS, payload: game } }
export const createGameErrorAction = (error) => { return { type: CREATE_GAME_ERROR, payload: error } }

export const updateDataAction = (game) => { return { type: UPDATE_DATA, payload: game } }