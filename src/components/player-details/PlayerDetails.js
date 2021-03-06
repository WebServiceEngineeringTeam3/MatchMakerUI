import React, { Component } from 'react';
import './PlayerDetails.css'
import Context from '../contexts/Context';
class PlayerDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            playerInfo: this.props.playerInfo,
            checkbox: this.props.checkbox,
            index: this.props.index
        }
    }

    render() {

        let playInfo = this.props.playerInfo;

        if(this.props.checkbox){
            return (
                <div className="player-details-div">
                    <input type="checkbox" id={"checkbox " + this.props.index} data-testid="checkbox"/><span>Name: </span><div className="player-details" data-testid="playerName">{playInfo.firstName} {playInfo.lastName}</div>
                    <span>Age: </span><div className="player-details" data-testid="age">{playInfo.age} </div>
                    <span>Skill Level: </span><div className="player-details" data-testid="skillLevel">{playInfo.skillLevel} </div>
                    <span>Region: </span><div className="player-details" data-testid="region">{playInfo.region} </div>
                    <span>Language: </span><div className="player-details" data-testid="language">{playInfo.language} </div>
                    <span>Personality Type: </span><div className="player-details" data-testid="personalityType">{playInfo.personalityType} </div>
                    <span>Minimum Wait Time: </span><div className="player-details" data-testid="minimumWaitTime">{playInfo.minimumWaitTime} </div>
                    <span>Game: </span><div className="player-details" data-testid="game">{playInfo.game} </div>
                    <span>Game Mode: </span><div className="player-details" data-testid="gameMode">{playInfo.gameMode} </div>
                </div>
            );
        }
        else{
            return (
                <div className="player-details-div">
                    <span>Name: </span><div className="player-details" data-testid="playerName">{playInfo.firstName} {playInfo.lastName}</div>
                    <span>Age: </span><div className="player-details" data-testid="age">{playInfo.age} </div>
                    <span>Skill Level: </span><div className="player-details" data-testid="skillLevel">{playInfo.skillLevel} </div>
                    <span>Region: </span><div className="player-details" data-testid="region">{playInfo.region} </div>
                    <span>Language: </span><div className="player-details" data-testid="language">{playInfo.language} </div>
                    <span>Personality Type: </span><div className="player-details" data-testid="personalityType">{playInfo.personalityType} </div>
                    <span>Minimum Wait Time: </span><div className="player-details" data-testid="minimumWaitTime">{playInfo.minimumWaitTime} </div>
                    <span>Game: </span><div className="player-details" data-testid="game">{playInfo.game} </div>
                    <span>Game Mode: </span><div className="player-details" data-testid="gameMode">{playInfo.gameMode} </div>
                </div>
            );
        }


    }

   
}
PlayerDetails.contextType = Context;
export default PlayerDetails;