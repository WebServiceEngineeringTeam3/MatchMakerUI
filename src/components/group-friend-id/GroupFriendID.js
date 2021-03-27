import React, { Component } from 'react';
import Context from '../../components/contexts/Context';
import './GroupFriendID.css';

class GroupFriendID extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groupFriend: this.props.groupFriend,
            setPlayerModal: this.props.setPlayerModal,
            clicked: false
        }
    }

    setClicked = () =>{
        this.setState({
            clicked: true
        });
        this.props.setPlayerModal(this.props.groupFriend.gamer_friend_id);
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div data-testid="groupFriendIdModal">
                        <div>

                            <div>
                                <div className="clearDiv"></div>
                                <div><button id="group-friend-button" className="button_enable" onClick={this.setClicked}>{this.props.groupFriend.gamer_group_id + " " + this.props.groupFriend.gamer_friend_id}</button></div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

GroupFriendID.contextType = Context;
export default GroupFriendID;