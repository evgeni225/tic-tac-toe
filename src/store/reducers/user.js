const SET_USER = 'SET_USER'
const CHANGE_USERNAME = 'CHANGE_USERNAME'
const CHANGE_ID = 'CHANGE_ID'

const initialState = {
    id: null,
    username: null,
    loading: true
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            let user = JSON.parse(localStorage.getItem('tictactoe-user'))
            if (!user) {
                user = { username: `user-${Date.now()}` }
                localStorage.setItem('tictactoe-user', JSON.stringify(user))
            }
            return { ...state, username: user.username, loading: false }
        case CHANGE_USERNAME:
            let newUsername = action.payload
            if (!newUsername) {
                newUsername = `user-${Date.now()}`
            }
            localStorage.setItem('tictactoe-user', JSON.stringify({ id: state.id, username: newUsername }))
            return { ...state, username: newUsername }
        case CHANGE_ID:
            console.log('USERID_CHANGE__',action.payload)
            return { ...state, id: action.payload }
        default:
            return state
    }
}

export const setUserAction = () => { return { type: SET_USER } }
export const changeUsernameAction = (username) => { return { type: CHANGE_USERNAME, payload: username } }
export const changeIdAction = (userId) => { return { type: CHANGE_ID, payload: userId } }