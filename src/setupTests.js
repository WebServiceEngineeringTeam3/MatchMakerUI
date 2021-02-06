// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom';
//import configureMockAxios from './mock-utils/configureMockAxios'
//import dataSet from './mock-utils/dataSet1'

global.sleep = millis => new Promise(res => setTimeout(res, millis))

beforeAll(() => {
    //configureMockAxios(dataSet)
})
beforeEach(() => {})
afterEach(cleanup)

