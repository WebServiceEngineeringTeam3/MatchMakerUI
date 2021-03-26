import React, { Component } from 'react';
import Context from '../../components/contexts/Context';
import BackNavigator from "../back-navigator/BackNavigator";
import Header from './../header/Header';
import ErrorBanner from './../error-banner/ErrorBanner';
import SubHeader from './../sub-header/SubHeader';
import './FriendID.css';
import PlayerDetails from "../player-details/PlayerDetails";
import {addFriends} from "../../api/endpoints";
import ResponseHelper from "../Util/ResponseHelper";


class FriendID extends Component {

    constructor(props) {
        super(props)
        this.state = {
            friendId: this.props.friendId,
            setPlayerModal: this.props.setPlayerModal,
            clicked: false
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

            let friendsArray = this.context.friendsList;
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
        console.log("addFriendsToPlayerInfo");
/*        addFriends(this.context.gamerId, this.state.selectedFriends).then(data =>{
            console.log("data: " + JSON.stringify(data));
            //Navigate back to Player Info Page if Added Friends Successfully
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
        });*/
    }

    setClicked = () =>{
        this.setState({
            clicked: true
        });
        this.props.setPlayerModal(this.props.friendId);
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="friendIdModal">
                        <div>

                            <div>
                                <div className="clearDiv"></div>
                                <div><button id="friend-button" className="button_enable" onClick={this.setClicked}>{this.props.friendId}</button></div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

FriendID.contextType = Context;
export default FriendID;