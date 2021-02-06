import React from 'react'                               // we always need React when testing React components
import { screen } from '@testing-library/dom'           // screen provides many query functions
import { render } from '@testing-library/react'         // render the component under test
import SearchModal from './SearchModal'
import Context from '../contexts/Context'

function getSearchModal() {
    return (
            <Context.Provider value={{
                searchedInput: '',
                setSearchedInput: jest.fn()
            }}>
            	<SearchModal />
    	 </Context.Provider>
    )
}

describe('SearchModal', () => {
    it('renders without crashing', () => {                      // our first test
        const { container } = render(                           // render our component under test
        		getSearchModal()
        )
        expect(container).toBeTruthy()                          // if we get this far then the component was rendered
        screen.getByTestId("searchModal")
    })
})