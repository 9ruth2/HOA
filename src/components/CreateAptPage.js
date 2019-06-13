import React, {Component} from 'react';
import CreateApt from './CreateApt';

class CreateAptPage extends Component{
    
    CreateAptPageStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="CreateAptPage" style = {this.CreateAptPageStyle()}>
                {this.getApts()}
            </div>
            );
        }
        getApts(){
            return(
                <div>
                    <CreateApt/>
                    <CreateApt/>
                    <CreateApt/>
                </div>
            )
        }
}

export default CreateAptPage;