import React, { Component } from 'react'
import './HomePage.css' 
import LogOut from '../SignIn/LogOut';

class HomePage extends Component {

    render() {
        return(
        <React.Fragment>
            <ul>
            <li><a class="active" href="message">לוח הודעות</a></li>
            <li><a href="calendar">לוח אירועים</a></li>
            <li><a href="tenant">פרטים אישיים</a></li>
            <li><a href="payment/payment-main-page">תשלומים ודוחות</a></li>
            <li><a href="user-page">ניהול משתמשים</a></li>
            <li><a href="create-building">ניהול בניינים</a></li>
            <li style={{float:'right'}}><a ><LogOut/></a></li>
            </ul>
            
            <img src="http://www.up2me.co.il/images/48991255.png" ></img>
        </React.Fragment>
        )
    }


}

export default HomePage