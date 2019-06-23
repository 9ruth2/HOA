import React, { Component } from 'react'
import './NavBar.css' 
import LogOut from '../SignIn/LogOut'

class NavBar extends Component {

    render() {
        return(
            <ul className="NavBar_ul">
            <li className="NavBar_li"><a className="NavBar_li_a" href="message">דף הבית</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="message">לוח הודעות</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="calendar">לוח אירועים</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="/tenant">פרטים אישיים</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="payment/payment-main-page">תשלומים ודוחות</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="/user-page">ניהול משתמשים</a></li>
            <li className="NavBar_li"><a className="NavBar_li_a" href="/create-building">ניהול בניינים</a></li>

            <button className="NavBar_logout" >
                    <LogOut/>
            </button>
            </ul>
        )
    }

}

export default NavBar