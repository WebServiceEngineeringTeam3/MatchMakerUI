import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackNavigator from './BackNavigator'
import { APP_TITLE } from '../../models/Constants'

const historyMock = {replace: jest.fn()}

function getBackNavigator() {
    return (
    		<BackNavigator history={historyMock}/>
    )
}

describe('BackNavigator', () => {
    it('renders without crashing', () => {
        const { container } = render(
        		getBackNavigator()
        )
        expect(container).toBeTruthy()
    })
    it('renders Homepage Text', () => {                        
        render(getBackNavigator())
        screen.getByTestId("backNavTitle")                      
    })
    it('renders homepage when back navigator has been clicked', async () => {      
        render(getBackNavigator())
        const backButton = await screen.getByTestId("backNavLink") 
        userEvent.click(backButton) 
        screen.findByText(APP_TITLE)
    })
})