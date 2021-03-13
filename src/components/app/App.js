import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from '../home-page/HomePage'
import Context from '../../components/contexts/Context'
import FormPage from '../../components/form-page/FormPage'
import PlayerInfoPage from "../playerinfo-page/PlayerInfoPage";
import FriendsPage from "../friends-page/FriendsPage";
import SearchFriendsPage from "../search-friends-page/SearchFriendsPage";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchedInput: '',
      gamerId: '',
      playerInfo: null,
        friendsList: [],
      showSearchModal: false,
      isLoading: true,
      serviceDown: false,
      playerNotFound: false,
        playerFound: false
    }
  }


  /**
   * This function is used to set a boolean value of true or false to
   * showSearchModal attribute. If true, the app will display the SearchModal.
   * If false, it will hide it.
   * @param boolean value
   */
  setStateForModal = (value) => {
    this.setState({showSearchModal: value})
  }

  setSearchedInput = (value) => {
    this.setState({
      searchedInput: value
    });
  }

  setPlayerInfo = (value) => {
    this.setState({
      playerInfo: value
    });
  }

  setGamerId = (value) => {
    this.setState({
        gamerId: value
    });
  }

  setServiceDown = (value) => {
    this.setState({
      serviceDown: value
    });
  }

  setPlayerNotFound = (value) => {
    this.setState({
        playerNotFound: value
    });
  }

    setPlayerFound = (value) => {
        this.setState({
            playerFound: value
        });
    }

    setFriendsList = (value) => {
        this.setState({
            friendsList: value
        });
    }


  render = () => (

      <Context.Provider value={{
          searchedInput: this.state.searchedInput,
          setSearchedInput: this.setSearchedInput,
          playerInfo: this.state.playerInfo,
          setPlayerInfo: this.setPlayerInfo,
          gamerId: this.state.gamerId,
          setGamerId: this.setGamerId,
          serviceDown: this.state.serviceDown,
          setServiceDown: this.setServiceDown,
          playerNotFound: this.state.playerNotFound,
          setPlayerNotFound: this.setPlayerNotFound,
          playerFound: this.state.playerNotFound,
          setPlayerFound: this.setPlayerNotFound,
          friendsList: this.state.friendsList,
          setFriendsList: this.setFriendsList
      }}>
        <div className='application-container'>
          <Router>
            <Switch>
              <Route exact path='/' render={props => <HomePage {...props}/>} />
              <Route path='/form' render={props => <FormPage {...props}/>} />
              <Route path='/playerInfo' render={props => <PlayerInfoPage {...props}/>} />
              <Route path='/searchFriendsPage' render={props => <SearchFriendsPage {...props}/>} />
              <Route path='/friendsPage' render={props => <FriendsPage {...props}/>} />
            </Switch>
          </Router>
        </div>
      </Context.Provider>
  )


}

export default App;