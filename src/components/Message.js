import './Message.css'
import React, { Component } from 'react'

class Message extends Component {

    state = {
        input: "",
        messages: []
      }
    
      handleChange = event => {
        const value = event.target.value;
        this.setState({
          input: value
        });
      };
    

      render() {
        return (
          <React.Fragment>
            <div className= "messages_body">
                <h1 className = "messages_h1">Message Blog</h1>
                <form>
                    <div>
                        <label>Enter your message:</label>
                    </div>
                    <br/>
                    <div>
                        <textarea className = "messages_textarea"
                        type="text"
                        value={this.state.input}
                        onChange={this.handleChange}
                        placeholder="Enter a text"
                        />
                    </div>
                    <br/>
                    <div className = "messages_btn">
                        <button type='button' onClick={() => this.onClick()}>Save</button>
                    </div>
                </form>
                {this.getBubbles()}
                </div>
          </React.Fragment>
        );
      }


      getBubbles() {
        return this.state.messages.map(text => {
            return  <p className = "messages_talkbubble">Your message is: {text}</p>
        })

      }
/****************************** func test ****************************** */
      onClick() {
        if(this.state.input == ''){
          alert('please type in your message')
        }else{
          this.setState({
            messages: [...this.state.messages, this.state.input]
          })
        }
      }
}

export default Message



