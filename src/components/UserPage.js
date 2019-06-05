import React, {Component} from 'react';
import TenentInfo from './TenentInfo';
import ContactTable from './ContactTable';
//import App from "./App";

class UserPage extends Component{
    render(){
        return(
            <div className="UserPage">
                <TenentInfo/>
                <ContactTable/>
            </div>
            );
        }
}

export default UserPage;