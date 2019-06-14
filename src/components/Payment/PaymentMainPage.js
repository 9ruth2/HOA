import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

class PaymentMainPage extends Component{

    PaymentMainPagetStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }
    
    render(){
        return(
            <div>
                <h1>תשלומים</h1>
                <h3>עמוד ראשי</h3>
            </div>
        );
    }
}
export default PaymentMainPage;