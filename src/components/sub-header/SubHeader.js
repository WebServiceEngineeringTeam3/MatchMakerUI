/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './SubHeader.css';
import Context from '../../components/contexts/Context';
import editIcon from '../../images/editIcon.PNG';
import {Link} from "react-router-dom";

class SubHeader extends Component {

    render() {
        return (
        <Context.Consumer>
        {(context) => (
            <div className="customer-div-header">
                <div className="customer-div-child">
                    <span className="cust-id-sub-header" data-testid="gamerIdSubHeader">{this.props.gamerId}</span>
                </div>
                <div className="customer-div-child">
                    <Link data-testid="editLink" to={{
                        pathname: '/form', state: {
                            searchInput: this.context.searchedInput,
                            gamerId: this.context.gamerId,
                            playerInfo: this.context.playerInfo
                        }
                    }}>
                        <span className="edit-player-profile" data-testid="editIcon"><img src={editIcon}  alt="Edit Player Profile"/></span>
                    </Link>
                </div>
            </div>
        )}
        </Context.Consumer>
        );
    }
}

  SubHeader.contextType = Context;
  export default SubHeader;