import React, {Component} from 'react';
import './HomePage.css'
import fortniteImage from './../../images/Fortnite.jpg'
import marioKartImage from './../../images/marioKart8.jpg'
import overwatchImage from './../../images/overwatch.jpg'
import warzoneImage from './../../images/Warzone.jpg'
import worldOfWarcraftImage from './../../images/worldOfWarcraft.jpg'
import Header from './../header/Header'
import SearchModal from "./../search-modal/SearchModal"
import Context from '../../components/contexts/Context'
import { APP_TITLE, HOME_PAGE_LABEL } from '../../models/Constants';

class HomePage extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            showSearchModal: false
        }
        this.renderSearchModal = this.renderSearchModal.bind(this);
        this.setStateForModal = this.setStateForModal.bind(this);
    }

    componentDidMount() {
         //resetting context
         this.context.setSearchedInput("");
         this.context.setPlayerInfo(null);
         this.context.setPlayerId("");
    }

    renderSearchModal(value){
        let display = value;
        
        if(display && display === true){
            return <SearchModal {...this.props} setStateForModal={this.setStateForModal}></SearchModal>
        }
    }

    setStateForModal(value){
        this.setState({
            showSearchModal: value
        }, () => this.renderSearchModal(value));
       
    }

    render(){
        return(
                <Context.Consumer>
                {(context) => (
                        <div className="homePage">
                            <div data-testid="titleTxt"><Header headerTextClassName="titleTxt" id="titleTxt">{APP_TITLE}</Header></div>
                            <div id="images">
                                <div id="overwatch-image">
                                    <div className="overwatch-image" data-testid="overwatchImage"><img src={overwatchImage} alt="overwatch"/></div>
                                </div>
                                <div id="warzone-image">
                                    <div className="warzone-image" data-testid="warzoneImage"><img src={warzoneImage} alt="warzone"/></div>
                                </div>
                                <div id="warcraft-image">
                                    <div className="warcraft-image" data-testid="warcraftImage"><img src={worldOfWarcraftImage} alt="warcraft"/></div>
                                </div>
                                <div id="fortnite-image">
                                    <div className="fortnite-image" data-testid="fortniteImage"><img src={fortniteImage} alt="fortnite"/></div>
                                </div>
                                <div id="mariokart-image">
                                    <div className="mariokart-image" data-testid="mariokartImage"><img src={marioKartImage} alt="mariokart"/></div>
                                </div>
                            </div>
                            <div className={"label " + (this.state.showSearchModal ? 'hide': '')} id="label" data-testid="homepageLabel">{HOME_PAGE_LABEL}</div>
                            <div data-testid="searchBox" className={"search-text-box "+(this.state.showSearchModal ? 'hide': '')} onClick={() => {this.setStateForModal(true)}}></div>
                            {this.renderSearchModal(this.state.showSearchModal)}
                        </div>
                )}
                </Context.Consumer>
        );
    }
}

  HomePage.contextType = Context;
  export default HomePage;