import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';
import NavBar from '../navBar/NavBar';

const id ="JYsOsQmxzH9Pm4FEI0PJ"
class WhoPaid extends Component
{
    buildingId = null
    aptAmount = null

    constructor(props)
    {
        super(props);
        this.state = {
            tableData: [],
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
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

    componentDidMount()
    {
        if (firebase.auth().currentUser == null) return
        firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
        result => { if (!result.exists) return
            this.buildingId = result.data().buildingId
            this.findNumOfApt();
            this.getWhoPay();
        })
    }


    findNumOfApt()
    {
        firebase.firestore().collection("Building").doc( this.buildingId).get().then(
        result => { if (!result.exists) return
            this.aptAmount = result.data().aptAmount
        })
    }


    handleChange(e)
    {
       let item = e.target.name;
        this.setState({cheked: e.target.checked})

        let paymentListForApt = []
        for(let i = 0 ; i < this.aptAmount ; i++)
        {
            if(i == item -1)
                 paymentListForApt[i] = true;
            else
                 paymentListForApt[i] = false;
        }

        firebase.firestore().collection("Building").doc(this.buildingId).collection('Payment').doc(id).update({
            paymentListForApt:paymentListForApt
        })
    }


    async getWhoPay()
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
                    <td> <input type="checkbox" name={dataRow.aptNum} /*checked={this.state.checked}*/ onChange={this.handleChange} />כן</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}


export default WhoPaid;