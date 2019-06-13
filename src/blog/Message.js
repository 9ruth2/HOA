import './Message.css'
import React, { Component } from 'react'

class Message extends Component {

    state = {
        input: "",
        largestId: 1,
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
                    <button className = "messages_btn" type='button' onClick={() => this.onClick()}>Save</button>
                </form>
                {this.getBubbles()}
              </div>
          </React.Fragment>
        )
      }


      getBubbles() {
        return this.state.messages.map(messageObj => {
          if(messageObj == null || messageObj.text == null || messageObj.text.length <= 0) return null
          return <div key={messageObj.id} className = "message_button_buuble">    
          <p className = "messages_talkbubble">Your message is: {messageObj.text}</p>
          <p>reated at: {messageObj.timestamp} by: {messageObj.author}</p>
          <br/>
          <button className = "messages_btnDel" onClick={() => this.onClickDelete(messageObj.id)}>Delete</button>  
          </div>
        })
      }


      onClickDelete(idToDelete){
        this.setState({messages: this.state.messages.filter(item => item.id !==idToDelete) });
    }    


      onClick() {
          this.setState({ messages: [...this.state.messages, {
            text: this.state.input,
            timestamp: new Date().getTime(),
            author: "USER",
            id: this.state.largestId++
          } 
        ] })
          this.setState({ input: ''});
      }
}

export default Message



