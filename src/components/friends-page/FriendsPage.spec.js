import React from 'react'                               // we always need React when testing React components
import { render, screen } from '@testing-library/react'         // render the component under test
import FriendsPage from './FriendsPage'
import dataSet from '../../mock-utils/MockFriendsList'
import {Router} from "react-router-dom";
import Context from "../contexts/Context";
import { createMemoryHistory } from 'history'

const friendsList = dataSet.friendsList                     // the product data for our component under test
const gamerId = "ungo1985";
const history = createMemoryHistory();

/**
 * Define a function that creates and returns an instance of the CustomerDetails component.
 * I usually define this function to take the same props as the component under test,
 * thus giving complete control over how the component is constructed.
 */
function getFriendsPage(friendsList) {
    return (

    <Router history={history}>
        <Context.Provider value={{
            searchedInput: gamerId,
            setSearchedInput: jest.fn(),
            friendsList: friendsList,
            setFriendsList: jest.fn(),
            gamerId: gamerId,
            setGamerId: jest.fn()
        }}>
            <FriendsPage friendsList={friendsList}
                         gamerId={gamerId}
                         errorFlag={false}
                         serviceDown={false}
                         playerNotFound={false}
                         resetErrorFlg={jest.fn()}>
            </FriendsPage>
        </Context.Provider>
    </Router>
    )
}

describe('FriendsPage', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
            getFriendsPage(friendsList)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })

    it('renders header title', () => {
        render(getFriendsPage(friendsList))
        screen.getByText("Player Search Results")
    })

    it('renders gamer Id in subheader', () => {
        render(getFriendsPage(friendsList))
        screen.getByText(gamerId)
    })
})