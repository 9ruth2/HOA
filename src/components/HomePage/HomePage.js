import React, { Component } from 'react'
import LogOut from '../SignIn/LogOut';
import NavBar from '../navBar/NavBar';
import Message from '../MessageBlog/Message';
import firebase from 'firebase/app';
import '../Style/Style.css';

class HomePage extends Component {

    render() {
        return(      
            
            <div className = "HomePage">
            <NavBar/>
            <div id="home" className = "fadeIn">
                <p className = "title">
                    <h2 className="bigTitle">ברוכים הבאים למערכת לניהול ועד הבית</h2>
                    <img className="imgTitle" src="http://www.up2me.co.il/images/61403197.png"></img>
                </p>
            </div>
            <div id="about" className= "slideLeft">
                <div className = "zoneB">
                <div className="slideLeft">
                    <div align="right" className="MessageArea">
                        <Message/>
                    </div>
                </div>
                <div className = "aboutAs">
                    <h2 className="bigTitle">?מי אנחנו</h2>
                    <p>פרויקט קהילה בונה מבית הקרן לירושלים ומנהל קהילתי יובלים הוא מודל עבודה לשיפור איכות החיים באמצעות קידום שיפוצים פיזיים בדירות, בבניינים ובחצרות, תוך קיום מפגשי תרבות, תוכן, קיימות ומנהיגות לקידום קשרים בקהילה, שכנות טובה ותרבות דיור. 
    אתר זה נועד לסייע לכם בניהול התחזוקה של הבניין וכפלטפורמה לתקשורת בין הדיירים.
                    </p>
                </div>
                </div>
            </div>

            </div>
            
        )
    }
}

export default HomePage