import React, { Component } from 'react';
import {fetchPlayerInfo} from '../../api/endpoints';
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
import './PlayerInfoPage.css';
import Loading from '../Loading/Loading';
import PlayerDetails from "../player-details/PlayerDetails";
import {Link} from "react-router-dom";
import FriendID from "../friend-id/FriendID";
import GroupFriendID from "../group-friend-id/GroupFriendID";

class PlayerInfoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            gamerId: this.props.gamerId,
            playerInfo: this.props.playerInfo,
            isLoading: true,
            showSearchModal: false,
            serviceDown: false,
            playerNotFound: false,
            errorFlag: false,
            friendId: ''
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
    }


    /**
     * This function used to Call the retrieve player info from Match Maker Service
     */
    componentDidMount() {
        // Fetch Details
        this.retrievePlayerInfo(this.context.searchedInput);
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    retrievePlayerInfo = (input) => {
        var inputType = validateUserInput(input);

        if(inputType === GAMER_ID){
            fetchPlayerInfo(input).then(data =>{
                let gamId = data.gamerId;
                let playerObject = data.playerInfo;
                let errorObject = data.errorResponse;

                console.log("gamId: " + gamId);
                console.log("playerObject: " + JSON.stringify(data.playerInfo));
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
                    console.log("retrievePlayerInfo SUCCESS");
                    this.context.setSearchedInput(input);
                    this.context.setGamerId(input);
                    this.context.setPlayerInfo(playerObject);
                    this.context.setPlayerNotFound(false);
                    this.context.setServiceDown(false);

                    this.setState(
                        {
                            isLoading: false,
                            gamerId: input,
                            playerInfo: playerObject,
                            serviceDown: false,
                            customerNotFound: false
                        });
                }
            }).catch(error => {
                console.log("ERROR FETCHING PLAYER INFO " + error.message);
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
        }
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

    setPlayerModal = (friendId) =>{
        console.log("setPlayerModal: " + friendId);
        this.setState({
            friendId: friendId
        });
        this.renderFriendInfo(friendId);
    }

    renderFriendInfo = (friendId) => {
        console.log("renderFriendInfo: " + friendId);
        this.context.setFriendId(friendId);
        this.props.history.push({pathname: './friendInfo', state: {friendId: friendId}});
    }

    renderFriendsList = () => {

        if ((!this.state.playerNotFound && !this.state.serviceDown)) {

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            let friendsList = this.state.playerInfo.friendsList;
            console.log("this.state.playerInfo.friendsList: " + this.state.playerInfo.friendsList);
            if(friendsList && friendsList.length > 0){
                let children = [];
                if(!!friendsList){
                    for(let index = 0; index < friendsList.length; index++ ){
                        children.push(
                            <FriendID friendId={friendsList[index]} setPlayerModal={this.setPlayerModal}/>
                        );
                    }
                }
                return(
                    <div>
                        <h1 className='friendsListTitle'>Friends List</h1>
                        <div className='friendsList'>
                            {children}
                        </div>
                    </div>
                );
            }
            else{
                return (<h3>You Have Not Added Friends</h3>);
            }
        }
    }

    renderGroupsList = () => {

        if ((!this.state.playerNotFound && !this.state.serviceDown)) {

            // Loading Image while calling Fetch Service
            if (this.state.isLoading) return <Loading />;

            let groupsList = this.state.playerInfo.groupsList;
            console.log("this.state.playerInfo.groupsList: " + JSON.stringify(this.state.playerInfo.groupsList));
            if(groupsList && groupsList.length > 0){
                let children = [];
                if(!!groupsList){
                    for(let index = 0; index < groupsList.length; index++ ){
                        children.push(
                            <GroupFriendID groupFriend={groupsList[index]} setPlayerModal={this.setPlayerModal}/>
                        );
                    }
                }
                return(
                    <div>
                        <h1 className='friendsListTitle'>Groups List</h1>
                        <div className='friendsList'>
                            {children}
                        </div>
                    </div>
                );
            }
            else{
                return (<h3>You Have Not Added Groups</h3>);
            }
        }
    }

    renderSearchFriendsButton = () =>{
        return (
            <div>
                <Link to="/searchFriendsPage" data-testid="friendsButton">
                    <button type="button" className={"button btnContainer addPlayerButton "+(this.state.showSearchModal ? 'hide': '')}>Search Friends</button>
                </Link>
                </div>
        );
    }

    renderCreateGroupButton = () =>{
        return (
            <div>
                <Link to="/groupsPage" data-testid="groupsButton">
                    <button type="button" className={"button btnContainer createGroupButton "+(this.state.showSearchModal ? 'hide': '')}>Create Group</button>
                </Link>
            </div>
        );
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="playerInfoPage">
                        <Header>
                            <BackNavigator {...this.props} />
                            <div className="headerTxt">Player Info</div>
                            <div>&nbsp;</div>

                        </Header>
                        <SubHeader gamerId={this.state.gamerId}></SubHeader>
                        <div className="playerInfoPage" onClick={this.closeSkuDetailsImgModal} >

                            <div className="playerInfoBody">
                                {this.renderErrorMessage()}
                                {this.renderPlayerDetails()}
                                {this.renderFriendsList()}
                                {this.renderGroupsList()}
                                {this.renderSearchFriendsButton()}
                                {this.renderCreateGroupButton()}
                                <div className="clearDiv"></div>

                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

PlayerInfoPage.contextType = Context;
export default PlayerInfoPage;