import React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import Header from './Header'

const text = "Customer Info"

function getHeader(text) {
    return (
    	<Header>
            <div className="headerTxt">{text}</div>
        </Header>
    )
}

describe('Header', () => {
    it('renders without crashing', () => {
        const { container } = render(
        		getHeader(text)
        )
        expect(container).toBeTruthy()
    })
    it('renders Header Text', () => {                        
        render(getHeader(text))
        screen.findByText(text)                      
    })
})