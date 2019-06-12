import React, {Component} from 'react';

class ContactTable extends Component{
    
    ContactTableStyle = () => {
        return{
            border: '1em',
            float: 'right'
        }
    }

    render(){
        return(
            <table className="ContactTable" style = {this.ContactTableStyle()}>
                <tr>
                    <th>מספר דירה</th>
                    <th>שם מלא</th>
                    <th>פלאפון</th>
                </tr>
                <tr>
                    <td>td2</td>
                    <td>td2</td>
                    <td>td2</td>
                </tr>
                <tr>
                    <td>td2</td>
                    <td>td2</td>
                    <td>td2</td>
                </tr>
                <tr>
                    <td>td2</td>
                    <td>td2</td>
                    <td>td2</td>
                </tr>
                <tr>
                    <td>td2</td>
                    <td>td2</td>
                    <td>td2</td>
                </tr>
            </table>
            );
        }
}

export default ContactTable;