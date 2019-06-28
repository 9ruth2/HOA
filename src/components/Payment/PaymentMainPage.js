import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Link } from 'react-router-dom'
//import './PaymentMainPage.css';
import NavBar from '../navBar/NavBar';
import '../Style/Style.css';

class PaymentMainPage extends Component{

    state=({
        classStyle:''
    })

    PaymentMainPagetStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }
    hoaSeeOnly = () => {
        const user = firebase.auth().currentUser.uid;
        firebase.firestore().collection('Apt').doc(user).get().then(result=>{
            if(result.data().hoa === true){
                this.setState({classStyle:'hoaSeeOnly'})
            }
        })
    }
    
    render(){
        this.hoaSeeOnly()



        return(
            <div className = "PaymentMainPage" style = {this.PaymentMainPagetStyle()} >
                <NavBar/>
                <h1 className = "mainTitle">תשלומים</h1>
                <h3 className = "smallTitle"> עמוד ראשי</h3>
                <button className={this.state.classStyle} className="buttonStyle"><Link to="/payment/create-payment" className="LinkStyle">הוספת תשלום</Link></button>
                <p></p>
                <button className="buttonStyle"><Link to="/payment/payment-table"className="LinkStyle">דוח תשלומים</Link></button>

            </div>
        );
    }
}
export default PaymentMainPage;