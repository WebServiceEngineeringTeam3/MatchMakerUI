/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './SubHeader.css';
import Context from '../../components/contexts/Context';

class SubHeader extends Component {

    render() {
        return (
        <Context.Consumer>
        {(context) => (
            <div className="customer-div-header">
                <div className="customer-div-child">
                    <span className="cust-id-sub-header" data-testid="gamerIdSubHeader">{this.props.gamerId}</span>
                </div>
            </div>
        )}
        </Context.Consumer>
        );
    }
}

  SubHeader.contextType = Context;
  export default SubHeader;