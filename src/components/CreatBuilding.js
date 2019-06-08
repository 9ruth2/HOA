import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
class CreatBuilding extends Component{
    

    CreatBuildingStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'  
        }
    }

    constructor(props){
        super(props);
        this.state = {
            address: '',
            aptNum: ''
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;

        if(target.type === 'text'){   
            this.setState({
                address: target.value
            });
        }
        if(target.type === 'number'){
             this.setState({
                aptNum: target.value
            });
        }
    }

    handleSubmit(event){
        // alert('the submitted values are: ' + this.state.address + ', ' + 
        // this.state.aptNum)

        if(this.state.aptNum<=0){
            alert('מספר הדירות חייב להיות מספר חיובי')
        }
        else if(this.state.aptNum === '' || this.state.address === ''){
            alert('חסר שדות, בבקשה מלא גם כתובת וגם מספר דירוות')
        }
        else{
            const db = firebase.firestore();
            db.collection('Building').doc().set({
                address: this.state.address,
                aptAmount: this.state.aptNum
            })
        }



    }

    render(){
        return(
            <div className="CreatBuilding" style = {this.CreatBuildingStyle()}>
                <h3>יצירת בניין</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>
                        כתובת הבניין
                        <br/>
                        <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
                        </p>
                    </label>
                    <label>
                        <p>
                        מספר דירות
                        <br/>
                        <input name="aptNum" type="number" value={this.state.aptNum} onChange={this.handleChange} />
                        </p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            );
        }
}

export default CreatBuilding;