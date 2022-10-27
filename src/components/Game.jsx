import { useEffect, useRef } from "react"
import { Item } from "./Item"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateDataAction } from "../store/reducers/game"
import { changeIdAction } from "../store/reducers/user"


export const Game = () => {
    const game = useSelector(state => state.game)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const socket = useRef(null)
    const params = useParams()
    const navigate = useNavigate()

    // const [myTurn, setMyTurn] = useState(false)

    useEffect(() => {
        console.log(game.game)
    })

    useEffect(() => {
        // if (!game.game.id) return

        // ws connection
        socket.current = new WebSocket('ws://tictactoe-api-123412.herokuapp.com')
        socket.current.onopen = () => {
        socket.current.send(JSON.stringify({
            id: params.id,
            username: user.username,
            method: 'connection'
        }))}

        socket.current.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                // delete
                case 'connection':
                    console.log('connection case')
                    handleConnection(msg)
                    break
                case 'update':
                    console.log(msg)
                    handleUpdate(msg)
                    break
                default:
                    console.log('default case')
                    break
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleConnection = (msg) => {
        const { userId } = msg
        dispatch(changeIdAction(userId))
    }

    // update game data handler
    const handleUpdate = (msg) => {
        const { game, players } = msg.session
        const data = {
            id: msg.id,
            playground: game.playground,
            playersList: players,
            score: game.score,
            next: game.next,
            winner: game.winner,
            players: game.players,
            size: game.size
        }
        dispatch(updateDataAction(data))
    }
    
    // restarg game handler
    const restartGame = async () => {
        // if (!game.game.winner) return

        socket.current.send(JSON.stringify({
            method: 'restart',
            gameId: params.id,
            playerId: user.id,
        }))
    }

    const clickHandler = async (id) => {
        // if connected not all players
        if (game.game.players > game.game.playersList.length) return
        // if winner
        if (game.game.winner) return
        // if item already used
        if (game.game.playground[id]) return
        // if not players turn
        if (game.game.playersList[game.game.next].id !== user.id) return

        socket.current.send(JSON.stringify({
            method: 'step',
            gameId: params.id,
            itemId: id,
            playerId: user.id
        }))
    }


    ////////////////////////////////////////////
    // Building playground  

    let counter = 0
    const rows = []

    async function copyHandler() {
        try {
            await navigator.clipboard.writeText(game.game.id);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Error in copying text: ', err);
        }
    }

    function buildPG() {
        for (let i = 0; i < game.game.size; i++) {
            const row = []
            for (let j = 0; j < game.game.size; j++) {
                row.push(
                    <Item disabled={game.game.playground[counter]} key={counter} clickHandler={clickHandler} id={counter} item={game.game.playground[counter]} />
                )
                counter++
            }
            rows.push(
                <div key={`row-${i}`} className="board__row">{row}</div>
            )
        }
    }

    if (game.game.playground) {
        buildPG()
    }


    return (
        <div className="app">
            <div>{'UserId: ' + user.id}</div>
            <div>{'Username: ' + user.username}</div>
            <div>{'GameId: ' + params.id}</div>
            <div>__pg: {JSON.stringify(game.game.playground)}__</div>
            <div>__current: {JSON.stringify(game.game.playersList[game.game.next])}__</div>
            <div>__winner: {JSON.stringify(game.game.winner)}__</div>
            <div>__pg_w: {game.game.size}__</div>
            <div>__players: {JSON.stringify(game.game.playersList)}</div>
            <div>__players_needed: {game.game.players}</div>


            {!game.game.winner && <h3 >Current player: {JSON.stringify(game?.game?.playersList[game.game.next]?.item)}</h3>}
            {game.game.winner && <h3>Winner: {game.game.winner}</h3>}
            <hr />

            {game.loading && <div>loading</div>}
            {!game.loading && game.error && 
                <div>
                    Error: {game.error}
                    <button onClick={() => navigate('/')}>redirect</button>
                </div>
            }

            

            {!game.error && !game.loading && game.game.playground &&
                <div className="board">
                    <div className="board__username">
                        <div>{user.username}</div>
                        <div onClick={copyHandler}>{game.game.id}</div>
                    </div>
                    {!game.game.winner && !(game.game.players > game.game.playersList.length) && <div className="board__header">Next: {game.game.next}</div>}
                    {game.game.winner && !(game.game.players > game.game.playersList.length) && <div className="board__header">Winner: {game.game.winner}</div>}
                    {!game.loading && game.game.players > game.game.playersList.length && <div className="board__header">waiting for other players {game.game.playersList.length + "/" + game.game.players}</div>}
                    <div className="board__body">
                        {rows}
                    </div>
                    <div className="board__btns">
                        <button disabled={!game.game.winner} className="btn" onClick={restartGame}>restart</button>
                    </div>
                </div>
            }
        </div>
    )
}