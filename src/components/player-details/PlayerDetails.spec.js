import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import userEvent from '@testing-library/user-event'
import PlayerDetails from './PlayerDetails'
import dataSet from '../../mock-utils/MockPlayerInfo'         // we will use data from this dataSet to test our component

const playerInfo = dataSet.playerInfo                     // the product data for our component under test

/**
 * Define a function that creates and returns an instance of the CustomerDetails component.
 * I usually define this function to take the same props as the component under test,
 * thus giving complete control over how the component is constructed.
 */
function getPlayerDetails(playerInfo) {
    return (
        <PlayerDetails playerInfo={playerInfo}
                       errorFlag={false}
                       serviceDown={false}
                       playerNotFound={false}
                       resetErrorFlg={jest.fn()}>
        </PlayerDetails>
    )
}

function getPlayerDetailsWithCheckbox(playerInfo) {
    return (
        <PlayerDetails playerInfo={playerInfo}
                       checkbox={true}
                       index={0}
                       errorFlag={false}
                       serviceDown={false}
                       playerNotFound={false}
                       resetErrorFlg={jest.fn()}>
        </PlayerDetails>
    )
}

describe('PlayerDetails', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
            getPlayerDetails(playerInfo)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders the full Name', () => {                        // our second test
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("playerName")                      // finds the DOM node with the specified text,
                                                                // waits up to 4.5 seconds and if not found will
                                                                // throw an exception
    })
    it('renders the age', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("age")
    })
    it('renders skillLevel', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("skillLevel")
    })
    it('renders region', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("region")
    })
    it('renders language', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("language")
    })
    it('renders personalityType', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("personalityType")
    })
    it('renders minimumWaitTime', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("minimumWaitTime")
    })
    it('renders game', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("game")
    })
    it('renders gameMode', () => {
        render(getPlayerDetails(playerInfo))
        screen.getByTestId("gameMode")
    })
    it('renders the checkbox if flag is true', () => {
        render(getPlayerDetailsWithCheckbox(playerInfo))
        screen.getByTestId("checkbox")
    })
})