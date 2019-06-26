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
                <p>
                    <h1 align="center" className= "aboutAsTitle">קצת עלינו</h1>
                </p>
                <div align="right" className="MessageArea">
                    <Message/>
                </div>
            </div>
        )
    }
}

export default HomePage