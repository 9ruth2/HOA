import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';
import NavBar from '../navBar/NavBar';
import { Button } from '@material-ui/core/';
import XLSX from 'xlsx';


// function for export to excel //
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

    // a func to export to excel
	exportToExcel = () => {
        const columnNames = ["מספר דירה","שם מלא"];
        const aoa = [columnNames].concat(this.state.tableData.map(this.newPaymentToArr));
        aoaToFile({ fileName: 'apartment payment report.xlsx', aoa });
    }
            
    // a func to convert object to arr
    newPaymentToArr = newPayment => [{key:"aptNum"},{key:"fullName"}].map(r => newPayment[r.key]);


    render(){
        return(
            <div>
                <NavBar/>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.exportToExcel}>
                </Button>
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