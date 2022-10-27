import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeUsernameAction } from "../store/reducers/user"
import { createNewGame } from "../store/actions/game"

export const Menu = () => {
    // new game params
    const [size, setSize] = useState(3)
    const [players, setPlayers] = useState(2)
    const [scoreToWin, setScoreToWin] = useState(3)

    // join game params
    const [gameId, setGameId] = useState('')

    // dropdown states
    const [newGame, setNewGame] = useState(false)
    const [joinGame, setJoinGame] = useState(false)

    // username change state
    const [usernameChange, setUsernameChange] = useState(false)

    const user = useSelector(state => state.user)
    const game = useSelector(state => state.game)
    const dispatch = useDispatch()

    const navigate = useNavigate()


    // new game dropdown handler
    const toggleNewGame = (e) => {
        e.preventDefault()
        setJoinGame(false)
        setNewGame(prev => !prev)
    }

    // join game dropdown handler
    const toggleJoinGame = (e) => {
        e.preventDefault()
        setNewGame(false)
        setJoinGame(prev => !prev)
    }

    // close dropdown handler
    const cancelHandler = (e) => {
        e.preventDefault()

        setNewGame(false)
        setJoinGame(false)
    }

    // username change 
    const showUsernameChange = () => setUsernameChange(true)
    const hideUsernameChange = () => setUsernameChange(false)

    const changeUsernameHandler = (e) => {
        dispatch(changeUsernameAction(e.target.value.trim()))
    }


    // creating new game
    const createGameHandler = async (e) => {
        e.preventDefault()
        const settings = {
            players,
            size,
            score: scoreToWin,
        }

        dispatch(createNewGame(settings))
    }

    // joining available game
    const joinGameHandler = (e) => {
        e.preventDefault()

        if (!gameId) {
            return
        }

    }

    return (
        <>
        <button onClick={() => console.log(game)}>show data</button>

        <div>GameId: {game.game.id || 'no data'}</div>
        {game.loading && <div>Loading game data...</div>}
        {game.error && <div>Error: {game.error}</div>}
        {!game.loading && !game.error && game.game.id &&<button onClick={() => navigate(`/${game.game.id}`)}>redirect</button>}
        <div className="main-menu">
            <div className="main-menu__username">
                {usernameChange &&
                <input 
                    value={user.username} 
                    onChange={changeUsernameHandler} 
                    onBlur={hideUsernameChange} 
                    autoFocus 
                    className="input input--sm" 
                    type="text" 
                    onKeyDown={ e => (e.key === 'Enter' || e.key === 'Escape') && hideUsernameChange() }
                />}
                {!usernameChange && <div className="c-pointer" onClick={showUsernameChange}>{user.username}</div>}
            </div>

            <h1 className="main-menu__header">tic tac toe</h1>
            <button onClick={toggleNewGame} className={`main-menu__btn btn ${newGame ? 'btn--fill' : ''}`}>new game</button>

            {newGame &&
                <form className="form">
                    <h2 className="form__header">Create new game</h2>
                    <div className="form__field">
                        <label className="form__label" htmlFor="game-size">game size: <span>{size}</span></label>
                        <input value={size} onChange={e => setSize(e.target.value)} className="input input--range" id="game-size" type="range" min="3" max="100" step="1" />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="game-players">players: <span>{players}</span></label>
                        <input value={players} onChange={e => setPlayers(e.target.value)} className="input input--range" id="game-players" type="range" min="2" max="4" step="1" />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="score-to-win">score to win: <span>{scoreToWin}</span></label>
                        <input value={scoreToWin} onChange={e => setScoreToWin(e.target.value)} className="input input--range" id="score-to-win" type="range" min="3" max="10" step="1" />
                    </div>
                    <div className="form__btns">
                        <button onClick={createGameHandler} className="btn">Create</button>
                        <button onClick={cancelHandler} className="btn">Cancel</button>
                    </div>
                </form>
            }

            <button onClick={toggleJoinGame} className={`main-menu__btn btn ${joinGame ? 'btn--fill' : ''}`}>join</button>

            {joinGame &&
                <form className="form">
                    <h2 className="form__header">Join game</h2>
                    <div className="form__field">
                        <label className="form__label" htmlFor="game-id">game id:</label>
                        <input value={gameId} onChange={e => setGameId(e.target.value.trim())} placeholder="enter game id" className="input" id="game-id" type="text" />
                    </div>
                    <div className="form__btns">
                        <button onClick={joinGameHandler} className="btn">Join</button>
                        <button onClick={cancelHandler} className="btn">Cancel</button>
                    </div>

                </form>
            }
        </div>
        </>
    )
}