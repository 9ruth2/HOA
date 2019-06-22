import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './CreatePayment.css';
import NavBar from '../navBar/NavBar';

class CreatePayment extends Component{

    constructor(props){
        super(props);
        this.state = {
            details: '',
            amount: ''
    };
        this.handleAddPayment = this.handleAddPayment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    CreatePaymentStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }

    handleAddPayment(event){
        const target = event.target;

        if(target.type === 'text'){   
            this.setState({
                details: target.value
            });
        }
        if(target.type === 'number'){
                this.setState({
                amount: target.value
            });
        }
        
    }

    handleSubmit(event){

        if(this.state.amount === '' || this.state.details === ''){
            alert('שגיאה: חסר שדות, הכנס בבקשה פירוט וסכום לתשלום')
        }
        else if(this.state.amount<=0){
            alert('שגיאה: סכום לתשלום לא תקין, אנא הכנס מספר חיובי')
        }
        else{
            const db = firebase.firestore();
            db.collection('Payment').doc().set({
                details: this.state.details,
                amount: this.state.amount
            })
            //this.props.push('./payment/create-payment');
            alert('הוספת התשלום החדש בוצעה בהצלחה!')
            this.props.history.push('/payment/payment-main-page');
        }
    }
    render(){
        return(
        //<Router>
            <div className="CreatePayment" style = {this.CreatePaymentStyle()}>
                <NavBar/>
                <h1 className="mainTitle">הוספת תשלום חדש</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3 className = "smallTitle">
                        פירוט תשלום
                        <br/>
                        <input className="createpaymentinput" name="details" type="text" value={this.state.details} onChange={this.handleAddPayment} />
                        </h3>
                    </label>
                    <br/>
                    <label>
                        <h3 className = "smallTitle">
                        סכום לתשלום
                        <br/>
                        <input className="createpaymentinput" name="amount" type="number" value={this.state.amount} onChange={this.handleAddPayment} />
                        </h3>
                    </label>
                    <br/>
                    <input className="createpaymentinput" type="submit" value="הוסף תשלום" />
                </form>
            </div>
            );
        }
}
export default CreatePayment;