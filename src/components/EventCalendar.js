import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
 
moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const App = () => (
  <div style={{ height: 700 }}>
    <BigCalendar
      events={this.state.events}
      step={60}
      view='week'
      views={['week']}
      min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
      max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
      date={new Date(2018, 0, 1)}
      localizer ={localizer}
    />
  </div>
);
class CreatBuilding extends Component{

constructor(props){
  super(props);
  this.state = {
    EventTitle: '',
    allDay: '',
    start: '',
    end: '' 

};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event){
  const target = event.target;

/****************************** func test ****************************** */

  if(target.type === 'text'){   
      this.setState({
        EventTitle: target.value
      });
  }
  if(target.type === 'boolean'){
       this.setState({
         allDay: target.value
      });
  }
  if(target.type === 'Date'){
    this.setState({
      start: target.value
   });
  }
  if(target.type === 'Date'){
    this.setState({
      end: target.value
  });
  }
}

handleSubmit(event){
  
/****************************** func test ****************************** */

 //  console.log('the submitted values are: ' + this.state.EventTitle + ', ' + this.state.aptNum)

  if(this.state.EventTitle== ''){
      alert('חסר את שם האירוע')
  }
  else{
      const db = firebase.firestore();
      db.collection('Events').doc().set({
        EventTitle: this.state.EventTitle,
        allDay: this.state.allDay,
        start:  this.state.start,
        end:  this.state.end
      })
     // this.props.push('./createApt');
  }



}
/*style = {this.CreatBuildingStyle()}>*/
render(){
  return(
      <div className="Events"> 
          <form onSubmit={this.handleSubmit}>
              <label>
                  <p>
                    <input name="EventTitle" type="text" value={this.state.EventName} onChange={this.handleChange} />
                  </p>
              </label>
              <label>
                  <p>
                    <input name="allDay" type="boolean" value={this.state.allDay} onChange={this.handleChange} />
                  </p>
              </label>
              <label>
                  <p>
                  <input name="start" type="Date" value={this.state.start} onChange={this.handleChange} />
                  </p>
              </label>
              <label>
                  <p>
                    <input name="end" type="Date" value={this.state.end} onChange={this.handleChange} />
                  </p>
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
      );
  }



}
export default App;