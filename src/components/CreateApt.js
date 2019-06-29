import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { secondFirebaseInstance } from '../Firebase'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { toast } from 'react-toastify';


class CreateApt extends Component
{

    CreateAptStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            aptId: '',
            buildingId: this.props.buildingID,
            tenants: [],
            fullName: '',
            phoneNum: '',
            aptNum: ''
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   handleChange = (event) => {
        const target = event.target;
        if(target.type === 'email'){
            this.setState({
                email: target.value
            });
        }
        if(target.type ==='password'){
            this.setState({
                password: target.value
            });
        }
        if(target.name === 'fullName'){  
            this.setState({
                fullName: target.value
            });
        }

        if(target.name === 'phoneNum'){   
            this.setState({
                phoneNum: target.value
            });
        }
        if(target.name === 'aptNum'){   
            this.setState({
                aptNum: target.value
            });
        }
   }

   handleSubmit(event){
       if(this.state.fullName ===''){
           this.setState({fullName:this.state.email})
       }
       if(this.state.email == '' || this.state.password == '' || this.state.aptNum == '')
            ToastsStore.error("נא למלא את כל השדות")
       
       else{
        let aptId = null
        secondFirebaseInstance.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            ToastsStore.warning("שם המשתמש קיים")
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Promise.resolve(null)
          })
          .then(result =>{
              if(result == null){
                  return
            }
            const db = firebase.firestore();
            aptId = result.user.uid
            return db.collection('Apt').doc(aptId).set({
                email: this.state.email,
                buildingId:this.state.buildingId,
                aptId : aptId,
                fullName:this.state.fullName,
                aptNum: this.state.aptNum,
                hoa: false
              })
          })
          .then(result => {
            const fb = firebase.firestore();
            fb.collection('Tenants').add({
                email: this.state.email,
                buildingId:this.state.buildingId,
                aptId: aptId,
                aptNum: this.state.aptNum
              })
            .then(result => {
                this.setState({tenantId : result.id})
                const fb = firebase.firestore();
                return fb.collection('Apt').doc(aptId).update({
                    tenants: firebase.firestore.FieldValue.arrayUnion(this.state.tenantId)
                })
            })              
        })
        .then(rseult => {
            const fb = firebase.firestore();
            return fb.collection('Building').doc(this.state.buildingId).update({
                aptList: firebase.firestore.FieldValue.arrayUnion(aptId)
            })
        })
        ToastsStore.success("הדירה נוספה בהצלחה")
    } 
}

    render(){
        return(
            <div className="CreateApt container" style = 
            {this.CreateAptStyle()}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>שם הדייר</Form.Label>
                        <Form.Control placeholder="הכנס שם" name="fullName" type="text"  value={this.state.fullName} onChange={this.handleChange}/>
                        <Form.Label>דוא"ל</Form.Label>
                        <Form.Control placeholder="הכנס מייל" name="email" type="email"  value={this.state.email} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמה</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}   />
                        <Form.Label>מס' דירה</Form.Label>
                        <Form.Control type="number" placeholder="מספר דירה" name="aptNum" value={this.state.aptNum} onChange={this.handleChange}   />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit} type="button" value="Submit">
                        שמור
                    </Button>
                    <ToastsContainer store={ToastsStore} position={toast.POSITION.BOTTOM_CENTER}/>
                </Form>
            </div>
        );
    }
    

}
export default CreateApt;