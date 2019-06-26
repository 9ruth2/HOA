import React, {Component} from 'react';
import TenentInfo from '../TenentInfo';
import ContactTable from '../ContactTable';
import PaidTable from '../Payment/PaidTable';
import WhoPaidTable from '../Payment/WhoPaid';
import Tenant from '../Tenant'
import HomePage from '../HomePage/HomePage';
import NavBar from '../navBar/NavBar';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
//import App from "./App";

class UserPage extends Component{
    render(){
        return(
            <div className="UserPage">
                <NavBar/>
                <div>
                {this.getTenents()}
                <ContactTable/>
                </div>
                <div>
                    <button>הוסף דייר</button>
                </div>
                
            </div>
            );
        }

        getTenents() {
            // const tenents = [{}, {}, {}, {}]
            // return tenents.map(tenent => <Tenant/>)
            return(
                <div>
                    <Tenant/>
                </div>
            )
        }
}

export default UserPage;