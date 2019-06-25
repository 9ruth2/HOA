import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './ContactTable.css';
//import NavBar from '../navBar/NavBar';

class ContactTable extends Component{

    state = {
        tableData: []
    }

    
    ContactTableStyle = () => {
        return{
            border: '1em',
            float: 'right'
        }
    }

    render(){
        return(
            <table className="ContactTable" style = {this.ContactTableStyle()}>    
            <thead>
            <tr>
                <th>מספר פלאפון</th>
                <th>שם מלא</th>
                <th>מספר דירה</th>
            </tr>
            </thead>
            <tbody>
            {this.getTableRows()}
            </tbody>
        </table>
            );
        }

    componentDidMount(){this.getContactTable();}

    getContactTable(doc)
    {

        firebase.firestore().collection("Apt").get().then( querySnapshot => {
        this.setState({ tableData: querySnapshot.docs.map(i => {
            return {
                aptId: i.id,
                ...i.data()
            }
        }) });
    });
    }

    getTableRows() 
    {
        return this.state.tableData.map(dataRow => {
            return (
                <tr>
                    <td>{this.getContactTable(dataRow.id)}</td>
                    <td>{dataRow.phoneNum}</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}

export default ContactTable;