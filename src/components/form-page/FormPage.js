import React, { Component } from "react";
import "./FormPage.css";
import Header from "./../header/Header";
import BackNavigator from "../back-navigator/BackNavigator";
import { postPlayer } from "../../api/endpoints";
import {
  CREATE_PROFILE_TEXT,
  OVERWATCH_VALUE,
  WARZONE_VALUE,
  WOW_VALUE,
  MK8_VALUE,
  FORTNITE_VALUE,
  RESOURCE_NOT_AVAILABLE_CODE,
  SERVICE_ERROR_CODE, EDIT_PROFILE_TEXT
} from "../../models/Constants";
import ResponseHelper from "../Util/ResponseHelper.js";
import Context from "../../components/contexts/Context";
import {
  validateForAlphaInput,
  validateForNumericInput,
  validateForAlphaNumericAndSpaceInput,
} from "../Util/util";
import ErrorBanner from "../error-banner/ErrorBanner";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      gamerId: this.props.gamerId,
      playerInfo: this.props.playerInfo,
      isLoading: false,
      showSearchModal: false,
      serviceDown: false,
      playerNotFound: false,
      playerFound: false,
      errorFlag: false,
      buttonCSS: "button_disable",
    };
  }

  validateFirstName = () => {
    let isValid = validateForAlphaInput(
      document.getElementById("firstName").value
    );
    console.log("firstName " + isValid);
    return isValid;
  };

  validateLastName = () => {
    let isValid = validateForAlphaInput(
      document.getElementById("lastName").value
    );
    console.log("lastName " + isValid);
    return isValid;
  };

  validateGamerId = () => {
    if (this.context.playerInfo !== null) {return true;}
    let isValid = validateForAlphaNumericAndSpaceInput(
      document.getElementById("gamerId").value
    );
    console.log("gamerId " + isValid);
    return isValid;
  };

  validateAge = () => {
    let isValid = validateForNumericInput(document.getElementById("age").value);
    console.log("age: " + isValid);
    return isValid;
  };

  validateWaitTime = () => {
    let isValid = validateForNumericInput(
      document.getElementById("minimumWaitTime").value
    );
    console.log("minimumWaitTime: " + isValid);
    return isValid;
  };

  validateFormInput = () => {
    let isValid = false;
    this.setState({ buttonCSS: "button_disable" });
    if (
      this.validateFirstName() &&
      this.validateLastName() &&
      this.validateGamerId() &&
      this.validateAge() &&
      this.validateWaitTime()
    ) {
      isValid = true;
      this.setState({ buttonCSS: "button_enable" });
    }
    console.log("validateFormInput: " + isValid);
    return isValid;
  };

  getFormParams = () => {
    if (this.context.playerInfo !== null) {
      document.getElementById("firstName").value = this.context.playerInfo.firstName;
      document.getElementById("lastName").value = this.context.playerInfo.lastName;
      document.getElementById("age").value = this.context.playerInfo.age;
      document.getElementById("minimumWaitTime").value = this.context.playerInfo.minimumWaitTime;

      let skillLevel = this.context.playerInfo.skillLevel;
      document.getElementById(skillLevel).selected = true;

      let region = this.context.playerInfo.region;
      document.getElementById(region).selected = true;

      let language = this.context.playerInfo.language;
      document.getElementById(language).selected = true;

      let personalityType = this.context.playerInfo.personalityType;
      document.getElementById(personalityType).selected = true;

      let game = this.context.playerInfo.game;
      document.getElementById(game).selected = true;

    }
  };

  updateGameModes = () => {
    let fortniteModes = ["Party Royale", "Save the World", "Creative"];
    let overwatchModes = ["Quick Play", "Arcade", "Competitive", "Control"];
    let warzoneModes = ["Plunder", "Battle Royale"];
    let warcraftModes = ["Dungeons", "Player vs Player"];
    let marioKartModes = ["Online", "Mario Kart TV"];
    if (document.getElementById("game").value === OVERWATCH_VALUE) {
      document.getElementById("gameMode").innerHTML = "";
      for (let i = 0; i < overwatchModes.length; i++) {
        let newSelect = document.createElement("option");
        newSelect.text = overwatchModes[i];
        document.getElementById("gameMode").add(newSelect);
      }
    } else if (document.getElementById("game").value === FORTNITE_VALUE) {
      document.getElementById("gameMode").innerHTML = "";
      for (let i = 0; i < fortniteModes.length; i++) {
        let newSelect = document.createElement("option");
        newSelect.text = fortniteModes[i];
        document.getElementById("gameMode").add(newSelect);
      }
    } else if (document.getElementById("game").value === WOW_VALUE) {
      document.getElementById("gameMode").innerHTML = "";
      for (let i = 0; i < warcraftModes.length; i++) {
        let newSelect = document.createElement("option");
        newSelect.text = warcraftModes[i];
        document.getElementById("gameMode").add(newSelect);
      }
    } else if (document.getElementById("game").value === WARZONE_VALUE) {
      document.getElementById("gameMode").innerHTML = "";
      for (let i = 0; i < warzoneModes.length; i++) {
        let newSelect = document.createElement("option");
        newSelect.text = warzoneModes[i];
        document.getElementById("gameMode").add(newSelect);
      }
    } else if (document.getElementById("game").value === MK8_VALUE) {
      document.getElementById("gameMode").innerHTML = "";
      for (let i = 0; i < marioKartModes.length; i++) {
        let newSelect = document.createElement("option");
        newSelect.text = marioKartModes[i];
        document.getElementById("gameMode").add(newSelect);
      }
    }
    else{
      document.getElementById("gameMode").innerHTML = "";
    }
  };

  processPlayer = () => {
    if (this.validateFormInput()) {
      console.log(
        "processPlayer: " + document.getElementById("firstName").value
      );

      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let gamerId;
      let skillLevel = document.getElementById("skillLevel").value;
      let region = document.getElementById("region").value;
      let age = document.getElementById("age").value;
      let language = document.getElementById("language").value;
      let personalityType = document.getElementById("personalityType").value;
      let minimumWaitTime = document.getElementById("minimumWaitTime").value;
      let game = document.getElementById("game").value;
      let gameMode = document.getElementById("gameMode").value;
      if (this.context.playerInfo !== null) {
        gamerId = this.context.playerInfo.gamerId;
      }
      else{
        gamerId = document.getElementById("gamerId").value;
      }
      console.log("FormPage gamerId: " + gamerId);
      let crud_operation = "CREATE";
      if (this.context.playerInfo !== null) {crud_operation="UPDATE";}
      postPlayer(
          crud_operation,
        gamerId,
        firstName,
        lastName,
        age,
        skillLevel,
        region,
        language,
        personalityType,
        minimumWaitTime,
        game,
        gameMode
      )
        .then((data) => {
          let playerObject = data.playerInfo;
          let errorObject = data.errorResponse;

          console.log("playerInfo: " + JSON.stringify(data.playerInfo));
          console.log("errorResponse: " + JSON.stringify(data.errorResponse));

          if (errorObject) {
            if (errorObject.code === RESOURCE_NOT_AVAILABLE_CODE) {
              this.setState({
                playerNotFound: true,
                playerFound: false,
                serviceDown: false,
                isLoading: false,
                gamerId: gamerId,
              });
            } else if (errorObject.code === SERVICE_ERROR_CODE) {
              console.log(
                "GAMER ID ALREADY EXISTS. NEED TO SUBMIT NEW GAMER ID"
              );
              this.setState({
                playerNotFound: false,
                playerFound: true,
                serviceDown: false,
                isLoading: false,
                gamerId: gamerId,
              });
            } else {
              // To store local Error Message in Context
              this.setState({
                playerNotFound: false,
                playerFound: false,
                serviceDown: true,
                isLoading: false,
                gamerId: gamerId,
              });
            }
          } else {
            console.log("FormPage Success");
            this.context.setSearchedInput(data.gamerId);
            this.context.setPlayerInfo(playerObject);
            this.context.setServiceDown(false);
            this.context.setPlayerNotFound(false);
            this.context.setPlayerFound(false);

            this.setState({
              isLoading: false,
              gamerId: data.gamerId,
              playerInfo: playerObject,
              serviceDown: false,
              playerNotFound: false,
              playerFound: false,
            });

            this.props.history.push({
              pathname: "/playerInfo",
              state: {
                searchInput: data.gamerId,
                gamerId: data.gamerId,
                playerInfo: playerObject,
                isLoading: false,
                serviceDown: false,
                playerNotFound: false,
                playerFound: false,
              },
            });
          }
        })
        .catch((error) => {
          console.log("ERROR PROCESSING PLAYER: " + error.message);
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
  };

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

  renderHeader = () =>{
    if (this.context.playerInfo !== null) {
      return EDIT_PROFILE_TEXT;
    }
    else{
      return CREATE_PROFILE_TEXT;
    }
  }

  navigateToPreviousPage = () =>{
    if (this.context.playerInfo !== null) {this.props.history.push({pathname: './playerInfo'});}
    else{this.props.history.push({pathname: '/'});}
  }

  renderGamerIdInput = () =>{
    if (this.context.playerInfo !== null) {
      return (<div className="gamer-id-value">{this.context.playerInfo.gamerId}</div>);
    }
    else{
      return (
          <div className="form-textbox">
            <input
                type="text"
                id="gamerId"
                data-testid="gamerId"
                onKeyUp={this.validateFormInput}
            ></input>
          </div>
      );
    }
  }


  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <div className="form-page" onLoad={this.getFormParams}>
            <Header>
              <BackNavigator {...this.props} />
              <div className="headerTxt">{this.renderHeader()}</div>
              <div>&nbsp;</div>
            </Header>
            {this.renderErrorMessage()}
            <div className="form_label">First Name</div>
            <div className="form-textbox">
              <input
                type="text"
                id="firstName"
                data-testid="firstName"
                onKeyUp={this.validateFormInput}
              ></input>
            </div>
            <div className="form_label">Last Name</div>
            <div className="form-textbox">
              <input
                type="text"
                id="lastName"
                data-testid="lastName"
                onKeyUp={this.validateFormInput}
              ></input>
            </div>
            <div className="form_label">Gamer ID</div>
            {this.renderGamerIdInput()}
            <div className="form_label">Age</div>
            <div className="form-textbox">
              <input
                type="text"
                id="age"
                data-testid="age"
                onKeyUp={this.validateFormInput}
              ></input>
            </div>
            <div className="form_label">Minimum Wait Time</div>
            <div className="form-textbox">
              <input
                type="text"
                id="minimumWaitTime"
                data-testid="minimumWaitTime"
                onKeyUp={this.validateFormInput}
              ></input>
            </div>
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
                <option value="Advanced" id="Advanced">
                  Advanced
                </option>
                <option value="competition level" id="competition level">
                  Competition Level
                </option>
              </select>
            </div>
            <div className="form_label">Region</div>
            <div className="form-textbox">
              <select id="region" data-testid="region">
                <option value="Northwest US" id="Northwest US">
                  Northwest US
                </option>
                <option value="Southwest US" id="Southwest US">
                  Southwest US
                </option>
                <option value="Northeast US" id="Northeast US">
                  Northeast US
                </option>
                <option value="Southeast US" id="Southeast US">
                  Southeast US
                </option>
                <option value="Midwest US" id="Midwest US">
                  Midwest US
                </option>
                <option value="Europe" id="Europe">
                  Europe
                </option>
                <option value="East Asia" id="East Asia">
                  East Asia
                </option>
                <option value="South Asia" id="South Asia">
                  South Asia
                </option>
                <option value="Australia" id="Australia">
                  Australia
                </option>
                <option value="Africa" id="Africa">
                  Africa
                </option>
                <option value="Latin America" id="Latin America">
                  Latin America
                </option>
              </select>
            </div>
            <div className="form_label">Language</div>
            <div className="form-textbox">
              <select id="language" data-testid="language">
                <option value="English" id="English">
                  English
                </option>
                <option value="Spanish" id="Spanish">
                  Spanish
                </option>
                <option value="German" id="German">
                  German
                </option>
                <option value="French" id="French">
                  French
                </option>
                <option value="Japanese" id="Japanese">
                  Japanese
                </option>
                <option value="Hindi" id="Hindi">
                  Hindi
                </option>
                <option value="Mandarin" id="Mandarin">
                  Mandarin
                </option>
                <option value="Italian" id="Italian">
                  Italian
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
                onChange={this.updateGameModes}
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
            <div className="form_label">Game Mode</div>
            <div className="form-textbox">
              <select id="gameMode" data-testid="gameMode">
                <option value="Select" id="Select">
                  Select
                </option>
              </select>
            </div>
            <div>
              <button
                id="submit-button"
                className={this.state.buttonCSS + " submit-button disabled"}
                onClick={this.processPlayer}
              >
                Submit
              </button>
            </div>
            <div data-testid="cancel-button"><button id="cancel-button" className="cancel-button"
                                                     onClick={this.navigateToPreviousPage}>Cancel</button></div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}
FormPage.contextType = Context;
export default FormPage;
