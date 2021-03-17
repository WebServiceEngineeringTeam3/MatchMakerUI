/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import './FriendInfo.css';
import ResponseHelper from '../Util/ResponseHelper.js';
import {validateUserInput} from "../Util/util";
import {GAMER_ID, RESOURCE_NOT_AVAILABLE_CODE} from "../../models/Constants";
import {fetchPlayerInfo} from "../../api/endpoints";
import Context from "../contexts/Context";
import FriendsPage from "../friends-page/FriendsPage";
import Header from "../header/Header";
import BackNavigator from "../back-navigator/BackNavigator";
import SubHeader from "../sub-header/SubHeader";
import Loading from "../Loading";
let helper = new ResponseHelper();

class FriendInfo extends Component {

    constructor(props){
        super(props);

        this.state = {
            friendId: this.props.friendId,
            playerNotFound: false,
            serviceDown: false,
            playerInfo: {},
            isLoading: true
            // searchFormError: false,
            // errorStoreInput: '',
            // lookUpStrNbr: '',
            // value: '',
            // showLookUpOneStoreModal: false
        };
    }

    componentDidMount() {
        //helper.showHideScrollBar('hide');
       // document.getElementById('look-up-storebox').focus();
        console.log("componentDidMount: " + this.context.friendId);
        this.retrievePlayerInfo(this.context.friendId);
    }

    componentWillUnmount() {
       // helper.showHideScrollBar();
    }

    retrievePlayerInfo = (input) => {
       // var inputType = validateUserInput(input);

       // if(inputType === GAMER_ID){
            fetchPlayerInfo(input).then(data =>{
                let gamId = data.gamerId;
                let playerObject = data.playerInfo;
                let errorObject = data.errorResponse;

                console.log("FriendInfo gamId: " + gamId);
                console.log("FriendInfo playerObject: " + JSON.stringify(data.playerInfo));
                console.log("FriendInfo errorResponse: " + JSON.stringify(data.errorResponse));

                if(errorObject){
                    if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                        this.setState({
                            playerNotFound: true,
                            serviceDown: false,
                            isLoading: false
                        });
                    }
                    else{
                        this.setState({
                            playerNotFound: false,
                            serviceDown: true,
                            isLoading: false
                        });
                    }
                }
                else{
                    //clearing context
                    console.log("FriendInfo retrievePlayerInfo SUCCESS");

                    this.setState(
                        {
                            gamerId: input,
                            playerInfo: playerObject,
                            serviceDown: false,
                            playerNotFound: false,
                            isLoading: false
                        });
                }
            }).catch(error => {
                console.log("ERROR FETCHING FRIEND INFO " + error.message);
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
       // }
    }

    handleInputChange = (event) => {
        this.setState({ lookUpStrNbr: event.target.value });
    }

    cancelClicked = () => {
        //Send event to GA
        this.sendLookupModalStatusToParent(false);
    }

    sendLookupModalStatusToParent = value => {
        if(this.state.showLookUpOneStoreModal !== undefined && this.state.showLookUpOneStoreModal !== true){
            this.props.setStateForLookUpModal(value);
        }
    }

    searchClicked = () => {
        let storeInput = this.state.lookUpStrNbr;


        if(storeInput !== ''){

            if(storeInput.length === 4){this.props.onFetchGeoLocationLookUpStore(this.props.skuNbr, storeInput);}
            else if(storeInput.length === 3){
                storeInput = "0" + storeInput;
                this.props.onFetchGeoLocationLookUpStore(this.props.skuNbr, storeInput);
            }
            else{
                this.setState({
                    searchFormError: true,
                    errorStoreInput: storeInput
                });
            }
        }

    }

    renderErrorMessage = () =>{
        if(this.state.playerNotFound === true || this.state.serviceDown === true){
            return <div className="label-input-box-error">Error Occurred While Searching for Friend Info</div>;
        }
    }

    renderTextBoxColor = () => {
        if(this.state.searchFormError === true){
            return "look-up-storebox-error";
        }
        else{
            return "look-up-storebox";
        }
    }

    /**
     * @method enterInput
     * @param Event e
     */
    enterInput = (e) => {
        let enteredStrNbr = this.state.lookUpStrNbr;
        if (this.state.errorStoreInput === enteredStrNbr) {
            this.setState({
                errorStoreInput: '',
                searchFormError: false
            });
        }
        if(e.keyCode === 13 || e.keyCode === 9){

            //Send event to GA
            this.searchClicked();
        }
    }

    renderLoading = () =>{
        // Loading Image while calling Fetch Service
        if (this.state.isLoading) return <Loading />;
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="friendsPage">
                        <h1>FriendInfo</h1>
                    </div>
                )}
            </Context.Consumer>
        );
    }

}
FriendInfo.contextType = Context;
export default FriendInfo;