import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from '../home-page/HomePage'
import Context from '../../components/contexts/Context'
import FormPage from '../../components/form-page/FormPage'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchedInput: '',
      playerId: '',
      playerInfo: null,
      showSearchModal: false,
      isLoading: true,
      serviceDown: false,
      playerNotFound: false
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

  setPlayerId = (value) => {
    this.setState({
        playerId: value
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


  render = () => (

      <Context.Provider value={{
        searchedInput: this.state.searchedInput,
        setSearchedInput: this.setSearchedInput,
          playerInfo: this.state.playerInfo,
          setPlayerInfo: this.setPlayerInfo,
          playerId: this.state.playerId,
          setPlayerId: this.setPlayerId,
        serviceDown: this.state.serviceDown,
        setServiceDown: this.setServiceDown,
          playerNotFound: this.state.playerNotFound,
          setPlayerNotFound: this.setPlayerNotFound
      }}>
        <div className='application-container'>
          <Router>
            <Switch>
              <Route exact path='/' render={props => <HomePage {...props}/>} />
              <Route path='/form' render={props => <FormPage {...props}/>} />
            </Switch>
          </Router>
        </div>
      </Context.Provider>
  )


}

export default App;