import React from 'react'                               // we always need React when testing React components
import { render, screen } from '@testing-library/react'         // render the component under test
import PlayerInfoPage from './PlayerInfoPage'
import Context from '../contexts/Context'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import dataSet from '../../mock-utils/MockPlayerInfo'

const playerInfo = dataSet.playerInfo

const gamerId = "EXA6777"
const history = createMemoryHistory()

function getPlayerInfo(gamerId, history) {
    return (
        <Router history={history}>
            <Context.Provider value={{
                searchedInput: gamerId,
                setSearchedInput: jest.fn(),
                playerInfo: playerInfo,
                setPlayerInfo: jest.fn(),
                gamerId: gamerId,
                setGamerId: jest.fn()
            }}>
                <PlayerInfoPage gamerId={gamerId} playerInfo={playerInfo}/>
            </Context.Provider>
        </Router>
    )
}

describe('PlayerInfoPage', () => {
    it('renders without crashing', () => {
        const { container } = render(
            getPlayerInfo(gamerId, history)
        )
        expect(container).toBeTruthy()
    })
    it('renders player info page', () => {
        render(getPlayerInfo(gamerId, history))
        screen.getByTestId("playerInfoPage")
    })
    it('renders back navigator', () => {
        render(getPlayerInfo(gamerId, history))
        screen.getByTestId("backNavLink")
        screen.getByTestId("backNavTitle")
    })
    it('renders header', () => {
        render(getPlayerInfo(gamerId, history))
        screen.getByText("Player Info")
    })
    it('renders gamer ID in subheader', () => {
        render(getPlayerInfo(gamerId, history))
        screen.getByTestId("gamerIdSubHeader")
    })
})