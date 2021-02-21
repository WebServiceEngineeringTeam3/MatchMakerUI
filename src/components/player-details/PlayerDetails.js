import React, { Component } from 'react';
import './PlayerDetails.css'
import Context from '../contexts/Context';
class PlayerDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            playerInfo: this.props.playerInfo
        }
    }

    render() {

        let playInfo = this.props.playerInfo;

        let opacityEnabled = (this.props.serviceDown || this.props.playerNotFound);

        return (
            <div className={"customer-details-div " + (opacityEnabled ? 'opacity' : '')} >

                <div>
                    <span className="sku-number">Name: </span><div className="sku-details-desc" data-testid="playerName">{playInfo.firstName} {playInfo.lastName}</div>
                    <span className="sku-number">Age: </span><div className="sku-details-desc" data-testid="age">{playInfo.age} <br/> </div>
                    <span className="sku-number">Skill Level: </span><div className="sku-details-desc" data-testid="skillLevel">{playInfo.skillLevel} <br/> </div>
                    <span className="sku-number">Region: </span><div className="sku-details-desc" data-testid="region">{playInfo.region} <br/> </div>
                    <span className="sku-number">Language: </span><div className="sku-details-desc" data-testid="language">{playInfo.language} <br/> </div>
                    <span className="sku-number">Personality Type: </span><div className="sku-details-desc" data-testid="personalityType">{playInfo.personalityType} <br/> </div>
                    <span className="sku-number">Minimum Wait Time: </span><div className="sku-details-desc" data-testid="minimumWaitTime">{playInfo.minimumWaitTime} <br/> </div>
                    <span className="sku-number">Game: </span><div className="sku-details-desc" data-testid="game">{playInfo.game} <br/> </div>
                    <span className="sku-number">Game Mode: </span><div className="sku-details-desc" data-testid="gameMode">{playInfo.gameMode} <br/> </div>

                </div>

            </div>
        );


    }

   
}
PlayerDetails.contextType = Context;
export default PlayerDetails;