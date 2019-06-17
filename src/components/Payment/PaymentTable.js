import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaymentTable.css';


class PaymentTable extends Component{

    state = {
        tableData: []
    }

    PaymentTableStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'
            
        }
    }

    renderPayment(doc){

        firebase.firestore().collection("Payment").get().then( querySnapshot => {
        this.setState({ tableData: querySnapshot.docs.map(i => {
            return {
                id: i.id,
                ...i.data()
            }
        }) });
      });
    }

    getTableRows() {
        console.log(this.state.tableData)
        return this.state.tableData.map(dataRow => {
            return (
                <tr>
                    <td>{this.getPaidUsers(dataRow.id)}</td>
                    <td>{dataRow.amount}</td>
                    <td>{dataRow.details}</td>
                </tr>
            )
        })
    }

    getPaidUsers() {
        
    }
  
    componentDidMount(){this.renderPayment();}

    render() { 
    return(
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
     );
    }
}
export default PaymentTable;