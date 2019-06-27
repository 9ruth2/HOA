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

    async getContactTable()
    {
        const result = await firebase.firestore().collection('Apt').doc(firebase.auth().currentUser.uid).get()
        const building = await firebase.firestore().collection("Building").doc(result.data().buildingId).get()
        const promises = building.data().aptList.map(apt => firebase.firestore().collection('Apt').doc(apt).get())

        const aptResults = await Promise.all(promises)

        this.setState({ tableData: aptResults.map(i => {
            return {
                aptId: i.id,
                ...i.data()
            }
        }) })
    }

    getTableRows() 
    {
        return this.state.tableData.map(dataRow => {
            return (
                <tr>
                    <td>{dataRow.phoneNum}</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}

export default ContactTable;