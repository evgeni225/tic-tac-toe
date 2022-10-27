import { Menu } from './components/Menu'
import { Game } from './components/Game'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from 'react'
import { setUserAction } from './store/reducers/user'
import { useDispatch, useSelector } from 'react-redux'

function App() {
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserAction())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <div className="app">
                {loading && <div>loading...</div>}
                {!loading && 
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/:id" element={<Game />} />
                    </Routes>
                }
            </div>
        </BrowserRouter>
    )
}

export default App
