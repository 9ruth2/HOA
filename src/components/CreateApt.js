import React, {Component} from 'react';

class CreateApt extends Component{
    
    CreateAptStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="CreateApt" style = {this.CreateAptStyle()}>
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
                    </form>
            </div>
            );
        }
}

export default CreateApt;