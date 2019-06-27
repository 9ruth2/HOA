import React, {Component} from 'react';
import CreateApt from './CreateApt';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { thisTypeAnnotation } from '@babel/types';




class CreateAptPage extends Component{
    
    constructor(props) {
        super(props);
        const args = this.props.location.search.split('?')
        const buildingId = args[1].split('=')[1]
        let id = buildingId
        let aptNum =args[2]
        this.state = ({
          buildingID : id,
          aptNum : aptNum
        });
      }

    CreateAptPageStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="CreateAptPage" style =   {this.CreateAptPageStyle()}>
                {this.printApt()}
                <button onClick={this.onSubmit}>סיום</button>
            </div>
        );
    }

    onSubmit(){
      
    }
    printApt() {
        let i = 0;
        let apt = [];
        while (i < this.state.aptNum) {
          i++;
          // apt.push(<p>apt num: {i}</p>);
          apt.push(<input type="radio" name="hoa" value={this.i}/>)
          apt.push(<CreateApt buildingID = {this.state.buildingID} />);
        }
        return apt;
      }
}

export default CreateAptPage;