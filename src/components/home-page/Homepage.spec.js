import React from 'react'
import { render, screen } from "@testing-library/react";
import Homepage from './HomePage'
import Context from '../contexts/Context'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'

const history = createMemoryHistory()

function getHomepage() {
    return (
    		<Router history={history}>
            <Context.Provider value={{
                searchedInput: '',
                setSearchedInput: jest.fn(),
                setPlayerInfo: jest.fn(),
                setPlayerId: jest.fn(),
                setGamerId: jest.fn(),
                setPlayerFound: jest.fn(),
                setPlayerNotFound: jest.fn()
            }}>
            	<Homepage/>
    	 </Context.Provider>
    	 </Router>
    )
}

describe('Homepage', () => {
    it('renders without crashing', () => {
        const { container } = render(
        		getHomepage()
        )
        expect(container).toBeTruthy()
    })
    it('renders Homepage title', () => {                        
        render(getHomepage())
        screen.getByTestId("titleTxt")                      
    })
    it('renders game images', () => {
        render(getHomepage())
        screen.getByTestId("overwatchImage")
        screen.getByTestId("fortniteImage")
        screen.getByTestId("mariokartImage")
        screen.getByTestId("warzoneImage")
        screen.getByTestId("warcraftImage")
    })
    it('renders homepage label', () => {                        
        render(getHomepage())
        screen.getByTestId("homepageLabel")                      
    })
    it('renders search box', () => {                        
        render(getHomepage())
        screen.getByTestId("searchBox")                      
    })
    it('renders Search Modal when search box has been clicked', async () => {                        
    	render(getHomepage())
        const searchBox = screen.getByTestId("searchBox")
        userEvent.click(searchBox) // click the link to change route
        await screen.findByText('Search')             
    })
})