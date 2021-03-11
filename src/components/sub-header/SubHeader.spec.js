import React from 'react'                               // we always need React when testing React components
import { render, screen } from '@testing-library/react'         // render the component under test
import SubHeader from './SubHeader'
import Context from '../contexts/Context'
import dataSet from '../../mock-utils/MockPlayerInfo'         // we will use data from this dataSet to test our component
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const playerInfo = dataSet.playerInfo

const gamerId = "ungo1985"
const history = createMemoryHistory()
	
function getSubHeader(gamerId, history) {
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
            	<SubHeader gamerId={gamerId}></SubHeader>
    	 </Context.Provider>
    	 </Router>
    )
}

describe('SubHeader', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getSubHeader(gamerId, history)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders Gamer ID', () => {
        render(getSubHeader(gamerId, history))
        screen.getByTestId("gamerIdSubHeader")
    })
})