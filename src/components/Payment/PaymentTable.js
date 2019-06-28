import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaymentTable.css';
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core/';
import XLSX from 'xlsx';

// a func to convert object to arr
const newPaymentToArr = newPayment => [{key: "amount"},{key:"details"}].map(r => newPayment[r.key]);

const set_right_to_left = wb => {
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Views) wb.Workbook.Views = [];
    if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;
  };
            
// a func to convert aoa to file //
const aoaToFile = ({ fileName, sheetName = 'Sheet1', aoa }) => {
    if (aoa) {
        const workbook = XLSX.utils.book_new();
        set_right_to_left(workbook);
        const sheet = XLSX.utils.aoa_to_sheet(aoa);
        XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
        XLSX.writeFile(workbook, fileName + '.xlsx');
    }
};

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

     // a func to export to excel
	exportToExcel = () => {
        const columnNames = ["סכום התשלום הכולל","פירוט התשלום"];
        const aoa = [columnNames].concat(this.state.tableData.map(this.newPaymentToArr));
        aoaToFile({ fileName: 'payment report.xlsx', aoa });
    }
            
    // a func to convert object to arr
    newPaymentToArr = newPayment => [{key: "amount"},{key:"details"}].map(r => newPayment[r.key]);
    
            
    // a func to convert aoa to file //
        aoaToFile = ({ fileName, sheetName = 'Sheet1', aoa }) => {
        if (aoa) {
            const workbook = XLSX.utils.book_new();
            set_right_to_left(workbook);
            const sheet = XLSX.utils.aoa_to_sheet(aoa);
            XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
            XLSX.writeFile(workbook, fileName + '.xlsx');
        }
    };

    render() { 
        return(
            <div>
                <NavBar/>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.exportToExcel}>
                </Button>        
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
        debugger
        firebase.firestore().collection('Building').doc(this.buildingId).collection('Payment').get().then( querySnapshot => {
            if (querySnapshot.empty) return
        this.setState({ tableData: querySnapshot.docs.map(i => {
            return {
                id: i.id,...i.data()}}) })
      })
    }

    getTableRows()
    {
        console.log(this.state.tableData)
        return this.state.tableData.map(dataRow => {
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