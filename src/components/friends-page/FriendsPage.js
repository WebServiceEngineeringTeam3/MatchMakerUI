import React, { Component } from 'react';
import Context from '../../components/contexts/Context';
import BackNavigator from "../back-navigator/BackNavigator";
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import SubHeader from './../sub-header/SubHeader';
import './FriendsPage.css';
import Loading from '../Loading/Loading';
import PlayerDetails from "../player-details/PlayerDetails";
import {searchPlayers, addFriends} from "../../api/endpoints";
import {RESOURCE_NOT_AVAILABLE_CODE} from "../../models/Constants";
import ResponseHelper from "../Util/ResponseHelper";


class FriendsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            selectedFriends: [],
            gamerId: this.props.gamerId,
            friendsList: this.props.friendsList,
            isLoading: true,
            showSearchModal: false,
            serviceDown: false,
            playerNotFound: false,
            errorFlag: false,
            buttonCSS: 'button_disable'
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
    }


    componentDidMount() {
        this.searchForPlayers();
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    searchForPlayers = () => {
        let input = this.context.playerInfo;
        searchPlayers("READ", input).then(data =>{
            let gamId = data.gamerId;
            let friendsObject = data.friendsList;
            let errorObject = data.errorResponse;

            console.log("gamId: " + gamId);
            console.log("friendsObject: " + JSON.stringify(friendsObject));
            console.log("errorResponse: " + JSON.stringify(data.errorResponse));

            if(errorObject){
                if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                    this.setState({
                        playerNotFound: true,
                        serviceDown: false,
                        isLoading: false
                    });
                    this.context.setSearchedInput(input);
                    this.context.setPlayerNotFound(true);
                }
                else{
                    this.setState({
                        playerNotFound: false,
                        serviceDown: true,
                        isLoading: false
                    });
                    this.context.setSearchedInput(input);
                    this.context.setServiceDown(true);
                }
            }
            else{
                //clearing context
                console.log("searchForPlayers SUCCESS");
                this.context.setPlayerNotFound(false);
                this.context.setServiceDown(false);
                this.context.setFriendsList(friendsObject);

                this.setState(
                    {
                        isLoading: false,
                        gamerId: gamId,
                        friendsList: friendsObject,
                        serviceDown: false,
                        playerNotFound: false
                    });
            }
        }).catch(error => {
            console.log("ERROR SEARCHING FOR FRIENDS " + error.message);
            try {
                let response = JSON.parse(error.message);
                let errorResponse = response.errorResponse;
                let helper = new ResponseHelper();
                this.handleError(errorResponse, helper);
            }
            catch (err) {
                this.setState({
                    serviceDown: true,
                    playerNotFound: false,
                    isLoading: false
                });
            }
        });
    }

    /** This is function used to set error message value in state
     * @param  {} errorResponse
     * @param  {} helper
     */
    handleError(errorResponse, helper) {
        if ((errorResponse === "undefined" || errorResponse === null) || helper.servicedown(errorResponse)) {
            this.setState({
                serviceDown: true,
                playerNotFound: false,
                isLoading: false
            });
        }
        else {
            this.setState({
                playerNotFound: true,
                serviceDown: false,
                isLoading: false
            });
        }
    }




    /**
     * This function is used to set a boolean value of true or false to
     * showSearchModal attribute. If true, the app will display the SearchModal.
     * If false, it will hide it.
     * @param boolean value
     */
    setStateForModal(value) {
        this.setState({ showSearchModal: value })
    }


    /**
     * This function is used to set the Error flag
     * @param  {} value
     *
     */
    setErrorFlag(value) {
        this.setState({ errorFlag: value })
    }

    /**
     * This function is used to Show Error Box While Fetch Call Get the Error Message.
     */
    renderErrorMessage() {
        if(this.context.serviceDown){ return (<ErrorBanner gamerId={this.context.searchedInput} message="SERVICE_DOWN"></ErrorBanner>);}
        else if(this.context.playerNotFound){
            return (<ErrorBanner gamerId={this.context.searchedInput} message="PLAYER_NOT_FOUND"></ErrorBanner>);
        }

    }

    /**
     * This function is used to populate selectedPlayers array. If gamerId exists in array, then element will be removed.
     * If element does not exist, then it will be added to array
     */
    handleSelectedFriends = (gamerId) =>{
        let array = this.state.selectedFriends;
        let indexResult = array.indexOf(gamerId);
        if(indexResult >= 0){
            array = array.filter(id => id !== gamerId)
            this.setState({
                selectedFriends: array
            });
        }
        else{
            array.push(gamerId);
            this.setState({
                selectedFriends: array
            });
        }
        //If selectedPlayers array is populated then enable button, else disable it
        if(array.length > 0){ this.setState({ buttonCSS: 'button_enable' }); }
        else{ this.setState({ buttonCSS: 'button_disable' }); }
    }

    /**
     * This function is used to Show Player Information
     */
    renderPlayerDetails = () => {

        if ((!this.state.playerNotFound && !this.state.serviceDown)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            let friendsArray = this.state.friendsList;
            let children = [];
            if(!!friendsArray){
                for(let index = 0; index < friendsArray.length; index++ ){
                   children.push(
                       <PlayerDetails playerInfo={friendsArray[index]}
                                      index={index}
                                      checkbox={true}
                                      errorFlag={state.errorFlag}
                                      serviceDown={state.serviceDown}
                                      playerNotFound={state.playerNotFound}
                                      handleSelectedFriends={this.handleSelectedFriends}
                                      resetErrorFlg={this.setErrorFlag}>
                       </PlayerDetails>
                   );
                }
                return children;
            }
        }
    }

    addFriendsToPlayerInfo = () =>{
        addFriends(this.state.gamerId, this.state.selectedFriends).then(data =>{
            console.log("data: " + JSON.stringify(data));
            //Navigate back to Player Info Page if Added Friends Successfully
            this.props.history.push({pathname: './playerInfo', state: {searchInput: this.state.gamerId}});
        }).catch(error => {
            console.log("ERROR ADDING FRIENDS " + error.message);
            try {
                let response = JSON.parse(error.message);
                let errorResponse = response.errorResponse;
                let helper = new ResponseHelper();
                this.handleError(errorResponse, helper);
            }
            catch (err) {
                this.setState({
                    serviceDown: true,
                    playerNotFound: false,
                    isLoading: false
                });
            }
        });
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="friendsPage">
                        <Header>
                            <BackNavigator {...this.props} />
                            <div className="headerTxt">Player Search Results</div>
                            <div>&nbsp;</div>

                        </Header>
                        <SubHeader gamerId={this.state.gamerId}></SubHeader>
                        <div className="friendsPage" onClick={this.closeSkuDetailsImgModal} >

                            <div className="friendsBody">
                                {this.renderErrorMessage()}
                                {this.renderPlayerDetails()}
                                <div className="clearDiv"></div>
                                <div><button id="submit-button" className={this.state.buttonCSS + " submit-button disabled"} onClick={this.addFriendsToPlayerInfo}>Add Friends</button></div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

FriendsPage.contextType = Context;
export default FriendsPage;