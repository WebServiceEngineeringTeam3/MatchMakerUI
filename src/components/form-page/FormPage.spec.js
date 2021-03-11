import React from 'react'
import { render, screen } from '@testing-library/react'
import FormPage from './FormPage'
import {Router} from "react-router-dom";
import Context from "../contexts/Context";
import { createMemoryHistory } from 'history'
import { CREATE_PROFILE_TEXT } from '../../models/Constants'

const history = createMemoryHistory()

function getFormPage(props){
    return (
        <Router history={history}>
            <Context.Provider value={{
                searchedInput: '',
                setSearchedInput: jest.fn(),
                setPlayerInfo: jest.fn(),
                setPlayerId: jest.fn()
            }}>
                <FormPage {...props}/>
            </Context.Provider>
        </Router>
    )
}

describe('FormPage', () => {
    let props = {
        location: {
            pathname: "/"
        }
    }
    it('renders without crashing', () => {
        const { container } = render(
            getFormPage(props)
        )
        expect(container).toBeTruthy()
    })
    it('renders main title', () => {
        render(getFormPage(props))
        screen.getByText(CREATE_PROFILE_TEXT)
    })
    it('renders text boxes', () => {
        render(getFormPage(props))
        screen.getByText("First Name")
        screen.getByTestId("firstName")
        screen.getByText("Last Name")
        screen.getByTestId("lastName")
        screen.getByText("Gamer ID")
        screen.getByTestId("gamerId")
    })
    it('renders drop down boxes and Submit button', () => {
        render(getFormPage(props))
        screen.getByText("Skill Level")
        screen.getByTestId("skillLevel")
        screen.getByText("Region")
        screen.getByTestId("region")
        screen.getByText("Language")
        screen.getByTestId("language")
        screen.getByText("Personality Type")
        screen.getByTestId("personalityType")
        screen.getByText("Game")
        screen.getByTestId("game")
        screen.getByText("Game Mode")
        screen.getByTestId("gameMode")
        screen.getByText("Submit")
    })
})