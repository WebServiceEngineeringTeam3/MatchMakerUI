import React, {Component} from 'react';
import './FriendInfo.css';
import ResponseHelper from '../Util/ResponseHelper.js';
import {RESOURCE_NOT_AVAILABLE_CODE} from "../../models/Constants";
import {fetchPlayerInfo} from "../../api/endpoints";
import Context from "../contexts/Context";
import Loading from "../Loading";
import PlayerDetails from "../player-details/PlayerDetails";

class FriendInfo extends Component {

    constructor(props){
        super(props);

        this.state = {
            friendId: this.props.friendId,
            playerNotFound: false,
            serviceDown: false,
            playerInfo: {},
            isLoading: true
        };
    }

    componentDidMount() {
        this.retrievePlayerInfo(this.context.friendId);
    }

    retrievePlayerInfo = (input) => {
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
    }

    renderErrorMessage = () =>{
        if(this.state.playerNotFound === true || this.state.serviceDown === true){
            return <div className="label-input-box-error">Error Occurred While Searching for Friend Info</div>;
        }
    }

    renderLoading = () =>{
        // Loading Image while calling Fetch Service
        if (this.state.isLoading) return <Loading />;
    }

    navigateToPlayerInfoPage = () =>{
        this.props.history.push({pathname: './playerInfo'});
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="friendsPage">
                        {this.renderLoading()}
                        <h1>FriendInfo</h1>
                        <PlayerDetails playerInfo={this.state.playerInfo}
                                       index={0}
                                       checkbox={false}
                                       serviceDown={this.state.serviceDown}
                                       playerNotFound={this.state.playerNotFound}
                        >
                        </PlayerDetails>
                        {this.renderErrorMessage()}
                        <div data-testid="okButton"><button id="ok_button" className="ok_button"
                                                                onClick={this.navigateToPlayerInfoPage}>OK</button></div>
                    </div>
                )}
            </Context.Consumer>
        );
    }

}
FriendInfo.contextType = Context;
export default FriendInfo;