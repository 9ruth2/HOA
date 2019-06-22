import React, { Component } from 'react'
import './NavBar.css' 
import LogOut from '../SignIn/LogOut'

class NavBar extends Component {

    render() {
        return(
        <React.Fragment>
            <ul>
            <li><a class="active" href="message">לוח הודעות</a></li>
            <li><a href="calendar">לוח אירועים</a></li>
            <li><a href="/tenant">פרטים אישיים</a></li>
            <li><a href="payment/payment-main-page">תשלומים ודוחות</a></li>
            <li><a href="/user-page">ניהול משתמשים</a></li>
            <li><a href="create-building">ניהול בניינים</a></li>
            <li style={{float:'right'}}><a ><LogOut/></a></li>
            </ul>
        </React.Fragment>
        )
    }


}

export default NavBar