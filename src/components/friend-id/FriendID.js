import React, { Component } from 'react';
import Context from '../../components/contexts/Context';
import './FriendID.css';

class FriendID extends Component {

    constructor(props) {
        super(props)
        this.state = {
            friendId: this.props.friendId,
            setPlayerModal: this.props.setPlayerModal,
            clicked: false
        }
    }

    setClicked = () =>{
        this.setState({
            clicked: true
        });
        this.props.setPlayerModal(this.props.friendId);
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="friendIdModal">
                        <div>

                            <div>
                                <div className="clearDiv"></div>
                                <div><button id="friend-button" className="button_enable" onClick={this.setClicked}>{this.props.friendId}</button></div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

FriendID.contextType = Context;
export default FriendID;