import React, {Component} from 'react';
import TenentInfo from '../TenentInfo';
import ContactTable from '../ContactTable';
import Tenant from '../Tenant'
import HomePage from '../HomePage/HomePage';
import NavBar from '../navBar/NavBar';
//import App from "./App";

class UserPage extends Component{
    render(){
        return(
            <div className="UserPage">
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