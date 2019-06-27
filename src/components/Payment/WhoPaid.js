import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';
//import NavBar from '../navBar/NavBar';

class ContactTable extends Component{

    state = {
        tableData: [],
        clicked: false
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
                <th>האם שולם</th>
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


    // ------------------- Functions ------------------------ 
    componentDidMount(){
        this.getContactTable();
    }


    handleChange() {
        this.setState({
          clicked: !this.state.clicked
        })
      }
      

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
                    <td> <input type="checkbox" checked={this.state.clicked} onChange={this.handleChange} />כן</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}

export default ContactTable;