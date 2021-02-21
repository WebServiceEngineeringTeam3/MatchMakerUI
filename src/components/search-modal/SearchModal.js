import React, {Component} from 'react';
import './SearchModal.css';
import SearchForm from '../search-form/SearchForm';

export default class SearchModal extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            showSearchModal: true,
            searchFormError: false
        }
        
        this.setStateForModal = this.setStateForModal.bind(this);
        this.searchInput = this.searchInput.bind(this);
        this.sendSearchModalStatusToParent = this.sendSearchModalStatusToParent.bind(this);
    }

    searchInput(value, formError, searchModal){
        this.setState({
            value: value,
            searchFormError: formError,
            showSearchModal: searchModal
        });

    }
    
    setStateForModal(value){
        this.setState({
        	showSearchModal: value
        });
        
        this.sendSearchModalStatusToParent();
    }
    
    sendSearchModalStatusToParent = () => {
        if(this.state.showSearchModal !== undefined && this.state.showSearchModal !== true){
            this.props.setStateForModal(this.state.showSearchModal);
        }
    }

    render() {
        return(
            <div>
                <div className="searchModal" data-testid="searchModal">
                    <SearchForm {...this.props} retrievePlayerInfo={this.props.retrievePlayerInfo}
                        setStateForModal={this.setStateForModal} searchInput={this.searchInput}/>
                </div>
            </div>
        );
    }
}