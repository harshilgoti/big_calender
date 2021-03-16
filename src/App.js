import React, { Component } from "react";
import events from "./events";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { events };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };

  render() {
    return (
      <>
        <Calendar
          style={{ height: "700px" }}
          selectable
          localizer={momentLocalizer(moment)}
          events={this.state.events}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
          defaultView={Views.MONTHS}
          step={30}
          onNavigate={() => console.log("onNavigate")}
          onView={() => console.log("onView")}
          onRangeChange={() => console.log("onRangeChange")}
        />
      </>
    );
  }
}

export default App;
