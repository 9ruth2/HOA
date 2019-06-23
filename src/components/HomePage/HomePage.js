import React, { Component } from 'react'
import LogOut from '../SignIn/LogOut';
import NavBar from '../navBar/NavBar';
import firebase from 'firebase/app'

class HomePage extends Component {

    render() {
        return(
        <React.Fragment>
           <NavBar/>
            <img src="http://www.up2me.co.il/images/48991255.png" ></img>
        </React.Fragment>
        )
    }
}

export default HomePage