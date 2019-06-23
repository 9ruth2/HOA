import React, { Component } from 'react'
import LogOut from '../SignIn/LogOut';
import NavBar from '../navBar/NavBar';

class HomePage extends Component {

    render() {
        return(
        <div className = "HomePage">
           <NavBar/>
            <img src="http://www.up2me.co.il/images/48991255.png" ></img>
            <p>
                קצת עלינו
            </p>

        </div>
        )
    }


}

export default HomePage