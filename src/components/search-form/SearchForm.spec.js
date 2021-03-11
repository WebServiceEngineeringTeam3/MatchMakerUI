import React from 'react'                               // we always need React when testing React components
import { render, screen } from '@testing-library/react'         // render the component under test
import SearchForm from './SearchForm'
import Context from '../contexts/Context'
import userEvent from '@testing-library/user-event'
import { APP_TITLE } from '../../models/Constants'

const playerId = "EXA6777"

function setStateForModal(){
	console.log("setStateForModal")
}

function searchInput(){
	console.log("searchInput")
}

function getSearchForm() {
    return (
            <Context.Provider value={{
                searchedInput: '',
                setSearchedInput: jest.fn()
            }}>
            	<SearchForm
                setStateForModal={setStateForModal} searchInput={searchInput}/>
    	 </Context.Provider>
    )
}

describe('SearchForm', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getSearchForm()
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
    })
    it('renders back arrow', () => {                        
        render(getSearchForm())
        screen.getByTestId("backArrow")                      
    })
    it('renders search text box', () => {                        
        render(getSearchForm())
        screen.getByTestId("searchTextboxDiv")                      
    })
    it('renders search button', () => {                        
        render(getSearchForm())
        screen.getByTestId("searchButton")                      
    })
    it('renders homepage when back arrow has been clicked', async () => {                        
    	render(getSearchForm())
        const backArrow = await screen.getByTestId("backArrow") //needs await bc of var assignment
        userEvent.click(backArrow) // click the link to change route
        screen.findByText(APP_TITLE)
    })
    it('renders matchmaking page when typing player id and clicking on search button', async () => {
    	render(getSearchForm())
        const searchButton = await screen.getByTestId("searchButton")
        const searchTextbox = await screen.getByTestId("searchTextbox")
        userEvent.type(searchTextbox, playerId, { allAtOnce: true })
        userEvent.click(searchButton)
        //screen.findByText('Matchmaking')
    })
})