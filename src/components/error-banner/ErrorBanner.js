import React, {Component} from 'react';
import './ErrorBanner.css'
import playerNotFoundIcon from '../../images/playerNotFoundIcon.png'

export default class ErrorBanner extends Component {
    
    
    getErrorMessage =(param) =>{
        
        let PLAYER_NOT_FOUND = "PLAYER WITH GAMER ID # " + this.props.gamerId + " not found. Enter valid Gamer ID.",
            SERVICE_DOWN = "SERVICE IS UNAVAILABLE";

        switch (param) {
            case "PLAYER_NOT_FOUND":
                return PLAYER_NOT_FOUND;
            case "SERVICE_DOWN":
                return SERVICE_DOWN;
            default:
                return 'PLEASE_CONTACT_SUPPORT_TEAM';
        }
    }

    render() {
        
        return (
            <div className="customerNotFoundDiv" style={this.props.style} data-testid="errorBanner">
                <div className="customerNotFoundIconDiv" data-testid="errorIcon">
                    <img className='customerNotFoundIcon' src={playerNotFoundIcon} alt="Player Not Found"/>
                </div>
                <div className="customerNotFoundText" data-testid="errorMessage">{this.getErrorMessage(this.props.message)}</div>
            </div>
        );
    }
}
