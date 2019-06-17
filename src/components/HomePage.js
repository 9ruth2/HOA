import React, { Component } from 'react'
import './HomePage.css' 

class HomePage extends Component {

    render() {
        return(
        <ul>
        <li><a class="active" href="#home">לוח הודעות</a></li>
        <li><a href="#news">לוח אירועים</a></li>
        <li><a href="#contact">פרטים אישיים</a></li>
        <li><a href="#about">תשלומים ודוחות</a></li>
        <li><a href="#about">ניהול משתמשים</a></li>
        </ul>
        )
    }


}

export default HomePage