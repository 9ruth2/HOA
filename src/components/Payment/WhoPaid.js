import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';
import NavBar from '../navBar/NavBar';

class ContactTable extends Component{

    state = {
        tableData: [],
        clicked: false
    }

    
    ContactTableStyle = () => {
        return{
            border: '1em',
            float: 'center'
        }
    }

    render(){
        return(
            <div>
                <NavBar/>
                <h1 className="bigTitle">פירוט עבור תשלום נבחר</h1>
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
        </div>
            );
        }


    // ------------------- Functions ------------------------ 
    handleChange() {
        this.setState({
          clicked: !this.state.clicked
        })
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
                    <td> <input type="checkbox" checked={this.state.clicked} onChange={this.handleChange} />כן</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}

//     componentDidMount(){this.getContactTable();}
    
//     getContactTable(doc)
//     {

//         firebase.firestore().collection("Apt").get().then( querySnapshot => {
//         this.setState({ tableData: querySnapshot.docs.map(i => {
//             return {
//                 aptId: i.id,
//                 ...i.data()
//             }
//         }) });
//     });
//     }


//     getTableRows() 
//     {
//         return this.state.tableData.map(dataRow => {
//             return (
//                 <tr>
//                     <td> <input type="checkbox" checked={this.state.clicked} onChange={this.handleChange} />כן</td>
//                     <td>{dataRow.fullName}</td>
//                     <td>{dataRow.aptNum}</td>
//                 </tr>
//             )
//         })
//     }
// }

export default ContactTable;