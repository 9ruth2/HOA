import React, {Component} from 'react';
import TenentInfo from '../Tenants/TenentInfo';
import ContactTable from './ContactTable';
import Tenant from '../Tenant'
//import App from "./App";

class UserPage extends Component{
    render(){
        return(
            <div className="UserPage">
                {this.getTenents()}
                <ContactTable/>
            </div>
            );
        }

        getTenents() {
            // const tenents = [{}, {}, {}, {}]
            // return tenents.map(tenent => <Tenant/>)
            return(
                <div>
                    <Tenant></Tenant>
                    <Tenant></Tenant>
                    <Tenant></Tenant>
                </div>
            )
        }
}

export default UserPage;