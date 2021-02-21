import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'  
import ErrorBanner from './ErrorBanner'

const customerId = "TXN8943"
const message = "CUSTOMER_NOT_FOUND"

function getErrorBanner(customerId, message) {
    return (
    		<ErrorBanner customerId={customerId} message={message}></ErrorBanner>
    )
}

describe('ErrorBanner', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getErrorBanner(customerId, message)
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
        screen.getByTestId("errorBanner")
    })
    it('renders error icon', () => {                        
        render(getErrorBanner(customerId, message))
        screen.getByTestId("errorIcon")                      
    })
    it('renders error message', () => {                        
        render(getErrorBanner(customerId, message))
        screen.getByTestId("errorMessage")                      
    })
})