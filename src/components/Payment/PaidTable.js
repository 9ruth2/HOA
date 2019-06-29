import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaidTable.css';


class PaidTable extends Component
{
    buildingId = null
    aptAmount = null
    aptNum = null

    state = {
        tableData: [],
        clicked: false
    }

    
    PaidTableStyle = () => {
        return{
            border: '1em',
            float: 'center',
            textAlign:'center'
        }
    }

    render()
    {
        return(
            <div>
                <table className="PaidTable" style = {this.PaidTableStyle()}>    
                <thead>

            <tr>
                <td> האם שולם</td>
                <td>סכום לתשלום</td>
                <td>תשלום</td>
                <td>שם</td>
                <td>מספר דירה</td>
            </tr>
            
                </thead>
                <tbody>
                {this.getTableRows()}
                </tbody>
            </table>
        </div>
            );
     }

     //----------------------------- Functions -----------------------

    componentDidMount() 
    {
        if (firebase.auth().currentUser == null) return
        firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
            result => {
            if (!result.exists) return
            this.buildingId = result.data().buildingId
            this.aptNum = result.data().aptNum
            this.findNumOfApt()
            this.getDetails();})
    }

    findNumOfApt()
    {
        firebase.firestore().collection("Building").doc( this.buildingId).get().then(
        result => { if (!result.exists) return
            this.aptAmount = result.data().aptAmount
        })
    }



    handleChange() {
        this.setState({
          clicked: !this.state.clicked
        })
      }
      

    getDetails(doc)
    {
        firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(i => {
                firebase.firestore().collection("Building").doc(this.buildingId).collection("Payment").get().then( query => {
                    this.setState({ tableData: query.docs.map(j => {
                        return {...i.data(),...j.data() }}) }) })})
    
    }

  
    getTableRows() 
    {
        return this.state.tableData.map(dataRow => {
            if(dataRow.amount != null)
            return (
                <tr>
                    <td>{dataRow.paymentListForApt[this.aptNum-1]}</td>
                    <td>{dataRow.amount/this.aptAmount}</td>
                    <td>{dataRow.details}</td>
                    <td>{dataRow.fullName}</td>
                    <td>{dataRow.aptNum}</td>
                </tr>
            )})
    }

}

export default PaidTable;