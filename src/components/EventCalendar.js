//import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);


class EventCalender extends Component {

  BigCalendarStyle = () => {

    return {
      height: 700
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      allDay: '',
      start: '',
      end: '',
      events: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;

    if (event.target.name === 'title') {
      this.setState({
        title: target.value
      });
    }
    if (event.target.name === 'allDay') {
      this.setState({
        allDay: target.value
      });
    }
    if (event.target.name === 'startDate') {
      this.setState({
        start: target.value
      });
    }
    if (event.target.name === 'endDate') {
      this.setState({
        end: target.value
      });
    }
  }

  handleSubmit(event) {

    if (this.state.title == '') {
      alert('חסר את שם האירוע')
    }
    else if (this.state.startDate == '' && this.state.endDate == '') {
      alert('חסרים תאריכים')
    }
    else if (this.state.startDate == '') {
      alert('חסר תאריך התחלה')
    }
    else if (this.state.endDate == '') {
      alert('חסר תאריך סיום')
    }
    else {
      const dataToSave = {
        title: this.state.title,
        allDay: this.state.allDay,
        start: this.state.start,
        end: this.state.end
      }
      const db = firebase.firestore();
      db.collection('Events').doc().set(dataToSave)
    }



  }

  componentDidMount() {
    //צריך לקרוא מהפייר בייס ולהעביר למערך של איבנט
  }

  render() {
    return (

      <>

 <div>
 <input name='title' onChange={event => this.handleChange(event)} placeholder='title'/>
 <input name='startDate' onChange={event => this.handleChange(event)}  type='date' placeholder='start date'/>
 <input name='endDate' onChange={event => this.handleChange(event)}  type='date' placeholder='end date'/>
 <label>All Day: </label>
 <input name = 'allDay' type='checkbox' placeholder='all day' onChange={event => this.handleChange(event)}/>
 <button onClick={() => this.handleSubmit()}>Save to server</button>
 </div>

<BigCalendar
style={{height: '60vh'}}
      localizer={localizer}
      events={this.state.events}
      startAccessor="start"
      endAccessor="end"
      
    />

      </>
    );

  }

}
export default EventCalender;
