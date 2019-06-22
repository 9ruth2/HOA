import React, {Component} from 'react';
import Form from 'react-bootstrap/FormControl';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import NavBar from './navBar/NavBar';


class Tenant extends Component{
 
    TenantStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em',
            float: 'right'
        }
    }
    TableStyle = () => {
        return{
            float: 'right'
        }
    }
    onEditStyle = () => {
        if(this.state.edit === false)
        return{
            display: 'none'
        }
    }
    onSaveStyle = () => {
        if(this.state.edit === true)
        return{
            display: 'none'
        }
    }
    constructor(props){
        super(props);
        this.state = {
            aptId: '5kE4NUykOSLVxzmK4Rrf',
            tenantId: 'UuBQJ0gnmQZvtPJD9fM0',
            fullName: "רות ריצ'י",
            phoneNum: '0502333411' ,
            email: 'aruth2@gmail.com',
            dob: '18/06/1992',
            edit: false
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target;

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
        if(target.name === 'email'){   
            this.setState({
                email: target.value
            });
        }
        if(target.name === 'dob'){   
            this.setState({
                dob: target.value
            });
        }
    }
    handleSubmit(event){
        if(this.state.edit === false){
            this.setState({
                edit : true
            });
        }
        else{
            this.setState({
                edit : false
            });  
            const db = firebase.firestore();
            db.collection('Tenants').doc(this.state.tenantId).update({
               fullName: this.state.fullName,
               phoneNumber:this.state.phoneNum,
               email:this.state.email,
               dob:this.state.dob 
            })
        }
    }
    
    render(){
        return (
            <div className="TenantText container" style = {this.TenantStyle()}>
<NavBar/>
            <table style={this.TableStyle()}>
            <tr>
                <input className="onEdit" value={this.state.fullName} style = {this.onEditStyle()} type='text' name="fullName" onChange={this.handleChange}></input>
                <td style={this.onSaveStyle()}>{this.state.fullName}</td>
                <td> שם מלא</td>
            </tr>
            <tr>
            <input className="onEdit" value={this.state.phoneNum} style = {this.onEditStyle()} type='number' name="phoneNum" onChange={this.handleChange}></input>
                <td style={this.onSaveStyle()}>{this.state.phoneNum}</td>
                <td>מספר פלאפון</td>
            </tr>
            <tr>
            <input className="onEdit" value={this.state.email} style = {this.onEditStyle()} type='email' name="email" onChange={this.handleChange}></input>
            <td style={this.onSaveStyle()}>{this.state.email}</td>
                <td>דואר אלקטרוני</td>
            </tr>
            <tr>
            <input className="onEdit" value={this.state.dob} style = {this.onEditStyle()} type='date' name="dob" onChange={this.handleChange}></input>
                <td style={this.onSaveStyle()}>{this.state.dob}</td>
                <td>תאריך לידה</td>
            </tr>


            <button type="click" value="עריכה" onClick={this.handleEdit} style={this.onSaveStyle()}>עריכה </button>
            <input type="submit" value="שמור" onClick={this.handleSubmit} style = {this.onEditStyle()}/>

            </table>

        </div>
        );
        
    }

}

export default Tenant;