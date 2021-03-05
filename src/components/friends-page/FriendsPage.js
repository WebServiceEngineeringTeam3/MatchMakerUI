import React, { Component } from 'react';
import { searchPlayers } from '../../api/endpoints';
import Context from '../../components/contexts/Context';
import BackNavigator from "../back-navigator/BackNavigator";
import ResponseHelper from '../Util/ResponseHelper.js';
import {  validateUserInput } from '../Util/util';
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import SubHeader from './../sub-header/SubHeader';
import {
    GAMER_ID, RESOURCE_NOT_AVAILABLE_CODE
} from '../../models/Constants';
import './FriendsPage.css';
import Loading from '../Loading/Loading';
import PlayerDetails from "../player-details/PlayerDetails";


class FriendsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            gamerId: this.props.gamerId,
            PlayerInfo: this.props.playerInfo,
            friendsList: [],
            isLoading: true,
            showSearchModal: false,
            serviceDown: false,
            playerNotFound: false,
            errorFlag: false
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
    }


    /**
     * This function used to Call the Fetch Rewards Management Service
     */
    componentDidMount() {
        // Search for Players
        this.searchForPlayers(this.props.playerInfo);
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    searchForPlayers = (input) => {
        //var inputType = validateUserInput(input);

        //if(inputType === GAMER_ID){
        searchPlayers("READ", input).then(data =>{
            let gamId = data.gamerId;
            let friendsObject = data.friendsList;
            let errorObject = data.errorResponse;

            console.log("gamId: " + gamId);
            console.log("friendsObject: " + JSON.stringify(data.friendsList));
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
                console.log("setting context in friends page");
                this.context.setPlayerNotFound(false);
                this.context.setServiceDown(false);
                this.context.setFriendsList(friendsObject);

                this.setState(
                    {
                        isLoading: false,
                        gamerId: input,
                        friendsList: friendsObject,
                        serviceDown: false,
                        customerNotFound: false
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
                    customerNotFound: false,
                    isLoading: false
                });
            }
        });
        // }
    }

    /** This is function used to set error message value in state
     * @param  {} errorResponse
     * @param  {} helper
     */
    handleError(errorResponse, helper) {
        if ((errorResponse === "undefined" || errorResponse === null) || helper.servicedown(errorResponse)) {
            this.setState({
                serviceDown: true,
                customerNotFound: false,
                isLoading: false
            });
        }
        else {
            this.setState({
                customerNotFound: true,
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
     * This function is used to Show Player Information
     */
    renderPlayerDetails = () => {

        if ((!this.state.playerNotFound && !this.state.serviceDown)) {
            let state = this.state;

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            return (
                // To Show PlayerInfo
                <PlayerDetails playerInfo={state.playerInfo}
                               errorFlag={state.errorFlag}
                               serviceDown={state.serviceDown}
                               playerNotFound={state.playerNotFound}
                               resetErrorFlg={this.setErrorFlag}>
                </PlayerDetails>
            );
        }
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
                                {/*this.renderPlayerDetails()*/}
                                <div className="clearDiv"></div>

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