import React, { Component } from 'react';
import './FormPage.css';
import Header from './../header/Header';
import BackNavigator from "../back-navigator/BackNavigator";
import { postPlayer } from '../../api/endpoints';
import {
    CREATE_PROFILE_TEXT, OVERWATCH_VALUE, WARZONE_VALUE, WOW_VALUE, MK8_VALUE, FORTNITE_VALUE, RESOURCE_NOT_AVAILABLE_CODE
} from '../../models/Constants';
import ResponseHelper from '../Util/ResponseHelper.js';
import Context from '../../components/contexts/Context';
import { validateForAlphaInput, validateForNumericInput, validateForAlphaNumericAndSpaceInput } from '../Util/util';

class FormPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            gamerId: this.props.gamerId,
            playerInfo: this.props.playerInfo,
            isLoading: false,
            showSearchModal: false,
            serviceDown: false,
            customerNotFound: false,
            errorFlag: false,
            buttonCSS: 'button_disable',
            fromPage: ''
        }
    }

    componentDidMount(){
       this.setState({
            fromPage:this.props.location.pathname
        });
    }

    validateFirstName = () =>{
        let isValid = validateForAlphaInput(document.getElementById("firstName").value);
        console.log("firstName " + isValid);
        return isValid;
    }

    validateLastName = () =>{
        let isValid = validateForAlphaInput(document.getElementById("lastName").value);
        console.log("lastName " + isValid);
        return isValid;
    }

    validateGamerId = () =>{
        let isValid = validateForAlphaNumericAndSpaceInput(document.getElementById("gamerId").value);
        console.log("gamerId " + isValid);
        return isValid;
    }

    validateAge = () =>{
        let isValid = validateForNumericInput(document.getElementById("age").value);
        console.log("age: " + isValid);
        return isValid;
    }

    validateWaitTime = () =>{
        let isValid = validateForNumericInput(document.getElementById("minimumWaitTime").value);
        console.log("minimumWaitTime: " + isValid);
        return isValid;
    }

    validateFormInput = () =>{
        let isValid = false;
        this.setState({buttonCSS: 'button_disable'});
        if(this.validateFirstName() 
            && this.validateLastName()
            && this.validateGamerId()
            && this.validateAge()
            && this.validateWaitTime()
            ){
                isValid = true;
                this.setState({buttonCSS: 'button_enable'});
            }
        console.log("validateFormInput: " + isValid);
        return isValid;
    }

    getFormParams = () =>{
        if(this.context.playerInfo !== null){ 
            document.getElementById('firstName').value = this.context.playerInfo.firstName;
            document.getElementById('lastName').value = this.context.playerInfo.lastName;
            document.getElementById('gamerId').value = this.context.playerInfo.gamerId;
            document.getElementById('age').value = this.context.playerInfo.age;
            document.getElementById('minimumWaitTime').value = this.context.playerInfo.minimumWaitTime;
            let skillLevel = this.context.playerInfo.skillLevel;
            document.getElementById('skillLevel').options.namedItem(skillLevel).selected=true;
            let region = this.context.playerInfo.region;
            document.getElementById('region').options.namedItem(region).selected=true;
            let language = this.context.playerInfo.language;
            document.getElementById('language').options.namedItem(language).selected=true;
            let personalityType = this.context.playerInfo.personalityType;
            document.getElementById('personalityType').options.namedItem(personalityType).selected=true;
            let game = this.context.playerInfo.game;
            document.getElementById('game').options.namedItem(game).selected=true;
            }
    }

    updateGameModes = () =>{
        let fortniteModes = ["Party Royale", "Save the World", "Creative"];
        let overwatchModes = ["Quick Play", "Arcade", "Competitive", "Control"];
        let warzoneModes = ["Plunder", "Battle Royale"];
        let warcraftModes = ["Dungeons", "Player vs Player"];
        let marioKartModes = ["Online", "Mario Kart TV"];
        if (document.getElementById("game").value === OVERWATCH_VALUE) {
            document.getElementById('gameMode').innerHTML = "";
            for (var i = 0; i < overwatchModes.length; i++) {
                var newSelect = document.createElement('option');
                newSelect.text = overwatchModes[i];
                document.getElementById('gameMode').add(newSelect);
            }
        }
        else if (document.getElementById("game").value === FORTNITE_VALUE) {
            document.getElementById('gameMode').innerHTML = "";
            for (var i = 0; i < fortniteModes.length; i++) {
                var newSelect = document.createElement('option');
                newSelect.text = fortniteModes[i];
                document.getElementById('gameMode').add(newSelect);
            }
        }
        else if (document.getElementById("game").value === WOW_VALUE) {
            document.getElementById('gameMode').innerHTML = "";
            for (var i = 0; i < warcraftModes.length; i++) {
                var newSelect = document.createElement('option');
                newSelect.text = warcraftModes[i];
                document.getElementById('gameMode').add(newSelect);
            }
        }
        else if (document.getElementById("game").value === WARZONE_VALUE) {
            document.getElementById('gameMode').innerHTML = "";
            for (var i = 0; i < warzoneModes.length; i++) {
                var newSelect = document.createElement('option');
                newSelect.text = warzoneModes[i];
                document.getElementById('gameMode').add(newSelect);
            }
        }
        else if (document.getElementById("game").value === MK8_VALUE) {
            document.getElementById('gameMode').innerHTML = "";
            for (var i = 0; i < marioKartModes.length; i++) {
                var newSelect = document.createElement('option');
                newSelect.text = marioKartModes[i];
                document.getElementById('gameMode').add(newSelect);
            }
        }
    }

    processCustomer = () => {

        if(this.validateFormInput()){
                    console.log("processCustomer: " + document.getElementById("firstName").value);

                    let playerId = "";
                    let firstName = document.getElementById("firstName").value;
                    let lastName = document.getElementById("lastName").value;
                    let gamerId = document.getElementById("gamerId").value;
                    let skillLevel = document.getElementById("skillLevel").value;
                    let region = document.getElementById("region").value;
                    let age = document.getElementById("age").value;
                    let language = document.getElementById("language").value;
                    let personalityType = document.getElementById("personalityType").value;
                    let minimumWaitTime = document.getElementById("minimumWaitTime").value;
                    let game = document.getElementById("game").value;
                    let gameMode = document.getElementById("gameMode").value;
                    if(this.context.playerInfo !== null){
                        playerId = this.context.playerInfo.playerId;
                    }
                        console.log("FormPage playerId: " + playerId);
                        postPlayer("CREATE", gamerId, firstName, lastName, age, skillLevel, region, language, personalityType, minimumWaitTime, game, gameMode).then(data =>{
                            let playerObject = data.playerInfo;
                            let errorObject = data.errorResponse;

                            console.log("playerInfo: " + JSON.stringify(data.playerInfo));
                            console.log("errorResponse: " + JSON.stringify(data.errorResponse));

                            if(errorObject){
                                if(errorObject.code === RESOURCE_NOT_AVAILABLE_CODE){
                                    this.setState({
                                        customerNotFound: true,
                                        serviceDown: false,
                                        isLoading: false
                                    });
                                }
                                else{
                                     // To Store local Error Message in Context
                                    this.setState({
                                        customerNotFound: false,
                                        serviceDown: true,
                                        isLoading: false
                                    });
                                }
                            }
                            else{
                                console.log("FormPage Success");
                                this.context.setSearchedInput(data.playerId);
                                this.context.setPlayerInfo(playerObject);
                                this.context.setServiceDown(false);
                                this.context.setPlayerNotFound(false);

                                this.setState(
                                    {
                                        isLoading: false,
                                        gamerId: data.gamerId,
                                        playerInfo: playerObject,
                                        serviceDown: false,
                                        playerNotFound: false
                                    });

                                this.props.history.push({pathname: '/playerInfo', state:{
                                    searchInput: data.gamerId,
                                    gamerId: data.gamerId,
                                    playerInfo: playerObject,
                                    isLoading: false,
                                    serviceDown: false,
                                    playerNotFound: false
                                }})
                            }
                        }).catch(error => {
                        console.log("ERROR PROCESSING PLAYER: " + error.message);
                        try {
                            let response = JSON.parse(error.message);
                            let errorResponse = response.errorResponse;
                            let helper = new ResponseHelper();
                            this.handleError(errorResponse, helper);
                             this.setState({
                                serviceDown: true,
                                isLoading: false
                            });
                        }
                        catch (err) {
                            this.setState({
                                serviceDown: true,
                                isLoading: false
                            });
                        }
                        });
        }

    }

    render(){
        return(
         <Context.Consumer>
         {(context) => (
             
            <div className="form-page" onLoad={this.getFormParams}>
                    <Header>
                        <BackNavigator {...this.props} />
                        <div className="headerTxt">{CREATE_PROFILE_TEXT}</div>
                        <div>&nbsp;</div>
                    </Header>
                <div className="form_label">First Name</div>
                <div className="form-textbox"><input type="text" id="firstName" data-testid="firstName" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Last Name</div>
                <div className="form-textbox"><input type="text" id="lastName"  data-testid="lastName" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Gamer ID</div>
                <div className="form-textbox"><input type="text" id="gamerId" data-testid="gamerId" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Age</div>
                <div className="form-textbox"><input type="text" id="age" data-testid="age" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Minimum Wait Time</div>
                <div className="form-textbox"><input type="text" id="minimumWaitTime" data-testid="minimumWaitTime" onKeyUp={this.validateFormInput}></input></div>
                <div className="form_label">Skill Level</div>
                <div className="form-textbox">
                    <select id="skillLevel" data-testid="skillLevel">
                        <option value="casual" id="casual">Casual</option>
                        <option value="basic" id="basic">Basic</option>
                        <option value="mid-core" id="mid-core">Mid-Core</option>
                        <option value="competition level" id="competition level">Competition Level</option>
                    </select>
                </div>
                <div className="form_label">Region</div>
                <div className="form-textbox">
                    <select id="region" data-testid="region">
                        <option value="Northwest US" id="Northwest US">Northwest US</option>
                        <option value="Southwest US" id="Southwest US">Southwest US</option>
                        <option value="Northeast US" id="Northeast US">Northeast US</option>
                        <option value="Southeast US" id="Southeast US">Southeast US</option>
                        <option value="Midwest US" id="Midwest US">Midwest US</option>
                        <option value="Europe" id="Europe">Europe</option>
                        <option value="East Asia" id="East Asia">East Asia</option>
                        <option value="South Asia" id="South Asia">South Asia</option>
                        <option value="Australia" id="Australia">Australia</option>
                        <option value="Africa" id="Africa">Africa</option>
                        <option value="Latin America" id="Latin America">Latin America</option>
                    </select>
                </div>
                <div className="form_label">Language</div>
                <div className="form-textbox">
                    <select id="language" data-testid="language">
                        <option value="English" id="English">English</option>
                        <option value="Spanish" id="Spanish">Spanish</option>
                        <option value="German" id="German">German</option>
                        <option value="French" id="French">French</option>
                        <option value="Japanese" id="Japanese">Japanese</option>
                        <option value="Hindi" id="Hindi">Hindi</option>
                        <option value="Mandarin" id="Mandarin">Mandarin</option>
                        <option value="Italian" id="Italian">Italian</option>
                    </select>
                </div>
                <div className="form_label">Personality Type</div>
                <div className="form-textbox">
                    <select id="personalityType" data-testid="personalityType">
                        <option value="casual" id="casual">Casual</option>
                        <option value="explorer" id="explorer">Explorer</option>
                        <option value="thinker" id="thinker">Thinker</option>
                        <option value="aggressive" id="aggressive">Aggressive</option>
                    </select>
                </div>
                <div className="form_label">Game</div>
                <div className="form-textbox">
                    <select id="game" data-testid="game" onChange={this.updateGameModes}>
                        <option value="Select Game" id="Select Game">Select Game</option>
                        <option value={OVERWATCH_VALUE} id={OVERWATCH_VALUE}>{OVERWATCH_VALUE}</option>
                        <option value={WOW_VALUE} id={WOW_VALUE}>{WOW_VALUE}</option>
                        <option value={FORTNITE_VALUE} id={FORTNITE_VALUE}>{FORTNITE_VALUE}</option>
                        <option value={WARZONE_VALUE} id={WARZONE_VALUE}>{WARZONE_VALUE}</option>
                        <option value={MK8_VALUE} id={MK8_VALUE}>{MK8_VALUE}</option>
                    </select>
                </div>
                <div className="form_label">Game Mode</div>
                <div className="form-textbox">
                    <select id="gameMode" data-testid="gameMode">
                        <option value="Select" id="Select">Select</option>
                    </select>
                </div>
                <div><button id="submit-button" className={this.state.buttonCSS + " submit-button disabled"} onClick={this.processCustomer}>Submit</button></div>
            </div>
            )}
         </Context.Consumer>
        );
    }
}
FormPage.contextType = Context;
export default FormPage;