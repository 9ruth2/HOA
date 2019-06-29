import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaymentTable.css';
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom'


class PaymentTable extends Component{
   
    buildingId = null

    state = {
        tableData: []
    }

    PaymentTableStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'
            
        }
    }


    render() { 
        return(
            <div>
                <NavBar/>
                <h1 className="bigTitle">דוח תשלום ועד הבניין</h1>
                <table id = "paymentTable" border= "1" style = {this.PaymentTableStyle()}>
                    
                    <thead>
                    <tr>
                        <th>   סטטוס תשלומי דיירים   </th>
                        <th>   סכום התשלום הכולל   </th>
                        <th>   פירוט התשלום   </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getTableRows()}
                    </tbody>
                </table>
            </div>
         );
        }

    //----------------------------- Functions -----------------------------

    componentDidMount() 
    {
        if (firebase.auth().currentUser == null) return
        firebase.firestore().collection('Apt').doc(firebase.auth().currentUser.uid).get().then(
          result => {
            if (!result.exists) return
            this.buildingId = result.data().buildingId
            this.renderPayment();
         }
        )
    }
    

    renderPayment(doc)
    {
        firebase.firestore().collection('Building').doc(this.buildingId).collection('Payment').get().then( querySnapshot => {
        this.setState({ tableData: querySnapshot.docs.map(i => {
             return {id: i.id,...i.data()}}) })
      })
    }

    getTableRows()
    {
        console.log(this.state.tableData)
        return this.state.tableData.map(dataRow => {
            if(dataRow.amount != null)
            return (
                <tr>
                    <td><button className="buttonStylePay"><Link className="linkStylePay" to="/payment/WhoPaid">סטטוס ודיווח תשלום של דייר</Link></button></td>
                    <td>{dataRow.amount}</td>
                    <td>{dataRow.details}</td>
                </tr>
            )
        })
    }


}

export default PaymentTable;