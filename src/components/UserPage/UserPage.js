import React, {Component} from 'react';
import ContactTable from '../ContactTable';
import PaidTable from '../Payment/PaidTable';
import Tenant from '../Tenant'
import NavBar from '../navBar/NavBar';
import 'firebase/firestore'
import 'firebase/auth'


class UserPage extends Component
{
    render()
    {
        return(
            <div className="UserPage">
                <NavBar/>
                <div>
                    <Tenant/>
                    {this.getTenents}
                <ContactTable/>
                </div>
                <PaidTable/>
            </div>
            );
        }

        getTenents() {
            return(
                <div>
                    <Tenant/>
                </div>
            )
        }
}

export default UserPage;