// import React from 'react'                               // we always need React when testing React components
// import { screen } from '@testing-library/dom'           // screen provides many query functions
// import { render } from '@testing-library/react'         // render the component under test
// import userEvent from '@testing-library/user-event'
// import PlayerDetails from './PlayerDetails'
// import dataSet from '../../mock-utils/MockCustomerDetails'         // we will use data from this dataSet to test our component
//
// const customerInfo = dataSet.customerInfo                     // the product data for our component under test
//
// /**
//  * Define a function that creates and returns an instance of the CustomerDetails component.
//  * I usually define this function to take the same props as the component under test,
//  * thus giving complete control over how the component is constructed.
//  */
// function getCustomerDetails(customerInfo) {
//     return (
//     	<CustomerDetails customerInfo={customerInfo}></CustomerDetails>
//     )
// }
//
// describe('CustomerDetails', () => {
//     it('renders without crashing', () => {                      // our first test
//         const { container } = render(                           // render our component under test
//         	getCustomerDetails(customerInfo)
//         )
//         expect(container).toBeTruthy()                          // if we get this far then the component was rendered
//     })
//     it('renders the Name', () => {                        // our second test
//         render(getCustomerDetails(customerInfo))
//         screen.getByTestId("customerName")                      // finds the DOM node with the specified text,
//                                                                 // waits up to 4.5 seconds and if not found will
//                                                                 // throw an exception
//     })
//     it('renders the Street Address', () => {
//         render(getCustomerDetails(customerInfo))
//         screen.getByTestId("streetAddress")
//     })
//     it('renders birthday', () => {
//         render(getCustomerDetails(customerInfo))
//         screen.getByTestId("birthday")
//     })
//     it('renders points', () => {
//         render(getCustomerDetails(customerInfo))
//         screen.getByTestId("points")
//     })
//     it('renders gold status flag', () => {
//         render(getCustomerDetails(customerInfo))
//         screen.getByTestId("goldStatusFlag")
//     })
// })