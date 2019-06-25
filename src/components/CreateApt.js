import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { secondFirebaseInstance } from '../Firebase'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CreateAptPage from './CreateAptPage';
import { EXITED } from 'react-transition-group/Transition';


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
<<<<<<< HEAD
            aptId: '',
            buildingId: this.props.buildingID,
            tenants: [],
            fullName: '',
            phoneNum: ''
=======
            fullName: '',
            phoneNum: '',
            aptNum: 0,
            buildingId: this.props.buildingID
>>>>>>> cc712ab35c63946593d4aa1d34693386e899c5a9
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
   }

   handleSubmit(event){
       if(this.state.fullName ===''){
           this.setState({fullName:this.state.email})
       }
       if(this.state.email == '' || this.state.password == ''){
           alert("please type in all the filds")
       }
       else{
        let aptId = null
        secondFirebaseInstance.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            alert('שם המשתמש קיים')
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Promise.resolve(null)
            // ...
          })
          .then(result =>{
              if(result==null){
                  return
              }
            const db = firebase.firestore();
            aptId = result.user.uid
            return db.collection('Apt').doc(aptId).set({
                email: this.state.email,
                buildingId:this.state.buildingId,
<<<<<<< HEAD
                aptId : aptId,
                fullName:this.state.fullName
=======
                fullName: this.state.fullName,
                phoneNum: this.state.phoneNum,
                aptNum: this.state.aptNum +1,
                aptId : aptId
>>>>>>> cc712ab35c63946593d4aa1d34693386e899c5a9
              })
          })
          .then(result => {
            const fb = firebase.firestore();
            fb.collection('Tenants').add({
                email: this.state.email,
                buildingId:this.state.buildingId,
                aptId: aptId
              })
            .then(result => {
                this.setState({tenantId : result.id})
                alert(this.state.tenantId)
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
    }

}

    render(){
        return(
            <div className="CreateApt container" style = 
            {this.CreateAptStyle()}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>name</Form.Label>
                        <Form.Control placeholder="name" name="fullName" type="text"  value={this.state.fullName} onChange={this.handleChange}/>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="Enter email" name="email" type="email"  value={this.state.email} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}   />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit} type="button" value="Submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
    

}
export default CreateApt;