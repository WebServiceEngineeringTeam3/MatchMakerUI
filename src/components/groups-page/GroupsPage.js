import React, { Component } from 'react';
import Context from '../../components/contexts/Context';
import BackNavigator from "../back-navigator/BackNavigator";
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import SubHeader from './../sub-header/SubHeader';
import './GroupsPage.css';
import PlayerDetails from "../player-details/PlayerDetails";
import {gamerFriendsInfo, postGroup} from "../../api/endpoints";
import ResponseHelper from "../Util/ResponseHelper";
import {validateForAlphaNumericInput} from "../Util/util";


class GroupsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            selectedFriends: [],
            completeInfoFriendsList: [{}],
            gamerId: this.props.gamerId,
            isLoading: true,
            showSearchModal: false,
            serviceDown: false,
            playerNotFound: false,
            errorFlag: false,
            buttonCSS: 'button_disable',
            groupName: ''
        }

        this.setStateForModal = this.setStateForModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.setErrorFlag = this.setErrorFlag.bind(this);
    }

    componentDidMount() {
        //Fetch Gamer Friends Full Info
        this.retrieveGamerFriendsInfo(this.context.playerInfo.friendsList.join());
    }

    componentDidUpdate() {
        this.renderErrorMessage();
    }

    retrieveGamerFriendsInfo = (input) => {
        gamerFriendsInfo(input).then(data => {
            let completeInfoFriendsList = data.completeInfoFriendsList;

            console.log("completeInfoFriendsList: " + JSON.stringify(completeInfoFriendsList));

                    //clearing context
                    console.log("retrieveGamerFriendsInfo SUCCESS");
                    this.context.setCompleteInfoFriendsList(completeInfoFriendsList);
                    this.context.setPlayerNotFound(false);
                    this.context.setServiceDown(false);

                    this.setState(
                        {
                            isLoading: false,
                            completeInfoFriendsList: completeInfoFriendsList,
                            serviceDown: false,
                            playerNotFound: false
                        });
            }).catch(error => {
                console.log("ERROR FETCHING GAMER FRIENDS INFO " + error.message);
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
        if(array.length > 0){
            if(this.validateGroupName()){
                this.setState({
                    buttonCSS: 'button_enable',
                    groupName: document.getElementById("groupName").value
                });
            }
            else{ this.setState({
                buttonCSS: 'button_disable',
                groupName: ''
            }); }
        }
        else{ this.setState({
            buttonCSS: 'button_disable',
            groupName: ''
        }); }
    }

    validateGroupName = () => {
        let isValid = validateForAlphaNumericInput(
            document.getElementById("groupName").value
        );
        console.log("groupName " + isValid);
        return isValid;
    };

    /**
     * This function is used to Show Player Information
     */
    renderPlayerDetails = () => {

        if ((!this.state.playerNotFound && !this.state.serviceDown)) {
            let state = this.state;

            let friendsArray = this.context.completeInfoFriendsList;
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

    addFriendsToGroup = () =>{
        postGroup(this.context.gamerId, this.state.selectedFriends, this.state.groupName).then(data =>{
            //Navigate back to Player Info Page if Group Created Successfully
            this.props.history.push({pathname: './playerInfo', state: {searchInput: this.context.gamerId}});
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

    navigateToPlayerInfoPage = () =>{
        this.props.history.push({pathname: './playerInfo'});
    }

    renderGroupNameInputBox = () =>{
        return(
            <div>
                <div className="form_label">Group Name</div>
                <div className="form-textbox">
                    <input type="text" id="groupName" data-testid="groupName"/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="groupsPage">
                        <Header>
                            <BackNavigator {...this.props} />
                            <div className="headerTxt">Create Group</div>
                            <div>&nbsp;</div>

                        </Header>
                        <SubHeader gamerId={this.context.gamerId}></SubHeader>
                        <div className="groupsPage" onClick={this.closeSkuDetailsImgModal} >

                            <div className="groupsBody">
                                {this.renderErrorMessage()}
                                {this.renderGroupNameInputBox()}
                                {this.renderPlayerDetails()}
                                <div className="clearDiv"></div>
                                <div><button id="submit-button" className={this.state.buttonCSS + " submit-button disabled"} onClick={this.addFriendsToGroup}>Create Group</button></div>
                                <div data-testid="cancel-button"><button id="cancel-button" className="cancel-button"
                                                                         onClick={this.navigateToPlayerInfoPage}>Cancel</button></div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

GroupsPage.contextType = Context;
export default GroupsPage;