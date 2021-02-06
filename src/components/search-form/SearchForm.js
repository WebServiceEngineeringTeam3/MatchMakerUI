import React, {Component} from 'react';
import './SearchForm.css';
import backArrow from '../../images/backArrow.png';
import Context from '../../components/contexts/Context';
import { validateForAlphaNumericInput } from '../Util/util';

class SearchForm extends Component{

    constructor(props){
        super(props)
        this.state = {
           searchFormError: false,
           value: '',
           showSearchModal: false,
           buttonCSS: 'button_disable'
        };
        
        this.onBackFxn = this.onBackFxn.bind(this);
        this.setStateValue = this.setStateValue.bind(this);
        this.sendSearchModalStatusToParent = this.sendSearchModalStatusToParent.bind(this);
        this.sendSearchDataToParent = this.sendSearchDataToParent.bind(this);
        this.enterInput = this.enterInput.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.searchAfterClick = this.searchAfterClick.bind(this);
        this.validLength = this.validLength.bind(this);
    }
    
    componentDidMount() {
    	this.onBackFxn();
        document.getElementById('searchTextbox').focus();
    }

    componentDidUpdate(){
        if(this.state.value === ''){
            document.getElementById("searchTextbox").value = "";
        }
    }

    /**
     * This function sets the state of the component providing values
     * for each attribute
     * @param String value - user provided input
     * @param boolean searchFormError - boolean indicating if error exists in SearchForm component
     * @param boolean showSearchModal - boolean indicating whether to show SearchModal component or not
     * @param String buttonCSS - CSS class provided to button
     */
    setStateValue = (value, searchFormError, showSearchModal, buttonCSS) => {
        this.setState({
            value: value,
            searchFormError: searchFormError,
            showSearchModal: showSearchModal,
            buttonCSS: buttonCSS
        });
    }
    
    onBackFxn = () => {
        this.sendSearchModalStatusToParent();
    }
    
    sendSearchModalStatusToParent = () => {
        if(this.state.showSearchModal !== undefined && this.state.showSearchModal !== true){
            this.props.setStateForModal(this.state.showSearchModal);
        }
    }
    
    sendSearchDataToParent = () => {
        if(this.state.showSearchModal !== undefined && this.state.showSearchModal !== true
            && this.state.value !== undefined && this.state.value !== ''
            && this.state.searchFormError !== undefined && this.state.searchFormError !== true){
            this.props.searchInput(this.state.value, this.state.searchFormError, this.state.showSearchModal);
        }
    }
    
    /**
     * This function will return true if the length of input is between 6 and 14, false otherwise
     * @method validLength
     * @param String input
     * @returns boolean
     * @example 
     *  ///returns true
     *  this.validLength(123456);
     *  
     *  @example
     *  ///returns false
     *  this.validLength(123);
     */
    validLength(input) {
        if (input.length === 7) {
            return true;
        }
        return false;

    }

    /**
     * This function will set the component state every time the user enters input into the text box.
     * 
     * @method handleValueChange
     * @param Event e
     */
    handleValueChange = (e) => {
        
		let value = e.target.value;
        this.setStateValue(value, false, false, 'button_disable');
        if(validateForAlphaNumericInput(value)){
            this.context.setSearchedInput(value);
        	this.setState({buttonCSS: 'button_enable'});
        }
    }

    /**
     * This function will set the component state every time the user enters input into the text box.
     * Once user clicks 'Enter' button, it will validate if input has valid length and retrieve sku details
     * if it does
     * @method enterInput
     * @param Event e
     */
    enterInput = (e) => {
        
        let value = e.target.value;
        let history = this.props.history;
        if(e.keyCode === 13 || e.keyCode === 9){

            this.props.setStateForModal(false);
            if(history.location.pathname === '/'){
                history.push({pathname: './inquiry', state: {searchInput: value}});
            } else {
                this.props.retreiveCustomerAndPurchaseInfo(this.state.value);
            }
        }
    }



    
    /**
     * This function will execute when user clicks on 'Search' or 'Next' button, validating length of input
     * and retrieving sku details if input has valid length
     * @method searchAfterClick
     */
    searchAfterClick = () => {
        let value = this.state.value,
        history = this.props.history;
    
        //input validation
        if(this.validLength(value)){

            this.props.setStateForModal(false);
            if(history.location.pathname === '/'){
                history.push({pathname: './inquiry', state: {searchInput: value}});
            }
            else{
                this.props.retreiveCustomerAndPurchaseInfo(this.state.value);
            }
        }

    }

    render(){
        return(
	        <Context.Consumer>
	        {({ setSearchedInput }) => (
		        <div>
		            <div className="searchboxDiv">
		                <div data-testid="backArrow"><img src={backArrow} alt="" className="back-arrow" onClick={this.onBackFxn}/></div>
		                <div className="searchTextboxDiv" data-testid="searchTextboxDiv">
		                    <input id="searchTextbox" type="text" className="searchTextbox" data-testid="searchTextbox"
		                        onChange={this.handleValueChange}  onKeyDown={this.enterInput}/>
		                </div>
                        <div data-testid="searchButton"><button id="button_search" className={this.state.buttonCSS + " button_search"} 
                            onClick={this.searchAfterClick} 
                            onMouseUp={() => setSearchedInput(this.state.value)} >Search</button></div>
		            </div>
		        </div>
	        )}
	        </Context.Consumer>
        )
    }
}
SearchForm.contextType = Context
export default SearchForm;
