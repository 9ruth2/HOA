import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';
import NavBar from '../navBar/NavBar';

import { thisTypeAnnotation } from '@babel/types';


class WhoPaid extends Component
{
    buildingId = null
    aptAmount = null

    constructor(props)
    {
        super(props);
        
        const args = this.props.location.search.split('?')
        const paymentId = args[1].split('=')[1]

        this.state = {
            paymentId: paymentId,
            tableData:[],
            item : -1,
            boxValue : false,
            paymentListForApt:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    ContactTableStyle = () => {
        return{
            border: '1em',
            float: 'center'
        }
    }

    // // a func to export to excel
	// exportToExcel = () => {
    //     const columnNames = ["מספר דירה","שם מלא"];
    //     const aoa = [columnNames].concat(this.state.tableData.map(this.newPaymentToArr));
    //     aoaToFile({ fileName: 'apartment payment report.xlsx', aoa });
    // }
            
    // // a func to convert object to arr
    // newPaymentToArr = newPayment => [{key:"aptNum"},{key:"fullName"}].map(r => newPayment[r.key]);


    render(){
        return(
            <div>
                <NavBar/>
                <input type="button"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.exportToExcel}>
                </input>
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
            this.getPatmentList();
        })
    }


    getPatmentList(){

    }

    findNumOfApt()
    {
        firebase.firestore().collection("Building").doc( this.buildingId).get().then(
        result => { if (!result.exists) return
            this.aptAmount = result.data().aptAmount
        })
    }


    handleChange = (e) =>
    {
        const i = parseInt(e.target.name)
        let arr = this.state.paymentListForApt
        arr[i] = e.target.value
        this.setState({
            paymentListForApt:arr
        })

        firebase.firestore().collection("Building").doc(this.buildingId).collection('Payment').doc(this.state.paymentId).update({
           paymentListForApt:this.state.paymentListForApt
        })
        


    }


    async getWhoPay()
    {

        let arr = []
        let temp = await firebase.firestore().collection("Building").doc(this.buildingId).collection('Payment').doc(this.state.paymentId).get()
        
        temp.data().paymentListForApt.map(i=>{
            arr.push(i)
        })
        this.setState({paymentListForApt:arr})

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
            let i = parseInt(dataRow.aptNum)-1
            return (
                <tr>
                    <td> <input type="text" name={i} value={this.state.paymentListForApt[i]} onChange={this.handleChange} /></td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )
        })
    }
}


export default WhoPaid;