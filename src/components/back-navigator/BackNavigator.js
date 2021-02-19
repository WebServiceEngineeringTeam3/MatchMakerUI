import React, {Component} from 'react';
import backBtn from '../../images/backBtn.png'
import './BackNavigation.css';

class BackNavigator extends Component{

    constructor(props){
        super(props);
        this.onBackClick = this.onBackClick.bind(this);
    }

    onBackClick() {
        console.log("back clicked!");
        this.props.history.replace({pathname: './'});
    };

    render(){
        return(
          <div>
              <div className="backTemp" data-testid="backNavLink" onClick={this.onBackClick}>
                  <img className='backBtn' src={backBtn} alt="back-button"/>
                  <div className="backBtnTxt" data-testid="backNavTitle">Homepage</div>
              </div>
          </div>
        );
    }
}

export default BackNavigator;