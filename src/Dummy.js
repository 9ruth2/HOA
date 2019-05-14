import React, { Component } from 'react'
import './Dummy.css'

class Dummy extends Component {
    state = {
        selectedColor: this.props.color1
    }

    render() {
        return (
            <h1 className='dummy-header' onClick={ this.onClickHandler.bind(this) } style={ {
                color: this.state.selectedColor
            } }>Nice Text</h1>
        )
    }

    onClickHandler() {
        if(this.state.selectedColor == this.props.color1) {
            this.setState({
                selectedColor: this.props.color2
            })
        } else {
            this.setState({
                selectedColor: this.props.color1
            })
        }
    }
}

export default Dummy



