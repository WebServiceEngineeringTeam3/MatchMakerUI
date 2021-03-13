import React, { Component } from "react";
import "./SearchFriendsPage.css";
import Header from "./../header/Header";
import BackNavigator from "../back-navigator/BackNavigator";
import { search } from "../../api/endpoints";
import {
    OVERWATCH_VALUE,
    WARZONE_VALUE,
    WOW_VALUE,
    MK8_VALUE,
    FORTNITE_VALUE,
} from "../../models/Constants";
import ResponseHelper from "../Util/ResponseHelper.js";
import Context from "../../components/contexts/Context";
import ErrorBanner from "../error-banner/ErrorBanner";

class SearchFriendsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamerId: this.props.gamerId,
            resultArray: [],
            isLoading: false,
            showSearchModal: false,
            serviceDown: false,
            playerNotFound: false,
            playerFound: false,
            errorFlag: false,
            buttonCSS: "button_disable",
            fromPage: "",
        };
    }

    componentDidMount() {
        this.setState({
            fromPage: this.props.location.pathname,
        });
    }

    validatePreferredGame = () =>{
        let personalityType = document.getElementById("personalityType").value;
        if(personalityType !== "Select Game"){
            return true;
        }else{return false;}
    }

    validateFormInput = () => {
        let isValid = false;
        this.setState({ buttonCSS: "button_disable" });
        if (
            this.validatePreferredGame()
        ) {
            isValid = true;
            this.setState({ buttonCSS: "button_enable" });
        }
        console.log("validateFormInput: " + isValid);
        return isValid;
    };

    searchForFriends = () => {
        let personalityType = document.getElementById("personalityType").value;
        let skillLevel = document.getElementById("skillLevel").value;
        let game = document.getElementById("game").value;

        search(skillLevel, personalityType, game)
            .then((data) => {
                let resultArray = data;

                    console.log("resultArray: " + JSON.stringify(resultArray));
                    console.log("searchForFriends Success");
                    this.context.setFriendsList(resultArray);
                    this.context.setServiceDown(false);
                    this.context.setPlayerNotFound(false);
                    this.context.setPlayerFound(false);

                    this.setState({
                        isLoading: false,
                        resultArray: resultArray,
                        serviceDown: false,
                        playerNotFound: false,
                        playerFound: false,
                    });

                    this.props.history.push({
                        pathname: "/friendsPage",
                        state: {
                            searchInput: this.props.gamerId,
                            gamerId: this.props.gamerId,
                            friendsList: resultArray,
                            isLoading: false,
                            serviceDown: false,
                            playerNotFound: false,
                            playerFound: false
                        }
                    });
            })
            .catch((error) => {
                console.log("ERROR SEARCHING FOR FRIENDS: " + error.message);
                try {
                    let response = JSON.parse(error.message);
                    let errorResponse = response.errorResponse;
                    let helper = new ResponseHelper();
                    this.handleError(errorResponse, helper);
                    this.setState({
                        serviceDown: true,
                        isLoading: false,
                    });
                } catch (err) {
                    this.setState({
                        serviceDown: true,
                        isLoading: false,
                    });
                }
            });
    }

    /**
     * This function is used to Show Error Box While Fetch Call Get the Error Message.
     */
    renderErrorMessage() {
        if (this.state.serviceDown) {
            return (
                <ErrorBanner
                    gamerId={this.state.gamerId}
                    message="SERVICE_DOWN"
                ></ErrorBanner>
            );
        } else if (this.state.playerNotFound) {
            return (
                <ErrorBanner
                    gamerId={this.state.gamerId}
                    message="PLAYER_NOT_FOUND"
                ></ErrorBanner>
            );
        } else if (this.state.playerFound) {
            return (
                <ErrorBanner
                    gamerId={this.state.gamerId}
                    message="PLAYER_FOUND"
                ></ErrorBanner>
            );
        }
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div className="form-page">
                        <Header>
                            <BackNavigator {...this.props} />
                            <div className="headerTxt">Friend Search</div>
                            <div>&nbsp;</div>
                        </Header>
                        {this.renderErrorMessage()}
                        <div className="form_label">Skill Level</div>
                        <div className="form-textbox">
                            <select id="skillLevel" data-testid="skillLevel">
                                <option value="casual" id="casual">
                                    Casual
                                </option>
                                <option value="basic" id="basic">
                                    Basic
                                </option>
                                <option value="mid-core" id="mid-core">
                                    Mid-Core
                                </option>
                                <option value="competition level" id="competition level">
                                    Competition Level
                                </option>
                            </select>
                        </div>
                        <div className="form_label">Personality Type</div>
                        <div className="form-textbox">
                            <select id="personalityType" data-testid="personalityType">
                                <option value="casual" id="casual">
                                    Casual
                                </option>
                                <option value="explorer" id="explorer">
                                    Explorer
                                </option>
                                <option value="thinker" id="thinker">
                                    Thinker
                                </option>
                                <option value="aggressive" id="aggressive">
                                    Aggressive
                                </option>
                            </select>
                        </div>
                        <div className="form_label">Game</div>
                        <div className="form-textbox">
                            <select
                                id="game"
                                data-testid="game"
                                onChange={this.validateFormInput}
                            >
                                <option value="Select Game" id="Select Game">
                                    Select Game
                                </option>
                                <option value={OVERWATCH_VALUE} id={OVERWATCH_VALUE}>
                                    {OVERWATCH_VALUE}
                                </option>
                                <option value={WOW_VALUE} id={WOW_VALUE}>
                                    {WOW_VALUE}
                                </option>
                                <option value={FORTNITE_VALUE} id={FORTNITE_VALUE}>
                                    {FORTNITE_VALUE}
                                </option>
                                <option value={WARZONE_VALUE} id={WARZONE_VALUE}>
                                    {WARZONE_VALUE}
                                </option>
                                <option value={MK8_VALUE} id={MK8_VALUE}>
                                    {MK8_VALUE}
                                </option>
                            </select>
                        </div>
                        <div>
                            <button
                                id="submit-button"
                                className={this.state.buttonCSS + " submit-button disabled"}
                                onClick={this.searchForFriends}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}
SearchFriendsPage.contextType = Context;
export default SearchFriendsPage;
