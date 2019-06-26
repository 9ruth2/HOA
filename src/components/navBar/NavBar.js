import React, { Component } from 'react'
import './NavBar.css' 
import LogOut from '../SignIn/LogOut'
import { Link } from 'react-router-dom'

class NavBar extends Component {

    render() {
        return(
            <ul className="NavBar_ul">
            <li className="NavBar_li"><Link to = "/HomePage" className="NavBar_li_a">דף הבית</Link></li>
            <li className="NavBar_li"><Link to = "message" className="NavBar_li_a">לוח הודעות</Link></li>
            <li className="NavBar_li"><Link to = "calendar" className="NavBar_li_a" >יומן אירועים</Link></li>
            <li className="NavBar_li"><Link to = "payment/payment-main-page" className="NavBar_li_a">תשלומים ודוחות</Link></li>
            <li className="NavBar_li"><Link to = "/user-page" className="NavBar_li_a">פרטים אישיים</Link></li>
            <li className="NavBar_li"><Link to = "/create-building" className="NavBar_li_a">ניהול בניינים</Link></li>
            <li className="NavBar_li">
            <button className="NavBar_logout" > <LogOut/> </button>
            </li>
            </ul>
        )
    }

}

export default NavBar