import React, {Component} from 'react';
import CreateApt from './CreateApt';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { thisTypeAnnotation } from '@babel/types';



class CreateAptPage extends Component{
    
    constructor(props) {
        super(props);
        let i=1;
        let str = this.props.location.search
        while(str[i]!='?'){
            i++;
        }
        let id = str.substring(12 , i-1)
        let aptNum = str.substring(i+1 , str.length)

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
            </div>
        );
    }

    printApt() {
        let i = 0;
        let apt = [];
        while (i < this.state.aptNum) {
          i++;
          apt.push(<p>apt num: {i}</p>);
          apt.push(<CreateApt buildingID = {this.state.buildingID} />);
        }
        return apt;
      }
}

export default CreateAptPage;