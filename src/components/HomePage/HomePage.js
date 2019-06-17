import React, { Component } from 'react'
import './HomePage.css' 

class HomePage extends Component {

    render() {
        return(
        <React.Fragment>
            <ul>
            <li><a class="active" href="#home">לוח הודעות</a></li>
            <li><a href="#news">לוח אירועים</a></li>
            <li><a href="#contact">פרטים אישיים</a></li>
            <li><a href="#about">תשלומים ודוחות</a></li>
            <li><a href="#about">ניהול משתמשים</a></li>
            </ul>
            
            <img src="http://www.up2me.co.il/images/48991255.png" ></img>
        </React.Fragment>
        )
    }


}

export default HomePage